import { Transition, defineComponent, ref, provide } from 'vue'
import { ElAside, ElCheckbox } from 'element-plus'
import { ComponentsTabs, MyMenu } from './_components'
import { useCheck } from '@/composables/useCheck'

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
    const { checkList, checkStatus, changeStatus } = useCheck(props.componentList.length)
    const isBatchOperation = ref(false)
    provide('isBatchOperation', isBatchOperation)

    return (props) => (
      <ElAside
        style={{ transition: 'width 0.3s ease' }}
        class="pt-10px h-100vh outer-content__component-aside"
        width={props.width}
      >
        <div class='h-full m-0 p-0 flex-nowrap w-full overflow-hidden flex'>
          <div class='relative flex-[1]'>
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
            <div class='outer-content__component-aside__components-area p-3px flex-[7] overflow-y-scroll' v-show={props.isOpenAside}>
              {props.currentTab === 'my' && <MyMenu
                isBatchOperation={isBatchOperation}
                checkList={checkList}
                checkStatus={checkStatus}
                changeStatus={changeStatus}
                onUpdate:isBatchOperation={(value) => { isBatchOperation.value = value }}
              />}
              {props.componentList.map((component,index)=>{
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
        </Transition>
        </div>
      </ElAside>
    )
  }
})
