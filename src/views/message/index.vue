<template>
  <div class="message">
    <div class="top">
      <vue-danmaku
        class="danmaku"
        ref="danmakuRef"
        v-model:danmus="danmus"
        useSlot
        loop
        :autoplay="true"
        randomChannel
        :channels="25"
      >
        <template v-slot:dm="{ danmu }">
          <div style="display: flex">
            <el-avatar
              :size="30"
              shape="circle"
              :src="danmu.avatar"
              fit="cover"
            ></el-avatar>
            <span
              style="
                color: #c0c4cc;
                line-height: 30px;
                align-items: center;
                font-size: 1rem;
              "
              >{{ " " + danmu.text }}</span
            >
          </div>
        </template>
      </vue-danmaku>
    </div>

    <div class="input-box">
      <el-input
        v-model="text"
        class="input"
        placeholder="    说点什么吧"
        size="small"
        clearable
      >
        <template #append>
          <el-button icon="Promotion" @click="add">发送</el-button></template
        ></el-input
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import vueDanmaku from "vue3-danmaku";
import { ElMessage } from "element-plus";
import { getMessage, addMessage } from "@/api/message/index";
import type { MessageInfo } from "@/api/message/type";
import useUserStore from "@/store/modules/user";
defineOptions({
  name: "message",
});
const userStore = useUserStore();
const danmus = ref<MessageInfo[]>();
const danmakuRef = ref<any>();
const text = ref<string>("");
onMounted(() => {
  getMessageList();
});
const getMessageList = () => {
  getMessage().then((response) => {
    danmus.value = response.data;
  });
};
const add = async () => {
  if (!userStore.username) {
    ElMessage({ type: "info", message: "登陆后才能留言哦!" });
    text.value = "";
    return;
  }
  await addMessage({ text: text.value }).then((response) => {
    if (response.code == 200) {
      ElMessage({ type: "success", message: "留言成功" });
      danmakuRef.value.add({ text: text.value, avatar: userStore.avatar });
      text.value = "";
    } else {
      ElMessage({ type: "error", message: response.message });
    }
  });
};
</script>

<style scoped lang="scss">
.message {
  position: relative;
  .top {
    height: 100vh;
    overflow: hidden;

    .danmaku {
      height: 95vh;
    }
  }

  .input-box {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 400px;
    height: 35px;
    display: flex;
    justify-content: center;

    .input {
      width: 70%;
    }
  }
}
</style>
