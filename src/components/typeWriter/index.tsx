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
    const loopIndex = ref(0) // 当前打印的句子索引
    const startTyping = () => {
      const writer = document.getElementById('writer') as HTMLElement
      if (!writer || props.typeList.length === 0) return
      let currentIndex = loopIndex.value // 当前索引
      let currentText = props.typeList[currentIndex] // 当前句子
      let num = 0
      let str = ''
      // 清空当前内容并添加淡入效果
      writer.innerHTML = ''
      writer.style.opacity = '0' // 隐藏当前内容
      setTimeout(() => (writer.style.opacity = '1'), 100) // 添加淡入动画
      // 打印当前句子的逻辑
      const typeInterval = setInterval(() => {
        str += currentText.charAt(num)
        writer.innerHTML = str
        if (num < currentText.length - 1) {
          num++
        } else {
          clearInterval(typeInterval) // 当前句子打印完成
          // 准备打印下一句
          setTimeout(() => {
            loopIndex.value = (currentIndex + 1) % props.typeList.length // 下一个索引
            startTyping() // 递归调用
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
          id="writer"
          style={{ fontSize: props.size, color: props.color }}
        ></span>
        <span class="space" style={{ fontSize: props.size }}>
          |
        </span>
      </div>
    )
  },
})
