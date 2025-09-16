import { defineComponent, inject, watch, reactive } from 'vue'
import { ElForm, ElFormItem, ElInputNumber, ElButton, ElInput, ElSelect, ElOption, ElColorPicker, ElSlider, ElRadioGroup, ElRadio, ElCheckboxGroup, ElCheckbox } from 'element-plus'
import TableEditor from '@/components/ActionAside/_components/TableEditor/Component.jsx'

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
    // 预设颜色
    const predefineColor = ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#909399', '#FFFFFF', '#000000', '#A3A6AD']
    const rules = {
      input: (propName, propConfig) => <ElInput v-model={state.editData.props[propName]}></ElInput>,
      color: (propName, propConfig) => <ElColorPicker v-model={state.editData.props[propName]} show-alpha predefine={predefineColor}></ElColorPicker>,
      selector: (propName, propConfig) => {
        return <ElSelect 
          v-model={state.editData.props[propName]}
        >
          {propConfig.options.map(option => {
            return <ElOption label={option.label} value={option.value}></ElOption>
          })}
        </ElSelect>
      },
      slider: (propName, propConfig) => {
        return <ElSlider 
          v-model={state.editData.props[propName]}
          min={propConfig.min} 
          max={propConfig.max} 
          step={propConfig.step}
          marks={propConfig.marks}
          show-stops
        ></ElSlider>
      },
      table: (propName, propConfig) => <TableEditor propConfig={propConfig} v-model={state.editData.props[propName]}>
      </TableEditor>,
      checkboxGroup: (propName, propConfig) => {
        return <ElCheckboxGroup v-model={state.editData.props[propName]}>
          {propConfig.checkList.map(item => {
            return <ElCheckbox label={item}></ElCheckbox>
          })}
        </ElCheckboxGroup>
      },
      radioGroup: (propName, propConfig) => {
        return <ElRadioGroup v-model={state.editData.props[propName]}>
          {propConfig.radioList.map(item => {
            return <ElRadio label={item.value}>{item.label}</ElRadio>
          })}
        </ElRadioGroup>
      }
    }
    // 应用方法
    function onApply () {
      if (!props.block) props.updateContainer({ ...props.data, container: state.editData })
      else props.updateBlock(state.editData, props.block)
    }
    watch(() => props.block, reset, { immediate: true })
    return () => {
      const container = []
      if (!props.block) {
        container.push(
          <ElFormItem >
            <span class='label mr-10px'>容器宽度</span>
          <ElInputNumber
            v-model={state.editData.width}
            step={5}
          />
        </ElFormItem>
        )
        container.push(
          <ElFormItem>
            <span class='label mr-10px'>容器高度</span>
          <ElInputNumber
            v-model={state.editData.height}
            step={5}
          />
        </ElFormItem>
        )
        container.push(
          <ElColorPicker v-model={state.editData.bgColor}></ElColorPicker>
        )
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
        <ElForm>
          {container}
          <ElFormItem>
            <ElButton type="primary" onClick={() => onApply()}>应用</ElButton>
            <ElButton onClick={() => props.reset ? props.reset() : reset()}>重置</ElButton>
          </ElFormItem>
        </ElForm>)
    }
  }
})
