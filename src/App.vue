<template>
  <div :class="theme">
    <!-- 特效动画 -->
    <Love></Love>
    <!-- <SpiderWeb></SpiderWeb> -->
    <Header></Header>
    <Main></Main>
    <Footer></Footer>
  </div>
</template>

<script setup lang="ts">
import { watch, ref,onMounted } from 'vue'
import Header from '@/components/Layout/Header/index.vue'
import Main from '@/components/Layout/Main/index.vue'
import Footer from '@/components/Layout/Footer/index.vue'
// 引入主题仓库
import useThemeStore from './store/modules/theme';
const themeStore = useThemeStore()
const theme = ref<string>('light')
onMounted(()=>{
  judgment()
})
const judgment =()=>{
  if(themeStore.lightOrDark == false){
    theme.value = 'light'
  }else{
    theme.value = 'dark'
  }
}
// 监听主题变换
watch(()=> themeStore.lightOrDark,(newValue)=>{
  if(newValue){
    theme.value = 'dark'
  }else{
    theme.value = 'light'
  }
})
</script>

<style scoped lang="scss"></style>