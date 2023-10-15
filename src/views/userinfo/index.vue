<template>
  <div class="userinfo">
    <div class="main">
      <el-upload class="avatar-uploader" :headers=headers action="/api/userinfo/uploadImage" :show-file-list="false"
        :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess">
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon">
          <Plus />
        </el-icon>
      </el-upload>
    </div>
    <!-- <input type="file" > -->
  </div>
</template>
    
<script setup lang='ts'>
import { onBeforeMount, reactive, ref,computed } from 'vue';
import { ElMessage } from 'element-plus';
// 获取token
import { GET_TOKEN } from "@/utils/token";
// 用户信息仓库
import useUserinfoStore from '@/store/modules/userinfo';
const userinfoStore = useUserinfoStore()
let userinfoFrom = reactive({})
const imageUrl = ref('')
// 将token携带给后端
const headers = computed(()=>{
  return { "authorization": GET_TOKEN()}
})
onBeforeMount(async () => {
  const data = await userinfoStore.getUserinfo()
  userinfoFrom = data
})
const beforeAvatarUpload = (rawFile: any) => {
  if (rawFile.type !== "image/png" && 
    rawFile.type !== "image/jpeg" &&
    rawFile.type !== "image/gif") {
    ElMessage.error('上传文件格式务必是图片格式')
    return false
  } else if (rawFile.size / 1024 / 1024 > 3) {
    ElMessage.error('头像大小不能超过3MB!')
    return false
  }
  return true
}
const handleAvatarSuccess = (response: any, uploadFile: any) => {
  console.log('response',response);
  console.log("uploadFile",uploadFile);
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
  console.log(imageUrl.value);
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
  border: 1px dashed var(--el-border-color);
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