<template>
    <div class="img">
    </div>
    <router-view></router-view>
</template>

<script setup lang='ts'>

</script>

<style lang="scss" scoped>
.img {
    position: fixed;
    z-index: -1;
    width: 100%;
    height: 100%;
    background-image: url('@/assets/img/002.jpg');
    background-size: cover;
    filter: var(--image-filter);
}
</style>