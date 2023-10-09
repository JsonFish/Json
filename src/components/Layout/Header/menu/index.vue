<template>
    <el-menu mode="horizontal" :ellipsis="false" class="menu" router :text-color="itemColor">
        <el-menu-item v-for="(routes, index) in constantRouter" v-show="routes.meta.title" :key="index"
            :index="routes.path">
            <component :is="routes.meta.icon" class="icon"></component>
            <li class="item">{{ routes.meta.title }}</li>
        </el-menu-item>
        <el-menu-item v-if="userStore.userinfo.userId">
            <el-dropdown trigger="hover">
                <span>
                    <el-avatar :size="30" src="/src/assets/img/avatar.jpeg" />
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
        <!-- 登录/注册 -->
        <div>
            <el-dialog v-if="dialog" v-model="dialog" :title="title" width="25%" align-center :before-close="close"
                :show-close="false">
                <template #header="{ close, titleId }">
                    <div class="dialogHeader">
                        <h4 :id="titleId">{{ title }}</h4>
                        <el-icon @click="close" class="iconClass">
                            <Close />
                        </el-icon>
                    </div>
                </template>
                <!-- 登录 -->
                <div v-show="!signIn">
                    <el-form :model="loginForm" :rules="loginRules" ref="loginForms">
                        <el-form-item prop="account">
                            <el-input placeholder="账号" prefix-icon="Avatar" validate-event v-model="loginForm.account"
                                clearable />
                        </el-form-item>
                        <el-form-item prop="password" style="margin: 5vh 0 0;">
                            <el-input placeholder="密码" type="password" prefix-icon="Lock" v-model="loginForm.password"
                                clearable show-password />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" style="margin-top: 5vh; width: 100%;" @click="tologin"
                                :loading="loading">{{ title
                                }}</el-button>
                        </el-form-item>
                    </el-form>
                    <div style="display: flex; justify-content: space-between;">
                        <button @click="openSignIn" class="signAndForget">立即注册</button>
                        <button class="signAndForget">忘记密码</button>
                    </div>
                </div>
                <!-- 注册 -->
                <div v-show="signIn">
                    <el-form :model="signInForm" :rules="signInRules" ref="signInForms">
                        <el-form-item prop="nickname">
                            <el-input placeholder="昵称" prefix-icon="Postcard" validate-event v-model="signInForm.nickname"
                                clearable />
                        </el-form-item>
                        <el-form-item prop="account" style="margin: 5vh 0 0;">
                            <el-input placeholder="账号" prefix-icon="Avatar" validate-event v-model="signInForm.account"
                                clearable />
                        </el-form-item>
                        <el-form-item prop="password" style="margin: 5vh 0 0;">
                            <el-input placeholder="密码" type="password" prefix-icon="Lock" v-model="signInForm.password"
                                clearable show-password />
                        </el-form-item>
                        <el-form-item prop="verifyPassword" style="margin: 5vh 0 0;">
                            <el-input placeholder="确认密码" type="password" prefix-icon="Lock"
                                v-model="signInForm.verifyPassword" clearable show-password />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" style="margin-top: 5vh; width: 100%;" @click="ToSignIn"
                                :loading="loading">{{ title }}</el-button>
                            <!-- <el-button @click="close">取消</el-button> -->
                        </el-form-item>
                    </el-form>
                    <div>
                        <button @click="closeSignIn" class="signAndForget">返回登录</button>
                    </div>
                </div>
            </el-dialog>
        </div>
    </el-menu>
</template>
    
<script setup lang='ts'>
import { ref, onMounted, watch, reactive, } from 'vue';
import { ElMessage } from 'element-plus'
// 主题切换开关
import Switch from '@/views/switch/index.vue'
// 路由
import router from '@/router';
import { constantRouter } from '@/router/routes'
// 控制主题的仓库
import useThemeStore from '@/store/modules/theme.ts'
const themeStore = useThemeStore()
// 用户仓库
import useUserStore from '@/store/modules/user';
const userStore = useUserStore()
// 用户信息仓库
// import useUserinfoStore from '@/store/modules/userinfo'
// const userinfoStore = useUserinfoStore()
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
// 收集登录表单数据
const loginForm = reactive({
    account: "",
    password: ""
})
// 注册表单数据
const signInForm = reactive({
    nickname: "",
    account: "",
    password: "",
    verifyPassword: "",
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
const validatorAccount = (_rule: any, value: any, callback: any) => {
    //rule:即为校验规则对象
    //value:即为表单元素文本内容
    //函数:如果符合条件callBack放行通过即为
    //如果不符合条件callBack方法,注入错误提示信息
    if (!value) {
        callback(new Error("账号不能为空"));
    }
    else if (value.length >= 5 && value.length <= 10) {
        callback();
    } else {
        callback(new Error("账号长度5-10位"));
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
// login表单验证
const loginRules = {
    account: [
        { required: true, validator: validatorAccount, trigger: "blur" },
    ],
    password: [
        { required: true, validator: validatorPassword, trigger: "blur" },
    ],
};
// signin表单验证
const signInRules = {
    nickname: [
        { min: 2, max: 10, message: '昵称长度至少两位', trigger: 'change' }
    ],
    account: [
        { validator: validatorAccount, trigger: "change" },
    ],
    password: [
        { validator: validatorPassword, trigger: "change" },
    ],
    verifyPassword: [
        { validator: validatorVerifyPassword, trigger: "change" },
    ]
}
// 打开dialog
const openDialog = () => {
    dialog.value = true
    title.value = '登录'
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
// 注册按钮
const ToSignIn = async () => {
    // 判断校验是否成功
    signInForms.value.validate(async (valid: any) => {
        if (valid) {
            // 校验成功，发送请求
            loading.value = true
            try {
                await userStore.userSignIn(signInForm);
                loginForm.account = signInForm.account
                loginForm.password = signInForm.password
                // 注册成功自动登录
                await userStore.userLogin(loginForm)
                // 重置表单并关闭对话框
                loginForms.value.resetFields();
                dialog.value = false
                signInForms.value.resetFields();
                signIn.value = false
                ElMessage({
                    type: "success",
                    message: "注册成功自动登录",
                });
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
                message: "数据格式错误",
            });
        }
    })
}
// 个人信息
const userInfo = async () => {
    // const id: any = userStore.userinfo.id
    // await userinfoStore.getUserinfo(id)
    router.push('/userinfo')
}
// 退出登录
const logOut = async () => {
    await userStore.userLogOut()
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

    .dialogHeader {
        font-size: 1.2rem;
        display: flex;
        justify-content: space-between;
        color: var(--dialog-text-color);


        .iconClass :hover {
            color: skyblue;
        }
    }


    .signAndForget {
        background-color: transparent;
        border: 0;
        cursor: pointer;
        color: var(--dialog-text-color);
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