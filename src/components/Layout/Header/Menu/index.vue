<template>
  <el-menu
    mode="horizontal"
    :ellipsis="false"
    class="menu h-16 bg-transparent"
    router
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
import { constantRoute } from "@/router/routes";
</script>

<style scoped lang="scss">
.menu {
  border-bottom: 0 solid #fff;
  .icon {
    width: 1rem;
  }

  .item {
    margin-left: 5px;
    font-weight: 700;
  }

  ::v-deep() {
    .el-menu {
      border-bottom: 0px solid transparent;
    }
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
