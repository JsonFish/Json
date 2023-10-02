<template>
    <el-menu mode="horizontal" :ellipsis="false" class="menu" router :text-color="itemColor">
        <el-menu-item v-for="(routes, index) in constantRouter" :key="index" :index="routes.path">
            <component :is="routes.meta.icon" class="icon"></component>
            <li class="item">{{ routes.meta.title }}</li>
        </el-menu-item>
        <el-menu-item @click="openDialog">
            <Avatar class="icon"></Avatar>
            <li class="item">登录</li>
        </el-menu-item>
        <!-- 主题切换按钮 -->
        <Switch class="switch"></Switch>
        <div>
            <el-dialog v-if="dialog" v-model="dialog" :title="title" width="25%" align-center :lock-scroll="false"
                :before-close="close" :show-close="false">
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
                            <el-button type="primary" style="margin-top: 5vh; width: 100%;" @click="login">{{ title
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
                    <el-form :model="signInform" :rules="signInRules">
                        <el-form-item prop="nickname">
                            <el-input placeholder="昵称" prefix-icon="Postcard" validate-event v-model="signInform.nickname"
                                clearable />
                        </el-form-item>
                        <el-form-item prop="account" style="margin: 5vh 0 0;">
                            <el-input placeholder="账号" prefix-icon="Avatar" validate-event v-model="signInform.account"
                                clearable />
                        </el-form-item>
                        <el-form-item prop="password" style="margin: 5vh 0 0;">
                            <el-input placeholder="密码" type="password" prefix-icon="Lock" v-model="signInform.password"
                                clearable show-password />
                        </el-form-item>
                        <el-form-item prop="password" style="margin: 5vh 0 0;">
                            <el-input placeholder="确认密码" type="password" prefix-icon="Lock"
                                v-model="signInform.verifyPassword" clearable show-password />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" style="margin-top: 5vh; width: 100%;">{{ title }}</el-button>
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
import { ElNotification } from 'element-plus'
// 主题切换开关
import Switch from './switch/index.vue'
// 路由
import { constantRouter } from '@/router/routes'
// 控制主题的仓库
import useThemeStore from '@/store/modules/theme.ts'
const themeStore = useThemeStore()
// 用户仓库
import useUserStore from '@/store/modules/user';
const userStore = useUserStore()
//菜单文字颜色
const itemColor = ref<string>('')
// 登录对话框显示或者隐藏
const dialog = ref<boolean>(false)
// 获取登录对话框
const loginForms = ref()
// 对话框标题
const title = ref<string>('')
// 注册对话框显示或者隐藏
const signIn = ref<boolean>(false)
// 收集登录表单数据
const loginForm = reactive({
    account: "",
    password: ""
})
const signInform = reactive({
    nickname: '',
    account: '',
    password: "",
    verifyPassword: ""
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
const validatorLoginAccount = (_rule: any, value: any, callback: any) => {
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

const validatorLoginPassword = (_rule: any, value: any, callback: any) => {
    if (!value) {
        callback(new Error("密码不能为空"));
    }
    else if (value.length >= 6 && value.length <= 15) {
        callback();
    } else {
        callback(new Error("密码长度6-15位"));
    }
};
// const validatorsignInAccount = (_rule: any, value: any, callback: any) => {
//     //rule:即为校验规则对象
//     //value:即为表单元素文本内容
//     //函数:如果符合条件callBack放行通过即为
//     //如果不符合条件callBack方法,注入错误提示信息
//     // value没有length属性
//     if (!loginForm.account) {
//         callback(new Error("账号不能为空"));
//     }
//     else if (loginForm.account.length >= 5 && loginForm.account.length <= 10) {
//         callback();
//     } else {
//         callback(new Error("账号长度5-10位"));
//     }
// };
// login表单验证
const loginRules = {
    account: [
        { required: true, validator: validatorLoginAccount, trigger: "blur" },
    ],
    password: [
        { required: true, validator: validatorLoginPassword, trigger: "blur" },
    ],
};
// signin表单验证
const signInRules = {
    nickname: [
        // {  message: '昵称不能为空', trigger: 'blur' },
        // { required: true, min: 5, max: 15, message: '昵称长度至少五位', trigger: 'change' }
    ],
    account: [
        { validator: validatorLoginAccount, trigger: "change" },
    ],
    password: [
        // { validator: validatorPassword, trigger: "change" },
    ],
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
    // loginFormRef.value?.resetFields();
    loginForm.account = ''
    loginForm.password = ''
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
const login = async () => {
    // 表单校验成功之后才能发请求
    loginForms.value.validate(async (valid: any) => {
        if (valid) {
            // 校验成功，发送请求
            try {
                await userStore.userLogin(loginForm);
                ElNotification({
                    type: "success",
                    message: "登录成功",
                    title: `hello world`,
                });
            } catch (error: any) {
                ElNotification({
                    type: "error",
                    message: error.message,
                });
            }
        } else {
            // 校验失败，做相应处理
            ElNotification({
                type: "error",
                message: "数据格式错误",
            });

        }
    })
};

</script>
    
<style scoped lang="scss">
.menu {
    margin-right: 10px;
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