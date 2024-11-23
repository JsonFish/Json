<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getLink } from "@/api/link";
import type { LinkInfo } from "@/api/link/type";
import useUserStore from "@/store/modules/user";
import { ElMessage } from "element-plus";
defineOptions({
  name: "friendLink",
});
const userStore = useUserStore();
const linkList = ref<LinkInfo[]>();
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
  window.open(url);
};
const accept = () => {
  if (!userStore.username) {
    ElMessage({ type: "info", message: "请先登录哦！" });
    return;
  }
  ElMessage({ type: "success", message: "正在开发中！" });
};
</script>

<template>
  <div class="friendLink">
    <div class="top">
      <p>友链</p>
    </div>
    <div class="main">
      <div class="main-top">
        <el-button class="btn" type="primary" @click="accept" plain
          >申请友链</el-button
        >
      </div>
      <div class="center">
        <el-row>
          <el-col v-for="item in linkList" :key="item.id" :span="6">
            <div class="link" @click="toLink(item.siteUrl)">
              <img
                class="img"
                :src="item.siteAvatar"
                fit="cover"
                :lazy="true"
              />
              <div class="text">
                <p class="title">{{ item.siteName }}</p>
                <p class="desc">{{ item.siteDesc }}</p>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.friendLink {
  width: 100%;

  .top {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--page-title-color);
    font-size: 50px;
    width: 100%;
    height: 25vh;
  }

  .main {
    width: 100%;
    min-height: 70vh;
    // background: var(--home-background-color);
    border-radius: 20px 20px 0 0;
    .main-top {
      width: 50rem;
      height: 5rem;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .center {
      width: 50rem;
      min-height: 65vh;
      // background-color: var(--el-card--background-color);
      margin: 0 auto;
      // overflow: hidden;

      .link {
        width: 170px;
        height: 170px;
        margin: 1rem;
        border-radius: 10px;
        position: relative;
        overflow: hidden;

        .img {
          width: 100%;
          transition: transform 0.5s ease;
        }

        .img:hover {
          transform: scale(1.1);
        }

        .text {
          position: absolute;
          bottom: -30%;
          width: 100%;
          height: 50%;
          transition: transform 0.5s ease;
          background-color: rgba(88, 85, 85, 0.655);
          padding: 5px 10px;

          .title {
            font-size: 20px;
            font-weight: 900;
            color: rgb(255, 255, 255);
          }

          .desc {
            margin-top: 10px;
            color: rgb(255, 255, 255);
          }
        }

        .text:hover {
          transform: translateY(-45px);
        }
      }
      .link:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
