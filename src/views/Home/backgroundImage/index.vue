<template>
    <div class="img"></div>
</template>
    
<script setup lang='ts'>

</script>
    
<style  scoped>
.img {
    position: fixed;
    z-index: -1;
    width: 100%;
    height: 100vh;
    background-image: url('@/assets/img/002.jpg');
    background-size: cover;
    filter: var(--image-filter);
}
</style>
   
