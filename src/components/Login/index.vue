<template>
  <el-dialog
    class="p-0 rounded-xl dialog bg-dialog"
    :lock-scroll="true"
    width="370"
    align-center
    v-model="dialogFormVisible"
    @close="closeDialog"
    append-to-body
  >
    <div class="container">
      <div v-if="!signIn" class="login-box">
        <div class="login-form">
          <h1>登录</h1>
          <el-form :model="loginForm" ref="loginFormRef" size="large">
            <el-form-item
              prop="email"
              :rules="[
                {
                  required: true,
                  message: '请输入邮箱',
                  trigger: 'change',
                },
              ]"
            >
              <el-input
                clearable
                v-model="loginForm.email"
                placeholder="邮箱"
                prefix-icon="Message"
              />
            </el-form-item>
            <el-form-item
              prop="password"
              :rules="[
                {
                  required: true,
                  message: '请输入密码',
                  trigger: 'change',
                },
              ]"
            >
              <el-input
                clearable
                show-password
                v-model="loginForm.password"
                placeholder="密码"
                prefix-icon="Lock"
              />
            </el-form-item>
            <el-form-item
              prop="code"
              :rules="[
                {
                  required: true,
                  message: '请输入验证码',
                  trigger: 'change',
                },
              ]"
            >
              <el-input
                clearable
                v-model="loginForm.code"
                placeholder="验证码"
                prefix-icon="InfoFilled"
                class="w-3/5"
              />

              <div
                style="width: 35%; height: 100%; margin-left: 5%"
                @click="debounce"
              >
                <img
                  style="width: 76%; height: 100%"
                  :src="captchaImage"
                  alt=""
                />
              </div>
            </el-form-item>
            <el-button
              class="w-full"
              @click="onLogin(loginFormRef)"
              type="primary"
              size="default"
              :loading="loading"
            >
              登录
            </el-button>
            <span></span>
            <el-button
              class="w-full mt-3"
              color="#020309"
              size="default"
              @click="loginByGithub"
            >
              <SvgIcon
                color="white"
                class="mr-2"
                name="github"
                width="1.5rem"
                height="1.5rem"
              ></SvgIcon>
              使用GitHub登录
            </el-button>
          </el-form>
          <div class="toSignIn">
            <span type="primary">没有账号?</span>
            <el-link class="text-xs" @click="toSignIn">去注册</el-link>
          </div>
        </div>
      </div>
      <div v-else class="login-box">
        <div class="login-form">
          <h1>注册</h1>
          <el-form :model="signInForm" ref="signInFormRef" size="large">
            <el-form-item
              prop="email"
              :rules="[
                {
                  required: true,
                  min: 10,
                  max: 22,
                  message: '请输入有效邮箱',
                  trigger: 'blur',
                },
              ]"
            >
              <el-input
                clearable
                v-model="signInForm.email"
                placeholder="请输入有效邮箱"
                prefix-icon="Message"
              >
              </el-input>
            </el-form-item>
            <el-form-item
              prop="password"
              :rules="[
                {
                  required: true,
                  message: '请设置密码',
                  trigger: 'blur',
                },
              ]"
            >
              <el-input
                clearable
                show-password
                v-model="signInForm.password"
                placeholder="密码"
                prefix-icon="Lock"
              />
            </el-form-item>
            <el-form-item
              prop="code"
              :rules="[
                {
                  required: true,
                  min: 4,
                  max: 6,
                  message: '请输入验证码',
                  trigger: 'blur',
                },
              ]"
            >
              <el-input
                style="width: 60%"
                clearable
                v-model="signInForm.code"
                placeholder="邮箱验证码"
                prefix-icon="ChatDotRound"
              />
              <el-button
                style="width: 30%; margin-left: 10%"
                :disabled="!signInForm.email || countDownIng"
                plain
                type="primary"
                icon="Promotion"
                size="default"
                @click="sendEmail"
              >
                <span v-if="!countDownIng">发送</span>
                <span v-else>{{ countDownTime }}s后可重发</span>
              </el-button>
            </el-form-item>

            <el-button
              @click="onSignIn(signInFormRef)"
              class="w-full"
              size="default"
              type="primary"
              :loading="loading"
            >
              注册
            </el-button>
          </el-form>
          <div class="toSignIn">
            <span type="primary">已有账号?</span>
            <el-link style="font-size: 12px" @click="toSignIn">去登录</el-link>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      from: "123",
    };
  },
  beforeRouteEnter(to, from, next) {
    //需要处理的逻辑
    next((vm: any) => {
      // 通过 `vm` 访问组件实例
      vm.$data.from = from.fullPath;
    });
    return to;
  },
});
</script>
<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { loginImg } from "@/api/image/index";
import { getCaptcha, GetEmailCode, reqRegister } from "@/api/user";
import { LoginParmars, signInParmars } from "@/api/user/type";
import { type FormInstance, ElMessage } from "element-plus";
import useUserStore from "@/store/modules/user";
defineOptions({
  name: "login",
});
const dialogFormVisible = ref<boolean>(false);
defineExpose({
  dialogFormVisible,
});
const router = useRouter();
const userStore = useUserStore();
const loginForm = reactive<LoginParmars>({
  email: "",
  password: "",
  code: "",
  captchaId: 0,
});
const signInForm = reactive<signInParmars>({
  email: "",
  password: "",
  code: "",
});
const signIn = ref<boolean>(false);
const loginFormRef = ref<FormInstance>();
const signInFormRef = ref<FormInstance>();
const loading = ref<boolean>(false);
const captchaImage = ref<string>("");
const countDownTime = ref<number>(60);
const countDownIng = ref<boolean>(false);
const loginImage = ref<string>();

