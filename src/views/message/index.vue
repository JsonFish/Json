<template>
    <div class="message">
        <div class="top">
            <vue-danmaku class="danmaku" ref="danmakuRef" v-model:danmus="danmus" useSlot loop :autoplay="true"
                randomChannel :channels="23">
                <template v-slot:dm="{ danmu }">
                    <div style="display: flex">
                        <el-avatar :size="30" shape="circle" :src="danmu.avatar" fit="cover"></el-avatar>
                        <span style="color: var(--text-color); line-height: 30px; align-items: center">: {{ danmu.text
                            }}</span>
                    </div>
                </template>
            </vue-danmaku>
        </div>
        
        <div class="bottom">
            <div class="main">
                <el-input v-model="message" class="input" placeholder="说点什么吧" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"
                    size="normal" clearable></el-input>
                <el-button @click="add">发送</el-button>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script setup lang="ts">
import Footer from "@/components/Footer/index.vue"
import vueDanmaku from 'vue3-danmaku'
import { ref } from "vue";
// const danmus = ref(['danmu1', 'danmu2', 'danmu3', 'danmu1', "danmu1", 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu2', 'danmu3', 'danmu1', "danmu1", 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1', 'danmu1'])
const danmus = ref([{ avatar: 'http://sa6qp7vwh.hb-bkt.clouddn.com/1710421774015.png', name: 'Json', text: 'NB666' }, { avatar: 'http://sa6qp7vwh.hb-bkt.clouddn.com/1710421774015.png', name: 'Tom', text: '我要吐了' }, { avatar: 'http://sa6qp7vwh.hb-bkt.clouddn.com/1710421774015.png', name: 'bgvjab', text: '666666' }, { avatar: 'http://sa6qp7vwh.hb-bkt.clouddn.com/1710421774015.png', name: '固定方式', text: '不大方便' }, { avatar: 'http://sa6qp7vwh.hb-bkt.clouddn.com/1710421774015.png', name: '高大上覆盖的', text: '对方是个斯蒂芬' }])
const danmakuRef = ref<any>();
const message = ref<string>()

const add = () => {
    danmakuRef.value.add({ text: message.value})
}
</script>

<style scoped lang="scss">
.message {

    .top {
        height: 100vh;
        overflow: hidden;

        .danmaku {
            margin-top: 5vh;
            height: 95vh;
        }
    }

    .bottom {
        min-height: 50vh;
        background: var(--home-background-color);
        border: 1px solid transparent;

        .main {
            width: 50rem;
            height: 300px;
            background-color: var(--el-card--background-color);
            margin: 10px auto;

            .input {
                background-color: transparent;
            }
        }
    }
}
</style>