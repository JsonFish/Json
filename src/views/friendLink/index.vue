<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { getLink, applyLink } from '@/api/link'
import type { LinkInfo } from '@/api/link/type'
import { uploadFile } from '@/utils/upload'
import useUserStore from '@/store/modules/user'
import { ElMessage } from 'element-plus'
import { type UploadUserFile, type FormInstance } from 'element-plus'
import Upload from '@/components/Upload/index.vue'
defineOptions({
  name: 'friendLink',
})

const userStore = useUserStore()
const linkList = ref<LinkInfo[]>()
const visible = ref<boolean>(false)
const linkFormRef = ref<FormInstance>()
const fileList = ref<UploadUserFile[]>([])
const linkForm = reactive<LinkInfo>({
  siteAvatar: '',
  siteName: '',
  siteDesc: '',
  siteUrl: '',
})
onMounted(() => {
  getLinkList()
})
const getLinkList = () => {
  getLink().then((response) => {
    linkList.value = response.data
  })
}
// 跳转
const toLink = (url: string) => {
  window.open(url, '_blank')
}
// 获取文件
const getFileList = (file: UploadUserFile[]) => {
  fileList.value = file
}
// 打开弹窗
const apply = () => {
  if (!userStore.username || !userStore.avatar) {
    ElMessage({ type: 'info', message: '请先登录哦！' })
    return
  }
  visible.value = true
}
// 验证网站地址
const validateUrl = (_rule: any, value: string, callback: any) => {
  if (!value) {
    return callback(new Error('请输入网站地址'))
  }
  const reg = /^http(s)?:\/\//
  if (!reg.test(value)) {
    callback(new Error('请输入以http或https开头的网站地址'))
  } else {
    callback()
  }
}
// 提交友链申请
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  // 是否选择了头像
  if (fileList.value.length) {
    linkForm.siteAvatar = fileList.value
  }
  formEl.validate(async (valid) => {
    if (valid) {
      // 上传头像
      await uploadFile(fileList.value).then((res: any) => {
        linkForm.siteAvatar = res.url
      })
      applyLink(linkForm).then((res) => {
        if (res.code == 200) {
          ElMessage({ type: 'info', message: '申请成功！' })
        } else {
          ElMessage({ type: 'info', message: res.message })
        }
        closeDialog()
      })
    }
  })
}
// 关闭弹窗
const closeDialog = () => {
  visible.value = false
  linkFormRef.value?.resetFields()
  fileList.value = []
}
</script>

<template>
  <div>
    <div class="flex justify-center items-center text-4xl mb-2">
      <p>友链</p>
    </div>
    <div>
      <div class="text-center my-5">
        <el-button @click="apply" plain>申请友链</el-button>
      </div>
      <div class="mx-auto my-0 w-65">
        <el-row>
          <el-col v-for="(item, index) in linkList" :key="item.id" :span="6">
            <div
              :class="'an' + (index + 1)"
              class="flex justify-between border border-solid border-slate-500 h-20 rounded-lg m-2 opacity-0 translate-x-1/4 hover:cursor-pointer hover:bg-articleCard"
              @click="toLink(item.siteUrl)"
            >
              <div class="w-20 h-full flex justify-center items-center">
                <el-avatar
                  shape="square"
                  class="duration-500 hover:scale-110"
                  :src="item.siteAvatar"
                  fit="cover"
                  size="large"
                />
              </div>
              <div class="w-40">
                <span class="mt-2 text-base font-bold line-clamp-1">{{
                  item.siteName
                }}</span>
                <span class="text-xs line-clamp-2">{{ item.siteDesc }}</span>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-dialog
      @close="closeDialog"
      :lock-scroll="false"
      class="rounded-md"
      align-center
      width="370"
      v-model="visible"
    >
      <div class="text-center text-xl mb-3 -mt-4">友链申请</div>
      <el-form :model="linkForm" ref="linkFormRef" label-width="80">
        <el-form-item
          label="网站名称"
          prop="siteName"
          :rules="[
            {
              required: true,
              trigger: 'change',
              message: '请输入网站名称',
            },
          ]"
        >
          <el-input placeholder="你的网站叫啥？" v-model="linkForm.siteName" />
        </el-form-item>
        <el-form-item
          label="网站描述"
          prop="siteDesc"
          :rules="[
            {
              required: true,
              trigger: 'change',
              message: '请输入网站描述',
            },
          ]"
        >
          <el-input
            placeholder="描述一下你的网站"
            v-model="linkForm.siteDesc"
          />
        </el-form-item>
        <el-form-item
          label="网站地址"
          prop="siteUrl"
          :rules="[
            {
              required: true,
              trigger: 'change',
              validator: validateUrl,
            },
          ]"
        >
          <el-input
            placeholder="必须以'http'或'https'开头"
            v-model="linkForm.siteUrl"
          />
        </el-form-item>
        <el-form-item
          label="头像"
          prop="siteAvatar"
          :rules="[
            {
              required: true,
              trigger: 'change',
              message: '请上传头像',
            },
          ]"
        >
          <Upload
            @getFileList="getFileList"
            :fileSize="3"
            :file-list="fileList"
          />
        </el-form-item>
        <el-button
          class="w-full bg-loginBtnBg text-loginBtnText hover:bg-loginBtnHover hover:text-loginBtnText"
          size="default"
          @click="submitForm(linkFormRef)"
        >
          申请
        </el-button>
      </el-form>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
// 上传框样式
:deep(.el-upload--picture-card) {
  width: 100px !important;
  height: 100px !important;
}
// 图片样式
:deep(.el-upload-list__item) {
  width: 100px !important;
  height: 100px !important;
  margin: 0 !important;
  border: none !important;
}

:deep(.el-upload-list--picture-card) {
  display: flex;
}
</style>
