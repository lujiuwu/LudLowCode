import { ElFormItem, ElInputNumber, ElColorPicker, ElTabs, ElTabPane, ElCheckbox } from "element-plus";
import { ref } from "vue";

function createBasic(state:any) {
  return (
    <>
      <ElFormItem>
        <span class='label mr-10px'>容器宽度</span>
        <ElInputNumber
          v-model={state.editData.width}
          step={5}
        />
      </ElFormItem>
      <ElFormItem> 
        <span class='label mr-10px'>容器高度</span>
        <ElInputNumber
          v-model={state.editData.height}
          step={5}
        />
      </ElFormItem>
      <ElFormItem>
        <span class='label mr-10px'>容器背景颜色</span>
        <ElColorPicker
          v-model={state.editData.bgColor}
        />
      </ElFormItem>
    </>
  )
}

function createLayout() {
  const layoutList = [
    {value:"header",label:"头部"},
    {value:"aside",label:"侧边栏"},
    {value:"footer",label:"底部"},
  ]
  return (
    <>
     {layoutList.map((item) => {
      return <ElFormItem class='w-150px'>
        <ElCheckbox class='w-full' label={item.label} value={item.value} border></ElCheckbox>
      </ElFormItem>
     })}
    </>
  )
}

export function createDefault(state: any) {
  const activeTab = ref('basic')
  return (
    <>
      <ElTabs v-model={activeTab}>
        <ElTabPane label="基础" name="basic">
          {createBasic(state)}
        </ElTabPane>
        <ElTabPane label="布局" name="layout">
          {createLayout()}
        </ElTabPane>
      </ElTabs>
    </>
  )
}