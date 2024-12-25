<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  typeList: {
    type: Array,
    default: [],
  },
  size: {
    type: String,
    default: '1rem',
  },
  color: {
    type: String,
    default: 'white',
  },
  // 句子与句子之间的间隔时间
  timeSpace: {
    type: Number,
    default: 0.8,
  },
  // 打印一个字的时间长度
  wordPrintTime: {
    type: Number,
    default: 0.3,
  },
})

const loopIndex = ref(0) // 当前打印的句子索引
const timers = [] // 定时器数组

const startTyping = () => {
  const writers = document.getElementById('writer')
  if (!writers || !props.typeList.length) return

  let currentIndex = loopIndex.value // 当前索引
  let currentText = props.typeList[currentIndex] // 当前句子
  let num = 0
  let str = ''

  // 清空当前内容并添加淡入效果
  writers.innerHTML = ''
  writers.style.opacity = '0' // 隐藏当前内容
  setTimeout(() => (writers.style.opacity = '1'), 100) // 添加淡入动画

  // 打印当前句子的逻辑
  const typeInterval = setInterval(() => {
    str += currentText.charAt(num)
    writers.innerHTML = str

    if (num < currentText.length - 1) {
      num++
    } else {
      clearInterval(typeInterval) // 当前句子打印完成
      timers.splice(timers.indexOf(typeInterval), 1) // 移除完成的定时器

      // 准备打印下一句
      setTimeout(() => {
        loopIndex.value = (currentIndex + 1) % props.typeList.length // 下一个索引
        startTyping() // 递归调用
      }, props.timeSpace * 1000)
    }
  }, props.wordPrintTime * 1000)

  timers.push(typeInterval) // 保存定时器
}

onMounted(() => {
  startTyping()
})

onBeforeUnmount(() => {
  timers.forEach((timer) => clearInterval(timer))
})
</script>

<template>
  <div class="flex items-center">
    <span id="writer" :style="{ fontSize: size, color: color }"></span>
    <span class="space" :style="{ fontSize: size, color: color }">|</span>
  </div>
</template>

<style lang="scss" scoped>
.space {
  vertical-align: text-bottom;
  animation: showInfinite 1s infinite both;
}

@keyframes showInfinite {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
</style>
