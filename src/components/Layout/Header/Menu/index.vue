<script setup lang="ts">
import { constantRoute } from "@/router/routes";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
defineOptions({
  name: "menu",
});
const router = useRouter();
const servlet = (path: string) => {
  router.push(path);
};
const route = useRoute();
</script>

<template>
  <div class="flex justify-center items-center text-menu">
    <div
      :class="{
        'text-menuActive font-semibold': route.path === routeItem.path,
      }"
      class="flex h-4 mx-2 hover:cursor-pointer hover:text-menuActive hover:font-semibold"
      v-for="(routeItem, index) in constantRoute[0].children"
      v-show="routeItem.meta.show"
      :key="index"
      @click="servlet(routeItem.path)"
    >
      <component class="w-4 mr-1" :is="routeItem.meta.icon"></component>
      <span class="text-sm leading-4">{{ routeItem.meta.title }}</span>
    </div>
  </div>
</template>
