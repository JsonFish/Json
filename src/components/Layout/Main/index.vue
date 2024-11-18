<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="['home', 'category', 'friendLink', 'daily']">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script setup lang="ts">
defineOptions({
  name: "Main",
});
</script>
