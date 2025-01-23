import { defineComponent, ref, onMounted, PropType } from 'vue'
import './index.scss'

interface Props {
  // 打印的句子列表
  typeList: string[]
  // 字体大小
  size: string
  // 字体颜色
  color: string
  // 每段话之间的间隔时间
  timeSpace: number
  // 打字速率
  wordPrintTime: number
}

export default defineComponent({
  props: {
    typeList: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    size: {
      type: String,
      default: '1rem',
    },
    color: {
      type: String,
      default: '',
    },
    timeSpace: {
      type: Number,
      default: 0.8,
    },
    wordPrintTime: {
      type: Number,
      default: 0.3,
    },
  },
  name: 'TypeWriter',
  setup(props: Props) {
    const typewriter = ref()
    let loopIndex = 0 // 当前打印的句子索引
    const startTyping = () => {
      if (!typewriter || props.typeList.length === 0) return
      let currentText = props.typeList[loopIndex] // 当前句子
      typewriter.value.innerHTML = ''
      let textIndex = 0
      let text = ''
      // 打印当前句子的逻辑
      const typeInterval = setInterval(() => {
        text += currentText.charAt(textIndex)
        typewriter.value.innerHTML = text
        if (textIndex < currentText.length - 1) {
          textIndex++
        } else {
          clearInterval(typeInterval) // 当前句子打印完成
          // 准备打印下一句
          setTimeout(() => {
            loopIndex = (loopIndex + 1) % props.typeList.length
            startTyping()
          }, props.timeSpace * 1000)
        }
      }, props.wordPrintTime * 1000)
    }

    onMounted(() => {
      startTyping()
    })

    return () => (
      <div class="flex items-center">
        <span
          ref={typewriter}
          style={{ fontSize: props.size, color: props.color }}
        ></span>
        <span class="space" style={{ fontSize: props.size }}>
          |
        </span>
      </div>
    )
  },
})
