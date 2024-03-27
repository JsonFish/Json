<template>
    <div class="img" :style="`background-image: url(${backImage});`">
    </div>
        <router-view></router-view>
</template>

<script setup lang='ts'>
import { onMounted,ref } from "vue";
import { blogInfor } from "@/api/info/index"
const backImage = ref<string>("");
onMounted(() => {
    blogInfor().then(response => {
        backImage.value = response.data.avatarBg
    })
})
</script>

<style lang="scss" scoped>
.img {
    position: fixed;
    z-index: -1;
    width: 100%;
    height: 100%;
    // background-image: url('@/assets/img/bg3.jpg');
    background-size: cover;
    filter: var(--image-filter);
}
</style>