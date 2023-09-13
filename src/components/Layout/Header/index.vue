<template>
    <div :class="className">
        <div class="header">
            <Logo></Logo>
            <Menu></Menu>
        </div>
    </div>
</template>
    
<script setup lang='ts'>
import { onMounted, onBeforeUnmount, ref } from 'vue';
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
// 组件挂载监听页面滚动事件
onMounted(() => {
    window.addEventListener('scroll', Scroll, true)
})
// 组件销毁前移除监听
onBeforeUnmount(() => {
    window.removeEventListener('scroll', () => { });
})
const className = ref('')

const Scroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    console.log(scrollTop);
    
    if (scrollTop >= 50) {
        // console.log(1);
        
        // className.value = 'headerUp'

    }

}
</script>
    
<style lang="scss" scoped>
@keyframes up {
    0% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(-50px);
    }
}

@keyframes down {
    0% {
        transform: translateY(-50px);
    }

    100% {
        transform: translateY(0);
    }
}

.header {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    // background: transparent;
    // background-color: white;
    position: fixed;
    left: 0;
    top: 0;
}

.headerUp {
    animation-name: up;
    animation-duration: 0.8s;
    animation-fill-mode: forwards;
}

.headerDown {
    animation-name: down;
    animation-duration: 0.8s;
    animation-fill-mode: forwards;
}
</style>