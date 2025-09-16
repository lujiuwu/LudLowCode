import { Transition, defineComponent, ref, provide, watch } from 'vue'
import { ElAside, ElCheckbox, ElInput } from 'element-plus'
import { ComponentsTabs, MyMenu } from './_components'
import { useCheck } from '@/composables/useCheck'
import { Search } from '@element-plus/icons-vue'

export default defineComponent({
  props: {
    width: { type: String },
    isOpenAside: { type: Boolean },
    currentTab: { type: String },
    DragFunction: { type: Function },
    DragEndFunction: { type: Function },
    componentList: { type: Array }
  },
  emits: ['update:isOpenAside', 'update:currentTab'],
  setup (props, { emit }) {
    const filterComponentList = ref(props.componentList)
    const { checkList, checkStatus, changeStatus } = useCheck(props.componentList.length)
    const isBatchOperation = ref(false)
    provide('isBatchOperation', isBatchOperation)

    const val = ref('')
    
    // 监听 componentList 变化，更新过滤列表
    watch(() => props.componentList, (newComponentList) => {
      if (val.value.length > 0) {
        filterComponentList.value = newComponentList.filter(item => item.label.includes(val.value))
      } else {
        filterComponentList.value = newComponentList
      }
      // 更新 checkStatus 数组长度
      checkStatus.value = new Array(newComponentList.length).fill(false)
    }, { immediate: true })
    
    function handleSearch(value){
      if(value.length > 0){
        filterComponentList.value = props.componentList.filter(item => item.label.includes(value))
      }else{
        filterComponentList.value = props.componentList
      }
    }
    return (props) => (
      <ElAside
        style={{ transition: 'width 0.3s ease' }}
        class="pt-10px h-100vh outer-content__component-aside"
        width={props.width}
      >
        <div class='flex h-full overflow-hidden'>
          <div class='flex-shrink-0 outer-content__component-aside__tabs-area'>
            <ComponentsTabs
              currentTab={props.currentTab}
              isOpenAside={props.isOpenAside}
              onUpdate:currentTab={(value) => {
                emit('update:currentTab', value)
              }}
              onUpdate:isOpenAside={(value) => {
                emit('update:isOpenAside', value)
              }}
            >
            </ComponentsTabs>
          </div>
          <Transition name='slide'>
            <div class='outer-content__component-aside__components-area flex-1 flex flex-col overflow-hidden' v-show={props.isOpenAside}>
              <div class='pb-5px pr-5px flex-shrink-0'>
                <ElInput prefix-icon={<Search />} clearable placeholder='搜索组件' class='w-full h-35px' v-model={val.value} onInput={handleSearch}/>
              </div>
              <div class='pr-5px flex-1 overflow-y-auto'>
                {props.currentTab === 'my' && <MyMenu
                  isBatchOperation={isBatchOperation}
                  checkList={checkList}
                  checkStatus={checkStatus}
                  changeStatus={changeStatus}
                  onUpdate:isBatchOperation={(value) => { isBatchOperation.value = value }}
                />}
                {filterComponentList.value.map((component,index)=>{
                  return (
                    <div
                      key={component.key || component.label}
                      class="outer-content__component-aside__components-area__item mt-10px flex flex-col"
                    >
                      <div class="outer-content__component-aside__components-area__item__label p-5px w-full flex gap-5px">
                        <div class="checkbox">
                          <ElCheckbox
                            v-show={isBatchOperation.value}
                            modelValue={checkStatus.value[index]}
                            onUpdate:modelValue={() => { changeStatus(index, component) }}
                          />
                        </div>
                        <div class="label">{component.label}</div>
                      </div>
                      <div
                        class="p-25px flex"
                        draggable
                        onDragstart={(e) => props.DragFunction(e, component)}
                        onDragend={(e) => props.DragEndFunction(e, component)}
                      >
                        {component.preview()}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </Transition>
        </div>
      </ElAside>
    )
  }
})
