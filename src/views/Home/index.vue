<script setup lang="ts">
import { onMounted } from "vue";
import Introduce from "./introduce/index.vue";
import Article from "./articleList/index.vue";
import { reqGithubLogin } from "@/api/user";
import { ElMessage } from "element-plus";
import { setToken } from "@/utils/token";
import useUserStore from "@/store/modules/user";
const userStore = useUserStore();
defineOptions({
  name: "home",
});
onMounted(() => {
  // 处理github code
  const parmars = window.location.href.split("?")[1];
  const code = new URLSearchParams(parmars).get("code");
  if (code) {
    reqGithubLogin(code.slice(0, -6)).then((response) => {
      if (response.code == 200) {
        userStore.username = response.data.username;
        userStore.avatar = response.data.avatar;
        // token 本地存储
        setToken(response.data);
        ElMessage({ type: "success", message: "登录成功" });
      } else {
        ElMessage({ type: "error", message: response.message });
      }
    });
  }
  // 清楚URL上的参数
  var url = new URL(window.location.href);
  url.search = "";
  history.replaceState(null, "", url.href);
});
</script>

<template>
  <div>
    <div class="w-65 mt-0 mb-2 mx-auto flex justify-between">
      <Article></Article>
      <Introduce></Introduce>
    </div>
  </div>
</template>
