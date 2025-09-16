import { defineComponent } from 'vue'
import data from '../../data.json'

export default defineComponent({
  props: {
    type: {
      type: String,
      default: 'preview'
    }
  },
  setup (props) {
    const style = {
      preview: 'w-full h-30px bg-blueGray',
      render: 'h-30px bg-red'
    }
    
    const inlineStyle = props.type === 'render' ? {
      width: `${data.container.width}px`
    } : {}
    
    return () => <>
      <div class={style[props.type]} style={inlineStyle}>
        默认文本
      </div>
    </>
  }
})
