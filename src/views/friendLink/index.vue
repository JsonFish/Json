<template>
    <div class="friendLink">
        <div class="top">
            <p>友链</p>
        </div>
        <div class="main"></div>
        <Footer></Footer>
    </div>
</template>

<script setup lang="ts">
import Footer from "@/components/Footer/index.vue"
</script>

<style scoped lang="scss">
.friendLink {
    width: 100%;

    .top {
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--page-title-color);
        font-size: 50px;
        width: 100%;
        height: 30vh;
    }

    .main {
        width: 100%;
        min-height: 70vh;
        background: var(--home-background-color);
    }

}
</style>