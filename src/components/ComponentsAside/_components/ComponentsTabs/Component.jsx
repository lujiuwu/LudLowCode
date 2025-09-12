import { Folder, Menu, BellFilled, Fold, Expand, User } from '@element-plus/icons-vue'
import { ElIcon, ElTabPane, ElTabs } from 'element-plus'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  props: {
    currentTab: {
      type: String
    },
    isOpenAside: {
      type: Boolean
    }
  },
  setup (props, ctx) {
    const currentTab = computed({
      get () { return props.currentTab },
      set (newValue) { ctx.emit('update:currentTab', newValue) }
    })
    const isOpenAside = computed({
      get () { return props.isOpenAside },
      set (newValue) { ctx.emit('update:isOpenAside', newValue) }
    })
    const blockTypes = [
      { label: '基础组件', name: 'basic', icon: () => <Folder /> },
      { label: '布局容器', name: 'layout', icon: () => <Menu /> },
      { label: '反馈组件', name: 'feedBack', icon: () => <BellFilled /> },
      { label: '我的组件', name: 'my', icon: () => <User/> }
    ]
    function handleClick (tabName) {
      currentTab.value = tabName
    }
    function changeOpen () {
      isOpenAside.value = !isOpenAside.value
    }
    return () => (
      <>
      <div class='pt-10px pl-15px h-auto! flex flex-col font-size-16px'>
          <ElTabs tab-position="left" modelValue={currentTab.value} onTabChange={handleClick}>
          {blockTypes.map(block => (
            <ElTabPane
              key={block.name}
              name={block.name}
              label={(
                <div class='flex flex-col'>
                  <ElIcon class='flex justify-center w-full mb-5px'>{block.icon()}</ElIcon>
                  <div class='label'>{block.label}</div>
                </div>
              )}
            >
            </ElTabPane>
          ))}
        </ElTabs>
        <div class='absolute bottom-10px left-15px'>
           <ElIcon onClick={changeOpen} size='25'>
          <Fold v-show={isOpenAside.value}></Fold>
          <Expand v-show={!isOpenAside.value}></Expand>
        </ElIcon>
        </div>
        </div>
      </>
    )
  }
})
