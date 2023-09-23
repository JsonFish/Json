<template>
    <div class="main">
        <Curt></Curt>
        <div class="svg">
            <SvgIcon name="down" width="1.5rem" height="1.5rem" color="pink"></SvgIcon>
        </div>
        <div class="flex">
            <Middle></Middle>
        </div>

    </div>
</template>
    
<script setup lang='ts'>
import Curt from './curt/index.vue'
import Middle from './middle/index.vue'
</script>
    
<style lang="scss" scoped>
.main {
    position: relative;
    top: 100vh;
    width: 100%;
    // height: 100%;
    height: 1500px;
    background-image: linear-gradient(to right, #8bbbb2 0%, #878fb4 100%);

    .svg {
        width: 100%;
        height: 5vh;
        position: absolute;
        top: -5vh;
        left: 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
        animation-name: move;
        animation-duration: 2s;
        animation-iteration-count: infinite;
        animation-timing-function: ease;
    }
    .flex{
        display: flex;
        justify-content: space-around;
    }
}

@keyframes move {
    0% {
        top: -5vh;
    }

    50% {
        top: -10vh;
    }

    100% {
        top: -5vh;
    }
}
</style>