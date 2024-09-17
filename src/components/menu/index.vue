<template>
  <el-menu
    mode="horizontal"
    :ellipsis="false"
    class="menu"
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
    <el-menu-item v-if="userStore.username">
      <el-dropdown trigger="hover">
        <span>
          <el-avatar :size="30" :src="userStore.avatar" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <!-- <el-dropdown-item icon="Message" @click="userInfo">个人中心</el-dropdown-item> -->
            <el-dropdown-item icon="SwitchButton" @click="logOut"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-menu-item>
    <el-menu-item @click="toLogin" v-else>
      <Avatar class="icon"></Avatar>
      <li class="item">登录</li>
    </el-menu-item>
    <ThemeSwitch class="switch"></ThemeSwitch>
    <el-dialog
      class="loginDialog"
      v-model="dialogFormVisible"
      :lock-scroll="true"
      width="400"
    >
      <Login></Login>
    </el-dialog>
  </el-menu>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ThemeSwitch from "@/components/Switch/index.vue";
import Login from "../Login/index.vue";
import router from "@/router";
import { constantRoute } from "@/router/routes";
import useUserStore from "@/store/modules/user";
// import useThemeStore from "@/store/modules/theme.ts";
// const themeStore = useThemeStore();
const userStore = useUserStore();

const itemColor = ref<string>("");
const dialogFormVisible = ref<boolean>(false);
const toLogin = () => {
  dialogFormVisible.value = true;
};

// 个人信息
// const userInfo = async () => {
//     router.push('/userinfo')
// }
// 退出登录
const logOut = () => {
  userStore.logOut();
  router.push("/");
};
</script>

<style scoped lang="scss">
.menu {
  height: 50px;
  background: transparent;
  border-bottom: none;

  .icon {
    width: 1rem;
    // color: var(--menu-text-color);
  }

  .item {
    margin-left: 5px;
    padding-top: 3px;
    font-weight: 700;
    // color: var(--menu-text-color);
  }

  .switch {
    margin: 9px 5px 0 0;
  }
  .loginDialog {
    background-color: pink;
  }
  ::v-deep() {
    .el-menu-item {
      padding: 10px;
      color: var(--menu-text-color);
    }

    .el-menu-item.is-active {
      color: rgb(31, 192, 255) !important;
      border-bottom: 2px solid transparent;
    }

    .el-menu-item:not(.is-disabled):focus,
    .el-menu-item:not(.is-disabled):hover {
      color: rgb(31, 192, 255) !important;
      background-color: transparent;
    }
  }
}
</style>
