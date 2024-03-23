<template>
  <div class="sort">
    <div class="top">
      <p>分类</p>
    </div>
    <div class="main"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {

});
</script>

<style scoped lang="scss">
.sort {
  width: 100%;
  height: 1000px;
  // background-color: transparent;
  // background: var(--home-background-color);

  .top {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--text-color);
    font-size: 50px;
    width: 100%;
    height: 200px;
  }

  .main {
    width: 100%;
    height: 1000px;
    background: var(--home-background-color);
  }

}
</style>
