<script setup lang="ts">
import { useRouter } from "vue-router";
defineOptions({
  name: "logo",
});
const router = useRouter();
const toHome = () => {
  router.push({ path: "/" });
};
</script>

<template>
  <div
    class="flex justify-center items-center hover:cursor-pointer"
    @click="toHome"
  >
    <SvgIcon
      color="white"
      class="hover:cursor-pointer mr-3"
      name="logo"
      width="1.8rem"
      height="1.8rem"
    ></SvgIcon>
    <span class="text-xl font-semibold">Json Blog</span>
  </div>
</template>
