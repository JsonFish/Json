<template>
    <div class="header">
        <Logo></Logo>
        <Menu></Menu>
    </div>
</template>
    
<script setup lang='ts'>
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
</script>
    
<style lang="scss" scoped>
.header {
    display: flex;
    justify-content: space-between;
    background: transparent;
    
}
</style>