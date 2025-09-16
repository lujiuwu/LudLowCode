import { events } from '@/packages/events'
import { render } from 'vue'
export function useMenuDragger (containerRef, data) {
  // 当前拖拽的元素
  let currentComponent = null
  // 拖拽方法
  function DragEnter (e) {
    e.dataTransfer.dropEffect = 'move'
  }
  function DragOver (e) {
    e.preventDefault()
  }
  function DragLeave (e) {
    e.dataTransfer.dropEffect = 'none'
  }
  function Drop (e) {
    // 获取容器的位置信息
    const containerRect = containerRef.value.getBoundingClientRect()
    
    // 计算鼠标相对于容器的位置
    const relativeX = e.clientX - containerRect.left
    const relativeY = e.clientY - containerRect.top
    
    // 更新数据 - 直接使用鼠标位置作为组件的左上角位置
    data.value = {
      ...data.value,
      blocks: data.value.blocks.concat([{
        top: relativeY,
        left: relativeX,
        key: currentComponent.key,
        zIndex: 1,
        alignCenter: false, // 不需要居中，直接使用鼠标位置
        props: {

        },
        model: {

        }
      }])
    }
    currentComponent = null
  }
  function DragFunction (e, component) {
  // 1. 获取 VNode
    const vnode = component.preview()

    // 2. 创建一个容器元素来渲染 VNode
    const container = document.createElement('div')
    container.style.position = 'absolute'
    container.style.top = '-9999px'
    document.body.appendChild(container)

    // 3. 渲染 VNode 到真实 DOM
    render(vnode, container)

    // 4. 获取渲染后的 DOM 元素
    const dragPreview = container.firstElementChild

    // 5. 设置拖拽预览
    if (dragPreview) {
      dragPreview.style.opacity = '0.7'
      dragPreview.style.pointerEvents = 'none'
      e.dataTransfer.setDragImage(dragPreview, 0, 0)
    }

    // 6. 设置拖拽数据
    e.dataTransfer.setData('component', JSON.stringify(component))

    // 7. 绑定事件
    containerRef.value?.addEventListener('dragenter', DragEnter)
    containerRef.value?.addEventListener('dragover', DragOver)
    containerRef.value?.addEventListener('dragleave', DragLeave)
    containerRef.value?.addEventListener('drop', Drop)

    currentComponent = component
    events.emit('start')

    // 8. 清理函数
    const cleanup = () => {
      render(null, container) // 卸载 VNode
      document.body.removeChild(container)
    }

    setTimeout(cleanup, 0)
  }
  function DragEndFunction (e, component) {
    containerRef.value.removeEventListener('dragenter', DragEnter)
    containerRef.value.removeEventListener('dragover', DragOver)
    containerRef.value.removeEventListener('dragleave', DragLeave)
    containerRef.value.removeEventListener('drop', Drop)

    // 拖拽之后 -- 也需要发布一个事件
    events.emit('end')
  }
  return {
    DragFunction,
    DragEndFunction
  }
}
