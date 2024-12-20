<script setup lang="ts">
import { constantRoute } from '@/router/routes'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
defineOptions({
  name: 'Menu',
})
const router = useRouter()
const servlet = (path: string) => {
  router.push(path)
}
const route = useRoute()
</script>

<template>
  <div class="flex text-menu">
    <div
      :class="{
        'text-menuActive font-semibold': route.path === item.path,
      }"
      class="flex items-center h-full mx-2 hover:cursor-pointer hover:text-menuActive hover:font-semibold"
      v-for="(item, index) in constantRoute[0].children"
      v-show="item.meta.show"
      :key="index"
      @click="servlet(item.path)"
    >
      <component class="w-4 mr-1" :is="item.meta.icon"></component>
      <span class="text-sm leading-4">{{ item.meta.title }}</span>
    </div>
  </div>
</template>
