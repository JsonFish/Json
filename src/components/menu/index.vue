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
                        <el-dropdown-item icon="Message" @click="userInfo">个人中心</el-dropdown-item>
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
import { ref, onMounted, watch, reactive, } from 'vue';
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

// 注册表单数据
const signInForm = reactive({
    username: 'test',
    email: "1557392527@qq.com",
    // 邮箱验证码
    verification: '123123',
    password: "123123",
    // 二次密码
    verifyPassword: "123123",
})

onMounted(() => {
    judgment()
})

// 页面刷新判断主题颜色，菜单文字变成对应的颜色
const judgment = () => {
    if (!themeStore.lightOrDark) {
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
// 自定义表单验证
// 账号验证
const validatorUsername = (_rule: any, value: any, callback: any) => {
    //rule:即为校验规则对象
    //value:即为表单元素文本内容
    //函数:如果符合条件callBack放行通过即为
    //如果不符合条件callBack方法,注入错误提示信息
    if (!value) {
        callback(new Error("账号不能为空"));
    }
    else if (value.length >= 4 && value.length <= 10) {
        callback();
    } else {
        callback(new Error("账号长度4-10位"));
    }
};
// 密码验证
const validatorPassword = (_rule: any, value: any, callback: any) => {
    if (!value) {
        callback(new Error("密码不能为空"));
    }
    else if (value.length >= 6 && value.length <= 15) {
        callback();
    } else {
        callback(new Error("密码长度6-15位"));
    }
};
// 二次密码验证
const validatorVerifyPassword = (_rule: any, value: any, callback: any) => {
    if (!value) {
        callback(new Error("请输入二次确认密码"));
    }
    else if (value == signInForm.password) {
        callback();
    } else {
        callback(new Error("二次密码不一致"));
    }
};
// 邮箱验证规则
const validatorEmail = (_rule: any, value: any, callback: any) => {
    if (!value) {
        callback(new Error("邮箱不能为空"));
    }
    else if (value.length >= 5 && value.length <= 20) {
        callback();
    } else {
        callback(new Error("邮箱长度5-20位"));
    }
};
// login表单验证
const loginRules = {
    email: [
        { required: true, validator: validatorEmail, trigger: "blur" },
    ],
    password: [
        { required: true, validator: validatorPassword, trigger: "blur" },
    ],
};
// signin表单验证
const signInRules = {
    username: [
        { validator: validatorUsername, trigger: "change" },
    ],
    password: [
        { validator: validatorPassword, trigger: "change" },
    ],
    verifyPassword: [
        { validator: validatorVerifyPassword, trigger: "change" },
    ],
    email: [
        { validator: validatorEmail, trigger: 'blur' }
    ]
}
// 个人信息
const userInfo = async () => {
    router.push('/userinfo')
}
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
            color: skyblue !important;
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