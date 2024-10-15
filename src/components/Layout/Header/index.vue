<template>
  <div class="header" :class="className">
    <Logo></Logo>
    <Menu></Menu>
  </div>
</template>

<script lang="ts">
export default {
  name: "Header",
};
</script>
<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import Logo from "@/components/logo/index.vue";
import Menu from "@/components/Menu/index.vue";
// 组件挂载完成之后开始监听页面滚动事件
onMounted(() => {
  window.addEventListener("scroll", Scroll, true);
});
// 组件销毁前移除监听
onBeforeUnmount(() => {
  window.removeEventListener("scroll", () => {});
});
// 整个header的类名
const className = ref<string>("");
// 页面位置
const prevScrollPos = ref<number>(0);
const Scroll = () => {
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop;
  // 向下滑动
  if (scrollTop < 10 && scrollTop > prevScrollPos.value) {
    className.value = "headerFirstUp";
    return;
  }
  // 页面中间向上滑动
  if (scrollTop >= 50) {
    // 向上滚动
    if (scrollTop < prevScrollPos.value) {
      className.value = "headerDown";
      return;
    }
    // else {
    //     // 向下
    //     className.value = 'headerUp'
    // }
  }
  if (scrollTop == 0) {
    className.value = "headertopDown";
  }

  prevScrollPos.value = scrollTop;
};
</script>

<style lang="scss" scoped>
@keyframes firstUp {
  0% {
    top: 0;
  }

  100% {
    top: -50px;
  }
}

@keyframes up {
  0% {
    top: 0;
    background-color: var(--header-background-color);
  }

  100% {
    top: -50px;
    background-color: transparent;
  }
}

@keyframes down {
  0% {
    top: -50px;
    background-color: transparent;
  }

  100% {
    top: 0;
    background-color: var(--header-background-color);
  }
}

@keyframes topDown {
  0% {
    background-color: var(--header-background-color);
  }

  100% {
    background-color: transparent;
  }
}

.header {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
}

.headerUp {
  animation-name: up;
  animation-duration: 1s;
  animation-fill-mode: forwards;
}

.headerFirstUp {
  animation-name: firstUp;
  animation-duration: 0.8s;
  animation-fill-mode: forwards;
}

.headerDown {
  animation-name: down;
  animation-duration: 0.3s;
  animation-fill-mode: forwards;
}

.headertopDown {
  animation-name: topDown;
  animation-duration: 1s;
  animation-fill-mode: forwards;
}
</style>
