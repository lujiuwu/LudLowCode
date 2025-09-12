import { defineComponent } from 'vue'
import { ElHeader, ElRow } from 'element-plus'
import { HeaderMenu, HeaderThemeSelection } from '@/components'

export default defineComponent({
  props: {
    btnContent: {
      type: Array,
      required: true
    }
  },
  setup (props) {
    return () => (
      <ElHeader class={'w-full inner-content__header flex flex-col gap-8px'}>
        <HeaderMenu btnContent={props.btnContent} />
        <ElRow class={'flex items-center'}>
          <HeaderThemeSelection />
        </ElRow>
      </ElHeader>
    )
  }
})
