import { events } from '@/packages/events'
import { render, type Ref } from 'vue'
import type { Data } from '@/types/Data'
import type { PreviewComponent } from '@/types/PreviewComponent'

export function useMenuDragger (containerRef:Ref<HTMLElement|null>, data:Ref<Data>) {
  // 当前拖拽的元素
  let currentComponent = null as PreviewComponent | null
  // 拖拽方法
  function DragEnter (e:DragEvent) {
    e.dataTransfer && (e.dataTransfer.dropEffect = 'move')
  }
  function DragOver (e:DragEvent) {
    e.preventDefault()
  }
  function DragLeave (e:DragEvent) {
    e.dataTransfer && (e.dataTransfer.dropEffect = 'none')
  }
  function Drop (e:DragEvent) {
    if (!containerRef.value) return
    
    // 获取容器的位置信息
    const containerRect = containerRef.value.getBoundingClientRect()
    
    // 计算鼠标相对于容器的位置
    const relativeX = e.clientX - containerRect.left
    const relativeY = e.clientY - containerRect.top
    
    // 更新数据 - 直接使用鼠标位置作为组件的左上角位置
    if (!currentComponent) return
    
    data.value = {
      ...data.value,
      blocks: data.value.blocks.concat([{
        top: relativeY,
        left: relativeX,
        key: currentComponent.key,
        zIndex: 1,
        alignCenter: false, // 不需要居中，直接使用鼠标位置
        width: 0, // 初始宽度，会在渲染后更新
        height: 0, // 初始高度，会在渲染后更新
        focus: false, // 初始焦点状态
        props: {},
        model: {}
      }])
    }
    currentComponent = null
  }
  function DragFunction (e:DragEvent, component:PreviewComponent) {
  // 1. 获取 VNode
    const vnode = component.preview()

    // 2. 创建一个容器元素来渲染 VNode
    const container = document.createElement('div')
    container.style.position = 'absolute'
    container.style.top = '-9999px'
    document.body.appendChild(container)

    // 3. 渲染 VNode 到真实 DOM
    render(vnode as any, container)

    // 4. 获取渲染后的 DOM 元素
    const dragPreview = container.firstElementChild

    // 5. 设置拖拽预览
    if (dragPreview && e.dataTransfer) {
      const htmlElement = dragPreview as HTMLElement
      htmlElement.style.opacity = '0.7'
      htmlElement.style.pointerEvents = 'none'
      e.dataTransfer.setDragImage(htmlElement, 0, 0)
    }

    // 6. 设置拖拽数据
    e.dataTransfer?.setData('component', JSON.stringify(component))

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
  function DragEndFunction () {
    if (!containerRef.value) return
    
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
