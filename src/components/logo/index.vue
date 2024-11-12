<template>
  <div class="logo">
    <img src="@/assets/img/bg1.jpg" alt="" />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.logo {
  margin-left: 20px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 25px;
  }
}
.logo:hover {
  transform: rotate(666turn);
  transition-delay: 0.1s;
  transition-property: all;
  transition-duration: 59s;
  transition-timing-function: cubic-bezier(0.34, 0, 0.84, 1);
}
</style>
