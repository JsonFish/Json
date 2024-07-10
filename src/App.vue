<template>
  <div :class="theme">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component"></component>
        </keep-alive>
      </router-view>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, onMounted } from 'vue'
import useThemeStore from './store/modules/theme';
const themeStore = useThemeStore()
const theme = ref<string>('light')
onMounted(() => {
  judgment()
})
const judgment = () => {
  if (!themeStore.lightOrDark) {
    theme.value = 'light'
  } else {
    theme.value = 'dark'
  }
}
// 监听主题变换
// watch(() => themeStore.lightOrDark, (newValue) => {
//   if (newValue) {
//     theme.value = 'dark'
//   } else {
//     theme.value = 'light'
//   }
// })
</script>

<style lang="scss">
</style>