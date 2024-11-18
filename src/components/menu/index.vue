<template>
  <el-menu
    mode="horizontal"
    :ellipsis="false"
    class="menu h-16 bg-transparent"
    router
    :text-color="itemColor"
  >
    <el-menu-item
      v-for="(route, index) in constantRoute[0].children"
      v-show="route.meta.title"
      :key="index"
      :index="route.path"
    >
      <component :is="route.meta.icon" class="icon"></component>
      <li class="item">{{ route.meta.title }}</li>
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
import { ref } from "vue";
import router from "@/router";
import { constantRoute } from "@/router/routes";
import useUserStore from "@/store/modules/user";
const userStore = useUserStore();
const itemColor = ref<string>("");
// 退出登录
const logOut = () => {
  userStore.logOut();
  router.push("/");
};
</script>

<style scoped lang="scss">
.menu {
  border-bottom: none;

  .icon {
    width: 1rem;
  }

  .item {
    margin-left: 5px;
    font-weight: 700;
  }

  ::v-deep() {
    .el-dialog__header {
      padding-bottom: 0;
    }
  }
  ::v-deep() {
    .el-menu-item {
      padding: 10px;
      color: var(--menu-text-color);
      border-bottom: 0px solid transparent;
    }

    .el-menu-item.is-active {
      border-bottom: 0px;
    }

    .el-menu-item:not(.is-disabled):focus,
    .el-menu-item:not(.is-disabled):hover {
      color: rgb(31, 192, 255) !important;
      background-color: transparent;
    }
  }
  ::v-deep() {
    .el-menu > .el-menu-item {
      border-bottom: 0px solid transparent;
    }
  }
}
</style>
