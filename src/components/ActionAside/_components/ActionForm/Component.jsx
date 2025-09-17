import { defineComponent, inject, watch, reactive } from 'vue'
import { ElForm, ElFormItem, ElInputNumber, ElButton, ElInput, ElSelect, ElOption, ElColorPicker, ElSlider, ElRadioGroup, ElRadio, ElCheckboxGroup, ElCheckbox } from 'element-plus'
import TableEditor from '@/components/ActionAside/_components/TableEditor/Component.jsx'
import { createRules } from './rule.tsx'
import { createDefault } from './default.tsx'

export default defineComponent({
  props: {
    block: { type: Object },
    data: { type: Object },
    updateContainer: { type: Function },
    updateBlock: { type: Function },
    reset: { type: Function }
  },
  setup (props) {
    const config = inject('config')
    const state = reactive({
      editData: {}
    })
    // 初始化/重置
    const reset = () => {
      if (!props.block) state.editData = JSON.parse(JSON.stringify(props.data.container))
      else {
        state.editData = JSON.parse(JSON.stringify(props.block))
        // 为组件设置默认值
        const component = config.componentMap.get(props.block.key)
        if (component && component.props) {
          Object.entries(component.props).forEach(([propName, propConfig]) => {
           if (propConfig.defaultValue && !state.editData.props[propName]) {
              state.editData.props[propName] = propConfig.defaultValue
            }
          })
        }
      }
    }
    const rules = createRules(state)
    // 应用方法
    function onApply () {
      if (!props.block) props.updateContainer({ ...props.data, container: state.editData })
      else props.updateBlock(state.editData, props.block)
    }
    watch(() => props.block, reset, { immediate: true })
    return () => {
      const container = []
      if (!props.block) {
        container.push(createDefault(state))
      }
      else {
        const component = config.componentMap.get(props.block.key)
        if (component && component.props) {
          container.push(
            Object.entries(component.props).map(([propName, propConfig]) => {
              return <ElFormItem label={propConfig.label} style={{ marginBottom: '30px' }}>
                {rules[propConfig.type](propName, propConfig)}
              </ElFormItem>
            })
          )
        }
      }
      return (
        <>
          <ElForm>
            {container}
            <ElFormItem>
              <ElButton type="primary" onClick={() => onApply()}>应用</ElButton>
              <ElButton onClick={() => props.reset ? props.reset() : reset()}>重置</ElButton>
            </ElFormItem>
          </ElForm>
        </>
      )
    }
  }
})
