import { ElInput, ElColorPicker, ElSelect, ElOption, ElSlider, ElCheckboxGroup, ElCheckbox, ElRadioGroup, ElRadio } from 'element-plus'
import TableEditor from '@/components/ActionAside/_components/TableEditor/Component.jsx'
import {z} from 'zod'

const propConfigSchema = z.object({
  // 通用标签
  label: z.string(),
  // 多样组件配置 -- 可选
  options: z.array(z.object({
    label: z.string(),
    value: z.string()
  })).optional(),
  defaultValue: z.string().optional(),
  // 滑块组件配置 -- 可选
  min: z.number().optional(),
  max: z.number().optional(),
  step: z.number(),
  marks: z.record(z.string(), z.string()).optional(),
  checkList: z.array(z.string()).optional(),
  radioList: z.array(z.object({
    label: z.string(),
    value: z.string()
  })).optional(),
})
type PropConfig = z.infer<typeof propConfigSchema>

const predefineColor = ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#909399', '#FFFFFF', '#000000', '#A3A6AD']
export function createRules (state: any) {
  return {
    input: (propName: string) => <ElInput v-model={state.editData.props[propName]}></ElInput>,
    color: (propName: string) => <ElColorPicker v-model={state.editData.props[propName]} show-alpha predefine={predefineColor}></ElColorPicker>,
    selector: (propName: string, propConfig: any) => {
      return <ElSelect 
        v-model={state.editData.props[propName]}
      >
        {propConfig?.options?.map((option: any) => {
          return <ElOption label={option.label} value={option.value}></ElOption>
        })}
      </ElSelect>
    },
    slider: (propName: string, propConfig: PropConfig) => {
      return <ElSlider 
        v-model={state.editData.props[propName]}
        min={propConfig?.min} 
        max={propConfig?.max} 
        step={propConfig?.step}
        marks={propConfig?.marks}
        show-stops
      ></ElSlider>
    },
    table: (propName: string, propConfig: PropConfig) => <TableEditor propConfig={propConfig} v-model={state.editData.props[propName]}>
    </TableEditor>,
    checkboxGroup: (propName: string, propConfig: PropConfig) => {
      return <ElCheckboxGroup v-model={state.editData.props[propName]}>
        {propConfig.checkList?.map((item: any) => {
          return <ElCheckbox label={item}></ElCheckbox>
        })}
      </ElCheckboxGroup>
    },
    radioGroup: (propName: string, propConfig: PropConfig) => {
      return <ElRadioGroup v-model={state.editData.props[propName]}>
        {propConfig.radioList?.map((item: any) => {
          return <ElRadio label={item.value}>{item.label}</ElRadio>
        })}
      </ElRadioGroup>
    }
    
  }
}