<template>
  <div class="middle">
    <ArticleList></ArticleList>
    <Introduce></Introduce>
  </div>
</template>
    
<script setup lang='ts'>
import ArticleList from './articleList/index.vue'
import Introduce from './introduce/index.vue'
</script>
    
<style scoped>
.middle {
  width: 70vw;
  height: 700px;
   display: flex;
  justify-content: space-between; 
  background-color: rgb(126, 145, 145);
}
</style>