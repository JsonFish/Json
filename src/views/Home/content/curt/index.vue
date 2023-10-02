<template>
    <div class="box">
        <div class="font">Json's Blog</div>
        <TypeWriter class="type-writer" :typeList="saying" size="16px" color="white"></TypeWriter>
    </div>
</template>
    
<script setup lang='ts'>
import TypeWriter from "@/components/typeWriter/index.vue"
const saying = ["这次我不想逃，喝掉失忆毒药", "斯人若彩虹，遇上方知有","大家好,大家好"];
</script>
    
<style scoped>
.box {
    position: absolute;
    top: -50vh;
    width: 100%;
    height: 50px;
    z-index: 1;

    .font {
        position: absolute;
        top: -60px;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size:50px;
        font-weight: 600;
        color: white;
    }



    .type-writer {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

}



</style>