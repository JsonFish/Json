<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
const props = defineProps({
  typeList: {
    type: Array,
    default: () => [],
  },
  size: {
    type: String,
    default: "1rem",
  },
  color: {
    type: String,
    ddfault: "white",
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
});

const loopList = ref([]);
const arr = [];

onMounted(() => {
  if (!props.typeList.length) return;
  let lastTime = 0;
  props.typeList.forEach((v, index) => {
    if (!v.length) {
      console.error(`第${index + 1}条语句为空，不能打印`);
      return;
    }
    if (v.length < 3) {
      console.error(`第${index + 1}条语句字数太少，最少三个字`);
      return;
    }
    let loop = {
      target: v,
      delay: lastTime,
    };
    loopList.value.push(loop);
    // 计算这一句播放的时间，用于下一句的播放
    lastTime =
      Math.round(
        (lastTime + v.length * props.wordPrintTime + props.timeSpace) * 10
      ) / 10;
  });

  loopList.value.forEach((loop) => {
    let timer = setTimeout(() => {
      const writers = document.getElementById("writer");
      if (!writers) return;
      let num = 0,
        str = "";
      let interTimer = setInterval(() => {
        str += loop.target.charAt(num);
        writers.innerHTML = str;
        if (num < loop.target.length) {
          num++;
        } else {
          clearInterval(interTimer);
          interTimer = null;
        }
      }, props.wordPrintTime * 1000);
    }, loop.delay * 1000);
    arr.push(timer);
  });
});

onBeforeUnmount(() => {
  arr.length &&
    arr.forEach((a) => {
      clearTimeout(a);
    });
});
</script>

<template>
  <div class="type-writer">
    <span id="writer" :style="{ fontSize: size, color: color }"></span>
    <span class="space" :style="{ fontSize: size, color: color }">|</span>
  </div>
</template>

<style lang="scss" scoped>
.space {
  vertical-align: text-bottom;
  animation: showInfinite 0.8s infinite both;
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
