<template>
  <el-menu
    mode="horizontal"
    :ellipsis="false"
    class="menu h-14"
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
    <div
      class="w-7 h-7 mt-3 mr-2 flex justify-center rounded-lg items-center border border-solid border-slate-400 hover:cursor-pointer hover:bg-switchBgc"
    >
      <SvgIcon
        :color="themeStore.darkTheme ? '#aaa' : '#000'"
        name="github"
        width="1.4rem"
        height="1.4rem"
      ></SvgIcon>
    </div>
    <div
      class="w-7 h-7 mt-3 mr-2 flex justify-center rounded-lg items-center border border-solid border-slate-400 hover:cursor-pointer hover:bg-switchBgc"
    >
      <SvgIcon
        :color="themeStore.darkTheme ? '#aaa' : '#000'"
        name="login"
        width="1.2rem"
        height="1.2rem"
      ></SvgIcon>
    </div>
    <ThemeSwitch class="mt-3 mr-5"></ThemeSwitch>
    <LoginDialog ref="loginDialog"></LoginDialog>
  </el-menu>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ThemeSwitch from "@/components/Switch/index.vue";
import LoginDialog from "../Login/index.vue";
import router from "@/router";
import { constantRoute } from "@/router/routes";
import useThemeStore from "@/store/modules/theme.ts";
const themeStore = useThemeStore();
import useUserStore from "@/store/modules/user";
const userStore = useUserStore();
const itemColor = ref<string>("");
const loginDialog = ref<any>(null);
const toLogin = () => {
  loginDialog.value.dialogFormVisible = true;
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
  // height: 50px;
  background: transparent;
  border-bottom: none;

  .icon {
    width: 1rem;
  }

  .item {
    margin-left: 5px;
    font-weight: 700;
  }

  .switch {
    // margin: 12px 15px 0 0;
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
    }

    .el-menu-item.is-active {
      // color: rgb(31, 192, 255) !important;
      border-bottom: 2px solid transparent;
    }

    .el-menu-item:not(.is-disabled):focus,
    .el-menu-item:not(.is-disabled):hover {
      color: rgb(31, 192, 255) !important;
      background-color: transparent;
    }
    .el-dialog {
      --el-dialog-bg-color: var(--login-dialog-background-color);
    }
  }
}
</style>
