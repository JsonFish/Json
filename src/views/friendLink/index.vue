<template>
    <div class="friendLink">
        <div class="top">
            <p>友链</p>
        </div>
        <div class="main"></div>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.friendLink {
    width: 100%;
    height: 1000px;

    .top {
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--text-color);
        font-size: 50px;
        width: 100%;
        height: 200px;
    }

    .main {
        width: 100%;
        height: 1000px;
        background: var(--home-background-color);
    }

}
</style>