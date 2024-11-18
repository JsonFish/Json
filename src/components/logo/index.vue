<template>
  <div class="logo">
    <!-- <img src="@/assets/img/bg1.jpg" alt="" /> -->
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.logo {
  img {
    width: 56px;
    height: 56px;
    border-radius: 28px;
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
