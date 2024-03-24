<template>
    <div class="message">
        <div class="top">
            <vue-danmaku class="danmaku" ref="danmakuRef" v-model:danmus="danmus" useSlot loop :autoplay="true" randomChannel :channels="23">
                <template v-slot:dm="{ danmu }">
                    <div style="display: flex">
                        <el-avatar :size="30" shape="circle" :src="danmu.avatar" fit="cover"></el-avatar>
                        <span style="color: var(--text-color); line-height: 30px; align-items: center">: {{ danmu.text }}</span>
                    </div>
                </template>
            </vue-danmaku>
        </div>
        <!-- <el-button @click="add">push</el-button> -->
        <div class="bottom">
            <div class="main">
                <el-card shadow="always" :body-style="{ padding: '20px' }">
                <template #header>
                <div>
                <span><!-- card title --></span>
                </div>
                </template>
                <!-- card body -->
                </el-card>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import vueDanmaku from 'vue3-danmaku'
import { ref } from "vue";
// const danmus = ref(['danmu1', 'danmu2', 'danmu3', 'danmu1', "danmu1", 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu2', 'danmu3', 'danmu1', "danmu1", 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1'])
const danmus = ref([{ avatar: 'http://sa6qp7vwh.hb-bkt.clouddn.com/1710421774015.png', name: 'Json', text: '强哥NB666' }, { avatar: 'http://sa6qp7vwh.hb-bkt.clouddn.com/1710421774015.png', name: 'Tom', text: '81632718361' }, { avatar: 'http://sa6qp7vwh.hb-bkt.clouddn.com/1710421774015.png', name: 'bgvjab', text: '公司大的公司在' }, { avatar: 'http://sa6qp7vwh.hb-bkt.clouddn.com/1710421774015.png', name: '固定方式', text: '不大方便' }, { avatar: 'http://sa6qp7vwh.hb-bkt.clouddn.com/1710421774015.png', name: '高大上覆盖的', text: '对方是个斯蒂芬' }])
const danmakuRef = ref<any>();

// const add = () => {
//     danmakuRef.value.add("666666666666666")
// }
</script>

<style scoped>
.message {

    .top {
        height: 100vh;
        overflow: hidden;
        .danmaku{
            margin-top: 5vh;
            height: 95vh;
        }
    }

    .bottom {
        height: 500px;
        background: var(--home-background-color);
        .main{
            width: 50rem;
            margin: 0 auto;
        }
    }
}
</style>