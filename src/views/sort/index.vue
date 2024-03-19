<template>
  <div class="sort">
    <div class="top">
      <h1>分类</h1>
    </div>
    <div class="main"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.sort {
  width: 100%;
  height: 100vh;
  background: var(--home-background-color);
  border: 1px solid transparent;
  .top {
    width: 100%;
    height: 300px;
    background-color: pink;
  }
  .main {
    /* width: 1000px;
    height: 100%;
    display: flex;
    background-color: skyblue;
    margin: 100px auto 0; */

    .el-card {
      /* width: 50%;
      height: inherit;
      backdrop-filter: blur(16px) saturate(180%);
      -webkit-backdrop-filter: blur(16px) saturate(180%);
      background-color: rgba(255, 255, 255, 0.8);
      border-radius: 12px; */
      /* border: 1px solid rgba(209, 213, 219, 0.3); */
    }
  }
}
</style>
