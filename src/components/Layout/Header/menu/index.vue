<template>
    <el-menu mode="horizontal" :ellipsis="false" class="menu" router :text-color="itemColor">
        <el-menu-item v-for="(routes, index) in constantRouter" :key="index" :index="routes.path" >
            <component :is="routes.meta.icon" class="icon"></component>
            <li class="item">{{ routes.meta.title }}</li>
        </el-menu-item>
        <!-- 开关 -->
        <div>
            <Switch class="switch"></Switch>
        </div>
    </el-menu>
</template>
    
<script setup lang='ts'>
import { ref, onMounted,watch } from 'vue';
// 主题切换开关
import Switch from './switch/index.vue'
import { constantRouter } from '@/router/routes'
import useThemeStore from '@/store/modules/theme.ts'
const itemColor = ref<string>('')
const themeStore = useThemeStore()
onMounted(() => {
    judgment()
})
// 页面刷新判断主题颜色，菜单文字变成对应的颜色
const judgment = () => {
    if (themeStore.lightOrDark == false) {
        itemColor.value = 'black'
    } else {
        itemColor.value = '#aaa'
    }
}
// 监听主题变换，菜单文字变成对应的颜色
watch(() => themeStore.lightOrDark, (newValue) => {
    if (newValue) {
        itemColor.value = '#aaa'
    } else {
        itemColor.value = 'black'
    }
})

</script>
    
<style scoped lang="scss">

.menu {
    margin-right: 10px;
    background: transparent;
    border-bottom: none;
    .icon{
        width: 1rem;
    }

    .item {
        margin-left: 5px;
        font-weight: 700;
    }

    .switch {
        margin: 7.5px 5px;
    }

    ::v-deep() {
        .el-menu-item {
            padding: 10px;
        }

        .el-menu-item.is-active {
            color:skyblue !important;
            border-bottom: 2px solid transparent;
        }

        .el-menu-item:not(.is-disabled):focus,
        .el-menu-item:not(.is-disabled):hover {
            color: skyblue;
            background-color: transparent;
        }

    }
}
</style>