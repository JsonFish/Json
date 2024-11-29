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
      ElMessage({ type: "info", message: "留言成功" });
      danmakuRef.value.add({ text: text.value, avatar: userStore.avatar });
      text.value = "";
    } else {
      ElMessage({ type: "error", message: response.message });
    }
  });
};
</script>

<template>
  <div class="relative">
    <vue-danmaku
      class="h-screen"
      ref="danmakuRef"
      v-model:danmus="danmus"
      useSlot
      loop
      :autoplay="true"
      randomChannel
      :channels="23"
    >
      <template v-slot:dm="{ danmu }">
        <div class="flex items-center">
          <el-avatar
            :size="30"
            shape="circle"
            :src="danmu.avatar"
            fit="cover"
          ></el-avatar>
          <p class="text-menuActive text-base">
            {{ " " + danmu.text }}
          </p>
        </div>
      </template>
    </vue-danmaku>
    <div class="absolute top-1/3 left-1/2 -translate-x-1/2">
      <el-input
        class="w-72"
        v-model="text"
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
