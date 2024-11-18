<template>
  <div class="flex justify-center items-center ml-5">
    <div class="h-5 w-7 border-l border-solid border-neutral-500"></div>
    <div
      v-if="!userStore.avatar"
      title="登录"
      @click="toLogin"
      class="w-7 h-7 flex justify-center items-center rounded-lg border border-solid border-slate-400 hover:cursor-pointer"
    >
      <SvgIcon
        :color="themeStore.darkTheme ? '#aaa' : '#000'"
        name="login"
        width="1.2rem"
        height="1.2rem"
      ></SvgIcon>
    </div>
    <div v-else class="w-8 h-8 hover:cursor-pointer">
      <el-avatar :size="32" :src="userStore.avatar" />
    </div>
    <div
      title="github"
      class="w-7 h-7 ml-3 flex justify-center items-center rounded-lg border border-solid border-slate-400 hover:cursor-pointer"
    >
      <SvgIcon
        :color="themeStore.darkTheme ? '#aaa' : '#000'"
        name="github"
        width="1.4rem"
        height="1.4rem"
      ></SvgIcon>
    </div>
    <div
      class="w-7 h-7 ml-3 flex rounded-lg justify-center items-center border border-solid border-slate-400 hover:cursor-pointer"
      @click="changeTheme"
    >
      <SvgIcon
        :color="themeStore.darkTheme ? '#aaa' : '#313131'"
        :name="themeStore.darkTheme ? 'moon' : 'sunny'"
        width="1.3rem"
        height="1.3rem"
      ></SvgIcon>
    </div>
    <LoginDialog ref="loginDialog"></LoginDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import LoginDialog from "../Login/index.vue";
import useThemeStore from "@/store/modules/theme.ts";
const themeStore = useThemeStore();
const loginDialog = ref<any>(null);
import useUserStore from "@/store/modules/user";
const userStore = useUserStore();
defineOptions({
  name: "HeaderBtn",
});

onMounted(() => {
  judgeTheme();
});
const toLogin = () => {
  loginDialog.value.dialogFormVisible = true;
};

const judgeTheme = () => {
  if (themeStore.darkTheme) {
    var document: Document = window.document;
    document.documentElement.classList.toggle("dark");
  }
};
const changeTheme = (e: any) => {
  themeStore.darkTheme = !themeStore.darkTheme;
  var document: Document = window.document;
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
