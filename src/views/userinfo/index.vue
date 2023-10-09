<template>
  <div class="userinfo">
    <div class="main">
      <!-- <el-avatar :size="80" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" /> -->
      <el-upload class="avatar-uploader" action="http://127.0.0.1:3007/api/userinfo/uploadImage" :show-file-list="false"
        :before-upload="beforeAvatarUpload">
        <img src="http://127.0.0.1:3007/api/userinfo/uploadImage " class="avatar" />
        <el-icon class="avatar-uploader-icon">
          <Plus />
        </el-icon>
      </el-upload>
    </div>
    <!-- <input type="file" > -->
  </div>
</template>
    
<script setup lang='ts'>
import { onBeforeMount, reactive } from 'vue';
import { ElMessage } from 'element-plus';
// 用户仓库
import useUserStore from '@/store/modules/user';
const userStore = useUserStore()
// 用户信息仓库
import useUserinfoStore from '@/store/modules/userinfo';
const userinfoStore = useUserinfoStore()
let userinfoFrom = reactive({})
onBeforeMount(async () => {
  const id: any = userStore.userinfo.userId
  const data = await userinfoStore.getUserinfo(id)
  userinfoFrom = data
})
const beforeAvatarUpload = (rawFile: any) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('头像必须是jpg格式')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('头像大小不能超过2MB!')
    return false
  }
  return true
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