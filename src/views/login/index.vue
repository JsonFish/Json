<template>
   <div>
      <div class="back">
         <el-button @click="backHome" link icon="DArrowLeft" type="primary" size="default">返回首页</el-button>
      </div>
      <div class="switch">
         <Switch></Switch>
      </div>
      <div class="login-container">
         <div class="container">
            <div class="img">
               <img src="@/assets/img/bg1.jpg" />
            </div>
            <div class="login-box">
               <div class="login-form">
                  <h1>登录</h1>
                  <SvgIcon name="yu" width="3rem" height="3rem"></SvgIcon>
                  <h2>json blog</h2>
                  <el-form :model="loginForm" ref="loginFormRef" size="large">
                     <el-form-item prop="email" :rules="[
            {
               required: true,
               message: '请输入邮箱',
               trigger: 'blur',
            },
         ]">
                        <el-input clearable v-model="loginForm.email" placeholder="邮箱" prefix-icon="Message" />
                     </el-form-item>
                     <el-form-item prop="password" :rules="[
            {
               required: true,
               message: '请输入密码',
               trigger: 'blur',
            },
         ]">
                        <el-input clearable show-password v-model="loginForm.password" placeholder="密码"
                           prefix-icon="Lock" />
                     </el-form-item>

                     <el-form-item prop="code" :rules="[
            {
               required: true,
               message: '请输入验证码',
               trigger: 'blur',
            },
         ]">
                        <el-input clearable v-model="loginForm.code" placeholder="验证码" prefix-icon="InfoFilled"
                           style="width: 60%" />

                        <div style="width:30%; height: 100%; margin-left: 5%" @click="debounce">
                           <img style="width: 76%; height: 100%" :src="captchaImage" alt="" />
                        </div>
                     </el-form-item>

                     <el-button @click="onLogin(loginFormRef)" style="width: 100%" size="default" type="primary"
                        :loading="loading">
                        登录
                     </el-button>
                  </el-form>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import Switch from '@/components/Switch/index.vue'
import SvgIcon from "@/components/SvgIcon/index.vue";
import { useRouter } from "vue-router";
import { getCaptcha } from "@/api/user";
import { LoginParmars } from "@/api/user/type";
import { type FormInstance, ElMessage } from "element-plus";
import useUserStore from '@/store/modules/user';
const userStore = useUserStore()
const router = useRouter();
const loginForm = reactive<LoginParmars>({
   email: "test@qq.com",
   password: "123456",
   code: "",
   captchaId: 0
});
const loginFormRef = ref<FormInstance>();
const loading = ref<boolean>(false);
const captchaImage = ref<string>("");
onMounted(() => {
   debounce();
});
// 获取图片验证码
const getCaptchaImg = async () => {
   loginForm.code = "";
   getCaptcha().then(response => {
      captchaImage.value = `data:image/jpg;base64,${response.data.imageBase64}`;
      loginForm.captchaId = response.data.id;
   })
};

// 图片验证码防抖
let time: any = null;
const debounce = async () => {
   if (time == null) {
      await getCaptchaImg()
   }
   clearTimeout(time)
   time = setTimeout(() => {
      time = null
   }, 1000)
};

const backHome = () => {
   router.push("/");
};
// 登录
const onLogin = async (formEl: FormInstance | undefined) => {
   if (!formEl) return;
   await formEl.validate(async (vaild, fields) => {
      if (vaild) {
         loading.value = true
         try {
            await userStore.userLogin(loginForm)
            ElMessage({ type: "success", message: "登录成功" });
            backHome();
         }
         catch (err: any) {
            ElMessage({ type: "error", message: err });
            loginForm.code = ""
            debounce()
         }
         loading.value = false
      } else {
         return fields
      }
   })
}
</script>

<style scoped>
.back {
   position: fixed;
   left: 20px;
   top: 10px;
}

.switch {
   position: fixed;
   right: 25px;
   top: 12px;
}

.login-container {
   width: 100%;
   height: 100vh;
   display: grid;
   grid-template-columns: repeat(2, 1fr);
   grid-gap: 18rem;
   padding: 0 2rem;
   background: var(--home-background-color);
   /* position: fixed;
      z-index: -1;
      width: 100%;
      height: 100%;
      background-image: url('@/assets/img/bg1.jpg');
      background-size: cover;
      filter: var(--image-filter); */
}

.container {
   backdrop-filter: blur(13px) saturate(180%);
   -webkit-backdrop-filter: blur(13px) saturate(180%);
   background-color: rgba(255, 255, 255, 0.8);
   border-radius: 12px;
   width: 60%;
   height: 450px;
   box-shadow: 15px 10px 10px rgba(125, 121, 121, 0.8);
   display: flex;
   justify-content: space-between;
   position: fixed;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
}

.img {
   width: 60%;
}

.img img {
   /* filter: var(--image-filter); */
   display: block;
   width: 100%;
   height: 100%;
   object-fit: cover;
   border-radius: 12px 0 0 12px;
}

.login-box {
   width: 40%;
   display: flex;
   align-items: center;
   text-align: center;
}

.login-form {
   width: 80%;
   margin: 0 auto;
}

.login-form h1 {
   text-transform: uppercase;
   color: #000000;
   font: bold 150% Consolas, Monaco, monospace;
}

.login-form h2 {
   text-transform: uppercase;
   color: #717478;
   margin-bottom: 10px;
   font: bold 200% Consolas, Monaco, monospace;
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