onMounted(() => {
  loginImg().then((response) => {
    loginImage.value = response.data;
  });
  debounce();
  if (localStorage.getItem("start")) {
    countDownIng.value = true;
    sendEmail();
  }
});
// 获取图片验证码
const getCaptchaImg = async () => {
  loginForm.code = "";
  getCaptcha().then((response) => {
    captchaImage.value = `data:image/jpg;base64,${response.data.imageBase64}`;
    loginForm.captchaId = response.data.id;
  });
};

// 图片验证码防抖
let time: any = null;
const debounce = async () => {
  if (time == null) {
    await getCaptchaImg();
  }
  clearTimeout(time);
  time = setTimeout(() => {
    time = null;
  }, 1000);
};

const toSignIn = () => {
  signIn.value = !signIn.value;
};

// 登录
const onLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (vaild, fields) => {
    if (vaild) {
      loading.value = true;
      try {
        await userStore.userLogin(loginForm);
        ElMessage({ type: "success", message: "登录成功" });
        window.location.href = "/";
      } catch (err: any) {
        ElMessage({ type: "error", message: err });
        loginForm.code = "";
        debounce();
      }
      loading.value = false;
    } else {
      return fields;
    }
  });
};

// 发送验证码
const sendEmail = async () => {
  countDownIng.value = true;
  const startTime = localStorage.getItem("start") as unknown as number;
  const nowTime = new Date().getTime();
  if (startTime) {
    let surplus =
      60 - parseInt(((nowTime - startTime) / 1000) as unknown as string, 10);
    countDownTime.value = surplus <= 0 ? 0 : surplus;
  } else {
    countDownTime.value = 60;
    localStorage.setItem("start", nowTime as unknown as string);

    await GetEmailCode({ email: signInForm.email }).then((response) => {
      if (response.code == 200) {
        ElMessage({ type: "success", message: "发送成功" });
      } else {
        ElMessage({ type: "error", message: response.message });
      }
    });
  }

  let timer = setInterval(() => {
    countDownTime.value--;
    if (countDownTime.value <= 0) {
      localStorage.removeItem("start");
      clearInterval(timer);
      countDownTime.value = 60;
      countDownIng.value = false;
    }
  }, 1000);
};
// 注册
const onSignIn = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (vaild, fields) => {
    if (vaild) {
      loading.value = true;
      try {
        await reqRegister(signInForm).then(async (response) => {
          if (response.code == 200) {
            signInForm.freeCode = true;
            await userStore.userLogin(signInForm);
            ElMessage({ type: "success", message: "注册成功! 已为您自动登录" });
            signInFormRef.value?.resetFields();
            router.push("/");
          } else {
            ElMessage({ type: "error", message: response.message });
          }
        });
      } catch (err: any) {
        ElMessage({ type: "error", message: err });
      }
      loading.value = false;
    } else {
      return fields;
    }
  });
};

// github 登录
const loginByGithub = () => {
  const client_id = "Ov23liZJz1XdjfVMSk5V";
  const redirect_uri = "http://jsonblog.top";
  const path = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}`;
  window.location.replace(path);
};
const closeDialog = () => {
  loginFormRef.value?.resetFields();
  signInFormRef.value?.resetFields();
  signIn.value = false;
};
</script>

<style scoped>
.container {
  border-radius: 12px;
}

.login-box {
  display: flex;
  align-items: center;
  text-align: center;
}

.login-form {
  margin: 10px auto;
}

.toSignIn {
  margin-top: 5px;
  text-align: right;
}

.login-form h1 {
  text-transform: uppercase;
  color: #717478;
  font-size: 1.5rem;
}

.login-form span {
  color: gray;
  font-size: 12px;
}

@media screen and (max-width: 1180px) {
  .login-container {
    grid-gap: 9rem;
  }

  .login-form h2 {
    font-size: 2.4rem;
    margin: 8px 0;
  }
}

@media screen and (max-width: 960px) {
  .container {
    width: 100%;
    justify-content: space-around;
  }
}

@media screen and (max-width: 750px) {
  .img {
    display: none;
  }

  .login-box {
    width: 100%;
  }

  .login-form {
    width: 80%;
  }

  .login-container {
    grid-template-columns: 1fr;
  }

  .login-box {
    justify-content: center;
  }
}
</style>
