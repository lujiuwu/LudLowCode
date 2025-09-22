import { basicComponents, layoutComponents, feedbackComponents, myComponents } from '@/utils/_types'
import type { PreviewComponent } from '@/types/PreviewComponent'

function createEditionConfig () {
  const componentList = {
    basic: [] as PreviewComponent[],
    layout: [] as PreviewComponent[],
    feedBack: [] as PreviewComponent[],
    my: [] as PreviewComponent[]
  }
  const componentMap = new Map<string, PreviewComponent>()
  return {
    componentList,
    componentMap,
    register: (component:PreviewComponent) => {
      if (component.type === 'basic') {
        componentList.basic.push(component)
      } else if (component.type === 'layout') {
        componentList.layout.push(component)
      } else if (component.type === 'feedBack') {
        componentList.feedBack.push(component)
      } else if (component.type === 'my') {
        componentList.my.push(component)
      }
      componentMap.set(component.key, component)
    }
  }
}

// 注册映射关系
export const registerConfig = createEditionConfig()

// 自动注册基础组件
basicComponents.forEach(component => {
  registerConfig.register(component)
})

layoutComponents.forEach(component => {
  registerConfig.register(component)
})

feedbackComponents.forEach(component => {
  registerConfig.register(component)
})

myComponents.forEach(component => {
  registerConfig.register(component)
})
