<template>
  <div>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component"></component>
        </keep-alive>
      </router-view>
  </div>
</template>

<script setup lang="ts">
// import { ref, onMounted, watch } from 'vue'
// import useThemeStore from './store/modules/theme';
// const themeStore = useThemeStore()
// const theme = ref<string>('')
// onMounted(() => {
//   judgment()
// })
// const judgment = () => {
//   if (!themeStore.darkTheme) {
//     theme.value = 'light'
//   } else {
//     theme.value = 'dark'
//   }
// }
// 监听主题变换
// watch(() => themeStore.darkTheme, (newValue) => {
//   if (newValue) {
//     theme.value = 'dark'
//   } else {
//     theme.value = 'light'
//   }
// })
</script>

<style lang="scss">
</style>