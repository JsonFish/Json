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

<style lang="scss">
/* 整个滚动条 */
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

/* 滚动条上的滚动滑块 */
::-webkit-scrollbar-thumb {
    background-color: rgb(32, 182, 241);
    /* 关键代码 */
    background-image: -webkit-linear-gradient(45deg,
            rgba(255, 255, 255, 0.4) 25%,
            transparent 25%,
            transparent 50%,
            rgba(255, 255, 255, 0.4) 50%,
            rgba(255, 255, 255, 0.4) 75%,
            transparent 75%,
            transparent);
    border-radius: 32px;
}

/* 滚动条轨道 */
::-webkit-scrollbar-track {
    background-color: #dbeffd;
    border-radius: 32px;
}
</style>