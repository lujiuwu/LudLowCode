import { defineComponent, ref } from 'vue'
import { ElButton, ElButtonGroup } from 'element-plus'
export default defineComponent({
  props: {
    isBatchOperation: {
      type: Object
    },
    checkList: {
      type: Array
    },
    checkStatus: {
      type: Object
    },
    changeStatus: {
      type: Function
    }
  },
  emits: ['update:isBatchOperation'],
  setup (props, { emit }) {
    const isShowAddBtn = ref(false)
    
    // 全选功能
    const selectAll = () => {
      const allSelected = props.checkStatus.value.every(checked => checked)
      props.checkStatus.value.forEach((_, index) => {
        if (!allSelected) {
          // 如果当前不是全选状态，则全选
          if (!props.checkStatus.value[index]) {
            props.changeStatus(index, null)
          }
        } else {
          // 如果当前是全选状态，则取消全选
          if (props.checkStatus.value[index]) {
            props.changeStatus(index, null)
          }
        }
      })
    }
   
    return () => (
      <div class='flex flex-col gap-5px'>
       <div class='delete-btns'>
         <ElButton onClick={() => { emit('update:isBatchOperation', !props.isBatchOperation.value) }} class='mr-5px' type='primary'>批量操作</ElButton>
         <ElButtonGroup v-show={props.isBatchOperation.value}>
           <ElButton type='primary' onClick={selectAll}>全选</ElButton>
           <ElButton type='primary' disabled={props.checkList.value.length === 0}>删除</ElButton>
         </ElButtonGroup>
       </div>
       <div class='add-btn'>
         <ElButton onClick={() => { isShowAddBtn.value = !isShowAddBtn.value }} class='mr-5px' type='primary' >新增</ElButton>
         <ElButtonGroup v-show={isShowAddBtn.value}>
          <ElButton type='primary' >当前页面</ElButton>
          <ElButton type='primary' >导入</ElButton>
         </ElButtonGroup>
       </div>
      </div>
    )
  }
})
