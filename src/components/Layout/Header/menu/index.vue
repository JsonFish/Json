<template>
    <el-menu mode="horizontal" :ellipsis="false" class="menu" router  >
        <el-menu-item  v-for="(routes,index) in constantRouter" :key="index" :index="routes.path">
            <component :is="routes.meta.icon" style="width: 1em;" ></component>
            <li class="item">{{routes.meta.title}}</li>
        </el-menu-item>
        <!-- 开关 -->
        <Switch class="switch"></Switch>
    </el-menu>
</template>
    
<script setup lang='ts'>
// 主题切换开关
import Switch from './switch/index.vue'
import { constantRouter } from '@/router/routes'

</script>
    
<style scoped lang="scss">
.menu {
    margin-right: 20px;
    background: transparent;
    border-bottom:none;
    
    .item {
        // color: pink;
        margin-left: 5px;
        font-weight: 700;
    }
    .switch{
        margin: 13px 10px 0 0;
    }
    ::v-deep() {
        .el-menu-item {
            padding: 10px;
        }

        .el-menu-item.is-active {
            border-bottom: 2px solid transparent;
        }
        
        .el-menu-item:not(.is-disabled):focus,  .el-menu-item:not(.is-disabled):hover{
            background-color: transparent;
        }

    }
}
</style>