<template>
    <div class="message">
        <div class="top">
            <vue-danmaku class="danmaku" ref="danmakuRef" v-model:danmus="danmus" useSlot loop :autoplay="true"
                randomChannel :channels="23">
                <template v-slot:dm="{ danmu }">
                    <div style="display: flex">
                        <el-avatar :size="30" shape="circle" :src="danmu.avatar" fit="cover"></el-avatar>
                        <span style="color: #c0c4cc; line-height: 30px; align-items: center">{{" " + danmu.text
                            }}</span>
                    </div>
                </template>
            </vue-danmaku>
        </div>

        <div class="bottom">
            <div class="main">
                <p class="p">留言</p>
                <div class="input-box">
                    <el-input v-model="text" class="input" placeholder="说点什么吧" size="large" clearable></el-input>
                    <el-button :disabled="!text" plain type="primary" icon="Promotion" @click="add"
                        size="large">发送</el-button>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Footer from "@/components/Footer/index.vue"
import vueDanmaku from 'vue3-danmaku'
import { ElMessage } from "element-plus";
import { getMessage, addMessage } from "@/api/message/index"
import type { MessageInfo } from "@/api/message/type";
import useUserStore from '@/store/modules/user';
defineOptions({
    name: "message"
});
const userStore = useUserStore()
const danmus = ref<MessageInfo[]>();
const danmakuRef = ref<any>();
const text = ref<string>("")
onMounted(() => {
    getMessageList();
})
const getMessageList = () => {
    getMessage().then(response => {
        danmus.value = response.data
    })
}
const add = async () => {
    if(!userStore.username){
        ElMessage({ type: "warning", message: "登陆后才能留言哦" });
        text.value = ""
        return ;
    }
    await addMessage({text:text.value}).then(response=>{
        if(response.code == 200){
            ElMessage({type:"success",message:"留言成功"})
            danmakuRef.value.add({ text: text.value, avatar: userStore.avatar })
            text.value = ""
        }else{
            ElMessage({ type: "error", message: response.message });
        }
    })   
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
        min-height: 20vh;
        background: var(--home-background-color);
        border: 1px solid transparent;

        .main {
            width: 30rem;
            height: 200px;
            border-radius: 10px;
            background-color: var(--el-card--background-color);
            margin: 10px auto;
            overflow: hidden;

            p {
                margin: 20px;
                font-size: 30px;
                color: var(--text-color);
                text-align: center;
            }

            .input-box {
                display: flex;
                justify-content: space-around;

                .input {
                    width: 60%;
                }
            }
        }
    }
}
</style>