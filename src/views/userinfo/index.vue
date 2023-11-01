<template>
  <div class="userinfo">
    <div class="main">
      <el-upload class="avatar-uploader" :headers=headers action="/api/userinfo/uploadImage" :show-file-list="false"
        :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess">
        <img v-if="userStore.userinfo.user_pic" :src="userStore.userinfo.user_pic" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon">
          <Plus />
        </el-icon>
      </el-upload>
    </div>
    <!-- <input type="file" > -->
  </div>
</template>
    
<script setup lang='ts'>
import { onBeforeMount, reactive, computed, nextTick } from 'vue';
import { ElMessage } from 'element-plus';
// 获取token
import { GET_TOKEN } from "@/utils/token";
import useUserStore from '@/store/modules/user';
const userStore = useUserStore()
// 用户信息仓库
import useUserinfoStore from '@/store/modules/userinfo';
const userinfoStore = useUserinfoStore()
// 存储用户信息
let userinfoForm = reactive<any>({})
// 将token携带给后端
const headers = computed(() => {
  return { "authorization": GET_TOKEN() }
})
onBeforeMount(() => {
  getUser()
})
// 获取用户信息
const getUser = async () => {
  const data = await userinfoStore.getUserinfo()
  userinfoForm = data
}
const beforeAvatarUpload = (rawFile: any) => {
  if (rawFile.type !== "image/png" &&
    rawFile.type !== "image/jpeg" &&
    rawFile.type !== "image/gif") {
    ElMessage.error('上传文件格式务必是图片格式')
    return false
  } else if (rawFile.size / 1024 / 1024 > 4) {
    ElMessage.error('头像大小不能超过4MB!')
    return false
  }
  return true
}
// 图片上传成功回调
const handleAvatarSuccess = (response: any, uploadFile: any) => {
  userStore.userinfo.user_pic = response.data.path
  ElMessage({
    type:'success',
    message:'上传成功'
  })
  getUser()
}

</script>
    
<style lang="scss" scoped>
.userinfo {
  width: 100%;
  height: 1000px;
  background: rgb(90, 103, 108);

  .main {
    width: 400px;
    height: 400px;
    background: var(--home-background-color);
    margin-left: 40%;

    .avatar-uploader .avatar {
      width: 80px;
      height: 80px;
      display: block;
    }
  }
}
</style>
<style>
.avatar-uploader .el-upload {
  /* border: 1px dashed var(--el-border-color); */
  border-radius: 40px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 80px;
  height: 80px;
  text-align: center;
}
</style>