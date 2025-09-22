import { ref, computed } from 'vue'
export function useCheck (componentsListLength: number) {
  const checkStatus = ref(new Array(componentsListLength).fill(false))
  
  const checkList = computed(() => {
    return checkStatus.value
      .map((checked, index) => checked ? index : null)
      .filter(index => index !== null)
  })
  
  function changeStatus (index: number) {
    // 切换状态
    checkStatus.value[index] = !checkStatus.value[index]
  }
  
  return { checkStatus, checkList, changeStatus }
}
