<template>
  <!-- <div class="top">
      <div class="title">
        <div class="name">
          <p>Json Blog</p>
        </div>
        <TypeWriter
          class="text-center"
          :typeList="saying"
          size="16px"
          color="white"
        ></TypeWriter>
      </div>
    </div> -->
  <div class="main">
    <!-- <div class="svg">
          <el-icon><ArrowDownBold /></el-icon>
        </div> -->
    <div class="center">
      <Article></Article>
      <Introduce></Introduce>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import TypeWriter from "@/components/typeWriter/index.vue";
const saying = ["破釜沉舟终有日, 卧薪尝胆可吞吴", "人有冲天之志, 非运不能自通"];
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
  // 处理github
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
      // 清楚URL上的参数
    });
  }
  var url = new URL(window.location.href);
  url.search = "";
  history.replaceState(null, "", url.href);
});
</script>

<style lang="scss" scoped>
// .top {
//   width: 100%;
//   height: 100vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   .title {
//     width: 300px;
//     margin-bottom: 100px;

//     .name {
//       font-size: 50px;
//       font-weight: 600;
//       color: white;
//       text-align: center;
//       margin-bottom: 20px;
//       margin: 0 auto;
//     }
//   }
// }

.main {
  width: 100%;
  position: relative;
  border: 1px solid transparent;
  .svg {
    width: 100%;
    height: 50px;
    position: absolute;
    display: flex;
    justify-content: space-around;
    align-items: center;
    animation-name: move;
    animation-duration: 1.8s;
    animation-iteration-count: infinite;
    animation-timing-function: ease;
  }

  .center {
    width: 65rem;
    height: 100%;
    margin: 4rem auto;
    display: flex;
    justify-content: space-between;
  }
}

@keyframes move {
  0% {
    top: -5vh;
    color: gray;
  }

  50% {
    top: -8vh;
    color: white;
  }

  100% {
    top: -5vh;
    color: gray;
  }
}
</style>
