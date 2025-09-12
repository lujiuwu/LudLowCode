import { ElButton } from 'element-plus'
export const myComponents = [
  {
    label: '我的组件1',
    key: 'my1',
    type: 'my',
    preview: () => <div>我的组件1</div>,
    render: () => <div>我的组件1</div>
  },
  {
    label: '我的组件2',
    key: 'my2',
    type: 'my',
    preview: () => <ElButton>我的组件2</ElButton>,
    render: () => <ElButton>我的组件2</ElButton>
  }
]
