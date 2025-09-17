import { defineComponent } from 'vue'
import { ElAside } from 'element-plus'
import { ActionForm } from './_components'

export default defineComponent({
  props: {
    data: { type: Object },
    updateContainer: { type: Function },
    updateBlock: { type: Function },
    reset: { type: Function },
    LastSelectedBlock: { type: Object }
  },
  setup (props, { attrs }) {
    return () => (
      <ElAside
        width='20vw'
        class={['outer-content__operator-aside', 'aside-color', attrs.class]}>
          
        <ActionForm
          block={props.LastSelectedBlock}
          v-model:data={props.data}
          updateContainer={props.updateContainer}
          updateBlock={props.updateBlock}
          reset={props.reset}
        ></ActionForm>
      </ElAside>
    )
  }
})
