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

// 关闭登录窗
const closeDialog = () => {
  loginFormRef.value?.resetFields();
  signInFormRef.value?.resetFields();
  signIn.value = false;
};
</script>

<template>
  <el-dialog
    class="px-5 rounded-xl dialog bg-dialog"
    :lock-scroll="true"
    width="370"
    align-center
    v-model="dialogFormVisible"
    @close="closeDialog"
    append-to-body
  >
    <div v-if="!signIn">
      <div class="text-center text-xl mb-3 -mt-4">登录</div>
      <el-form :model="loginForm" ref="loginFormRef" size="default">
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
          <div class="w-full flex justify-between">
            <el-input
              clearable
              v-model="loginForm.code"
              placeholder="验证码"
              prefix-icon="InfoFilled"
              class="w-3/5"
            />
            <img @click="debounce" class="w-1/4" :src="captchaImage" alt="" />
          </div>
        </el-form-item>

        <el-button
          class="w-full bg-loginBtnBg text-loginBtnText hover:bg-loginBtnHover hover:text-loginBtnText"
          @click="onLogin(loginFormRef)"
          size="default"
          :loading="loading"
        >
          登录
        </el-button>
        <div class="flex justify-between">
          <el-link class="text-xs">忘记密码?</el-link>
          <div>
            <span class="text-xs">没有账号?</span>
            <el-link class="text-xs align-baseline" @click="toSignIn"
              >去注册</el-link
            >
          </div>
        </div>
      </el-form>
    </div>
    <div v-else>
      <div class="text-center text-xl mb-3 -mt-4">注册</div>
      <el-form :model="signInForm" ref="signInFormRef" size="default">
        <el-form-item
          prop="email"
          :rules="[
            {
              required: true,
              min: 10,
              max: 22,
              message: '请输入有效邮箱',
              trigger: 'change',
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
              trigger: 'change',
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
              trigger: 'change',
            },
          ]"
        >
          <div class="w-full flex justify-between">
            <el-input
              class="w-3/5"
              clearable
              v-model="signInForm.code"
              placeholder="邮箱验证码"
              prefix-icon="ChatDotRound"
            />
            <el-button
              class="w-1/4 bg-loginBtnBg text-loginBtnText hover:bg-loginBtnHover hover:text-loginBtnText"
              :disabled="!signInForm.email || countDownIng"
              plain
              icon="Promotion"
              size="default"
              @click="sendEmail"
            >
              <span v-if="!countDownIng">发送</span>
              <span class="text-xs" v-else>{{ countDownTime }}s后可重发</span>
            </el-button>
          </div>
        </el-form-item>

        <el-button
          @click="onSignIn(signInFormRef)"
          class="w-full bg-loginBtnBg text-loginBtnText hover:bg-loginBtnHover hover:text-loginBtnText"
          size="default"
          :loading="loading"
        >
          注册
        </el-button>
      </el-form>
      <div class="flex justify-end">
        <div>
          <span class="text-xs">已有账号?</span>
          <el-link class="text-xs align-baseline" @click="toSignIn"
            >去登录</el-link
          >
        </div>
      </div>
    </div>
    <el-divider class="my-4" content-position="center"
      ><span class="text-xs">第三方登录</span></el-divider
    >
    <el-button
      class="w-full border-none bg-black text-white hover:text-white hover:bg-zinc-950"
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
  </el-dialog>
</template>
