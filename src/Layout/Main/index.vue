<script setup lang="ts">
defineOptions({
  name: 'Main',
})
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="['home', 'articleList', 'friendLink', 'daily']">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
