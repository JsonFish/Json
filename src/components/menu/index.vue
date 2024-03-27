<template>
    <el-menu mode="horizontal" :ellipsis="false" class="menu" router :text-color="itemColor">
        <el-menu-item v-for="(route, index) in constantRoute[0].children" v-show="route.meta.title" :key="index"
            :index="route.path">
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
                        <el-dropdown-item icon="SwitchButton" @click="logOut">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </el-menu-item>
        <el-menu-item @click="toLogin" v-else>
            <Avatar class="icon"></Avatar>
            <li class="item">登录</li>
        </el-menu-item>
        <Switch class="switch"></Switch>
    </el-menu>
</template>

<script setup lang='ts'>
import { ref, onMounted, watch, } from 'vue';
import Switch from '@/components/Switch/index.vue'
import router from '@/router';
import { constantRoute } from '@/router/routes'
import useThemeStore from '@/store/modules/theme.ts'
const themeStore = useThemeStore()
import useUserStore from '@/store/modules/user';
const userStore = useUserStore()

const itemColor = ref<string>('')

const toLogin = () => {
    router.push('/login')
}

onMounted(() => {
    judgment()
})

// 页面刷新判断主题颜色，菜单文字变成对应的颜色
const judgment = () => {
    if (!themeStore.lightOrDark) {
        itemColor.value = '#6b6b6b'
    } else {
        itemColor.value = '#aaa'
    }
}
// 监听主题变换，菜单文字变成对应的颜色
watch(() => themeStore.lightOrDark, (newValue) => {
    if (newValue) {
        itemColor.value = '#aaa'
    } else {
        itemColor.value = '#6b6b6b'
    }
})

// 个人信息
// const userInfo = async () => {
//     router.push('/userinfo')
// }
// 退出登录
const logOut = () => {
    userStore.logOut()
    router.push('/')
}
</script>

<style scoped lang="scss">
.menu {
    margin-right: 10px;
    background: transparent;
    border-bottom: none;

    .dropdownMenu {
        background-color: pink !important;
    }

    .icon {
        width: 1rem;
    }

    .item {
        margin-left: 5px;
        font-weight: 700;
    }

    .switch {
        margin: 12px 5px 0 5px;
    }

    ::v-deep() {
        .el-menu-item {
            padding: 10px;
        }

        .el-menu-item.is-active {
            color: rgb(31, 135, 177) !important;
            border-bottom: 2px solid transparent;
        }

        .el-menu-item:not(.is-disabled):focus,
        .el-menu-item:not(.is-disabled):hover {
            color: rgb(31,135,177);
            background-color: transparent;
        }
    }
}
</style>