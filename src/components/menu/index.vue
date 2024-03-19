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
        <el-menu-item @click="openDialog" v-else>
            <Avatar class="icon"></Avatar>
            <li class="item">登录</li>
        </el-menu-item>
        <!-- 主题切换按钮 -->
        <Switch class="switch"></Switch>
    </el-menu>
</template>

<script setup lang='ts'>
import { ref, onMounted, watch, reactive, } from 'vue';
import { ElMessage } from 'element-plus'
import { reqGetCode, reqSignIn, getCaptcha } from '@/api/user';
// 主题切换开关
import Switch from '@/views/switch/index.vue'
// 路由
import router from '@/router';
import { constantRoute } from '@/router/routes'
// 控制主题的仓库
import useThemeStore from '@/store/modules/theme.ts'
const themeStore = useThemeStore()
// 用户仓库
import useUserStore from '@/store/modules/user';
const userStore = useUserStore()
// 菜单文字颜色
const itemColor = ref<string>('')
// 登录对话框显示或者隐藏
const dialog = ref<boolean>(false)
// 获取登录对话框
const loginForms = ref()
// 获取注册对话框
const signInForms = ref()
// 对话框标题
const title = ref<string>('')
// 注册对话框显示或者隐藏
const signIn = ref<boolean>(false)
// 登陆注册button的loading状态
const loading = ref<boolean>(false)
// 图片验证码 base64格式
const captchaImage = ref<string>();
// 收集登录表单数据
const loginForm = reactive({
    email: "test@qq.com",
    password: "123456",
    code: "",
    captchaId: ""
})
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
// 打开dialog
const openDialog = () => {
    router.push('/login')
    // dialog.value = true
    // title.value = '登录'
    // getCaptchaImg()
}
// 关闭dialog
const close = () => {
    dialog.value = false
    signIn.value = false
    // 表单重置
    loginForms.value.resetFields();
    signInForms.value.resetFields();
}
// 打开注册界面
const openSignIn = () => {
    title.value = '注册'
    signIn.value = true
}
// 关闭注册页面
const closeSignIn = () => {
    title.value = '登录'
    signIn.value = false
}
// 获取图片验证码
const getCaptchaImg = async () => {
    loginForm.code = "";
    const result: any = await getCaptcha();
    captchaImage.value = `data:image/jpg;base64,${result.data.imageBase64}`;
    loginForm.captchaId = result.data.id;
};
// 登录按钮
const tologin = async () => {
    // 表单校验成功之后才能发请求
    loginForms.value.validate(async (valid: boolean) => {
        // console.log(valid); // true
        if (valid) {
            // 校验成功，发送请求
            loading.value = true
            try {
                await userStore.userLogin(loginForm);
                // 关闭dialog
                dialog.value = false
                // 表单重置
                loginForms.value.resetFields();
                ElMessage({
                    message: '登录成功',
                    type: 'success',
                })
            } catch (error: any) {
                ElMessage({
                    type: "error",
                    message: error.message,
                });
            }
            loading.value = false
        } else {
            // 校验失败，做相应处理
            ElMessage({
                type: "error",
                message: "账号或密码格式错误",
            });

        }
    })
};
// 获取邮箱验证码
const getVerificationCode = async () => {
    console.log(signInForm.email);
    const result: any = await reqGetCode({ "email": "1557392527@qq.com" })
    console.log(result);
}
// 注册请求函数
const userSignIn = async (data: any) => {
    const result: any = await reqSignIn(data);
    console.log(result);
    if (result.code !== 200) {
        return Promise.reject(new Error(result.message));
    }
}
// 注册按钮
const ToSignIn = async () => {
    // 判断表单校验是否成功
    signInForms.value.validate(async (valid: any) => {
        if (valid) {
            loading.value = true
            try {
                await userSignIn(signInForm)
                ElMessage({
                    type: "success",
                    message: "注册成功",
                });
                // 重置表单并关闭对话框
                loginForms.value.resetFields();
                dialog.value = false
                signInForms.value.resetFields();
                signIn.value = false
            } catch (error: any) {
                ElMessage({
                    type: "error",
                    message: error,
                });
            }
            loading.value = false
        } else {
            // 校验失败，做相应处理
            ElMessage({
                type: "error",
                message: "数据格式错误",
            });
        }
    })
}
// 个人信息
const userInfo = async () => {
    router.push('/userinfo')
}
// 退出登录
const logOut = () => {
    userStore.logOut()
    router.push('/')
    ElMessage({
        type: 'success',
        message: '退出成功'
    })
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
        margin: 7.5px 5px;
    }

    .signAndForget:hover {
        color: skyblue
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

        .el-dialog {
            backdrop-filter: blur(2px) saturate(100%);
            -webkit-backdrop-filter: blur(2px) saturate(100%);
            background-color: var(--dialog-background-color);
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.125);
        }

        .el-dialog__header {
            margin-right: 0;
        }
    }
}
</style>