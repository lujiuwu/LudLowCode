import { ElRate } from 'element-plus'
import { createSelector } from './style'

export const feedbackComponents = [
  {
    label: '评分',
    key: 'rate',
    type: 'feedBack',
    preview: () => <ElRate class='preview' style="width: 100%"/>,
    render: (renderProps) => {
      const rateSize = renderProps?.props?.size || 'default'
      const count = renderProps?.props?.count || 0
      return <ElRate size={rateSize} modelValue={count} onUpdate:modelValue={(value) => {
        if (renderProps?.props) {
          renderProps.props.count = value
        }
      }} />
    },
    props: {
      size: createSelector('评分尺寸', [
        { label: '默认', value: 'default' },
        { label: '大', value: 'large' },
        { label: '小', value: 'small' }
      ], 'default'),
    }
  }
]
