<template>
  <div class="iconBox hover:cursor-pointer" @click="changeTheme">
    <SvgIcon
      :color="themeStore.darkTheme ? '#aaa' : '#313131'"
      :name="themeStore.darkTheme ? 'moon' : 'sunny'"
      width="1rem"
      height="1rem"
    ></SvgIcon>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import useThemeStore from "@/store/modules/theme.ts";
const themeStore = useThemeStore();
defineOptions({
  name: "ThemeSwitch",
});
onMounted(() => {
  judgeTheme();
});
const judgeTheme = () => {
  if (themeStore.darkTheme) {
    var document: any = window.document;
    document.documentElement.classList.toggle("dark");
  }
};
const changeTheme = (e: any) => {
  themeStore.darkTheme = !themeStore.darkTheme;
  var document: any = window.document;
  const transition = document.startViewTransition(() => {
    document.documentElement.classList.toggle("dark");
  });

  // 在 transition.ready 的 Promise 完成后，执行自定义动画
  transition.ready.then(() => {
    // 由于我们要从鼠标点击的位置开始做动画，所以我们需要先获取到鼠标的位置
    const { clientX, clientY } = e;

    // 计算半径，以鼠标点击的位置为圆心，到四个角的距离中最大的那个作为半径
    const radius = Math.hypot(
      Math.max(clientX, innerWidth - clientX),
      Math.max(clientY, innerHeight - clientY)
    );
    const clipPath = [
      `circle(0% at ${clientX}px ${clientY}px)`,
      `circle(${radius}px at ${clientX}px ${clientY}px)`,
    ];
    const isDark = document.documentElement.classList.contains("dark");
    // 自定义动画
    document.documentElement.animate(
      {
        // 如果要切换到暗色主题，我们在过渡的时候从半径 100% 的圆开始，到 0% 的圆结束
        clipPath: isDark ? clipPath.reverse() : clipPath,
      },
      {
        duration: 600,
        // 如果要切换到暗色主题，我们应该裁剪 view-transition-old(root) 的内容
        pseudoElement: isDark
          ? "::view-transition-old(root)"
          : "::view-transition-new(root)",
      }
    );
  });
};
</script>

<style scoped lang="scss">
.iconBox {
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 1.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.iconBox:hover {
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
