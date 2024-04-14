<template>
    <div class="img" :style="`background-image: url(${backImage});`">
    </div>
    <router-view v-slot="{ Component }">
        <keep-alive :include="['home', 'category','friendLink','daily']">
            <component :is="Component" />
        </keep-alive>
    </router-view>
</template>

<script setup lang='ts'>
import { onMounted,ref } from "vue";
import { homeBackImg } from "@/api/image/index";
defineOptions({
    name: "Main"
});
const backImage = ref<string>("");
onMounted(() => {
    homeBackImg().then(response => {
        backImage.value = response.data
    })
})
</script>

<style lang="scss" scoped>
.img {
    position: fixed;
    z-index: -1;
    width: 100%;
    height: 100%;
    background-size: cover;
    filter: var(--image-filter);
}
</style>