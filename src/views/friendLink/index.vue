<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { getLink } from "@/api/link";
import type { LinkInfo } from "@/api/link/type";
import useUserStore from "@/store/modules/user";
import { ElMessage } from "element-plus";
import Upload from "@/components/Upload/index.vue";
defineOptions({
  name: "friendLink",
});
const userStore = useUserStore();
const linkList = ref<LinkInfo[]>();
const visible = ref<boolean>(false);
const linkFormRef = ref<any>(null);
const linkForm = reactive<LinkInfo>({
  siteAvatar: "",
  siteName: "",
  siteDesc: "",
  siteUrl: [],
});
onMounted(() => {
  getLinkList();
});
const getLinkList = () => {
  getLink().then((response) => {
    linkList.value = response.data;
  });
};
// 跳转
const toLink = (url: string) => {
  window.open(url, "_blank");
};
const apply = () => {
  visible.value = true;
  if (!userStore.username || !userStore.avatar) {
    ElMessage({ type: "info", message: "请先登录哦！" });
    return;
  }

  // ElMessage({ type: "info", message: "正在开发中！" });
};
</script>

<template>
  <div>
    <div class="flex justify-center items-center text-4xl mb-2">
      <p>友链</p>
    </div>
    <div>
      <div class="text-center my-5">
        <el-button @click="apply" plain>申请友链</el-button>
      </div>
      <div class="mx-auto my-0 w-65">
        <el-row>
          <el-col v-for="(item, index) in linkList" :key="item.id" :span="6">
            <div
              :class="'an' + (index + 1)"
              class="flex justify-between border border-solid border-slate-500 h-20 rounded-lg m-2 opacity-0 translate-x-1/4 hover:cursor-pointer hover:bg-articleCard"
              @click="toLink(item.siteUrl)"
            >
              <div class="w-20 h-full flex justify-center items-center">
                <el-avatar
                  shape="square"
                  class="duration-500 hover:scale-110"
                  :src="item.siteAvatar"
                  fit="cover"
                  size="large"
                />
              </div>
              <div class="w-40">
                <span class="mt-2 text-base font-bold line-clamp-1">{{
                  item.siteName
                }}</span>
                <span class="text-xs line-clamp-2">{{ item.siteDesc }}</span>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-dialog
      class="px-5 rounded-md"
      align-center
      width="370"
      v-model="visible"
    >
      <div class="text-center text-xl mb-3 -mt-4">友链申请</div>
      <el-form :model="linkForm" ref="linkFormRef">
        <el-form-item label="头像">
          <Upload :fileSize="3" :file-list="linkForm.siteUrl" />
        </el-form-item>
        <el-form-item>
          <el-input placeholder="网站名称" v-model="linkForm.siteName" />
        </el-form-item>
        <el-form-item>
          <el-input placeholder="网站描述" v-model="linkForm.siteDesc" />
        </el-form-item>
        <el-form-item>
          <el-input placeholder="网站地址" v-model="linkForm.siteUrl" />
        </el-form-item>
        <el-button
          class="w-full bg-loginBtnBg text-loginBtnText hover:bg-loginBtnHover hover:text-loginBtnText"
          size="default"
        >
          申请
        </el-button>
      </el-form>
    </el-dialog>
  </div>
</template>
