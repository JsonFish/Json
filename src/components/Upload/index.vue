<template>
  <div>
    <el-upload
      :class="[showUpload ? '' : 'hide-upload']"
      ref="uploadRef"
      v-model:file-list="uploadFileList"
      list-type="picture-card"
      :multiple="multiple"
      action="#"
      :before-upload="beforeUpload"
      :on-preview="perview"
      :on-remove="remove"
      :limit="limit"
      :auto-upload="true"
      :on-change="change"
      :on-exceed="handleExceed"
      :http-request="handleFileUpload"
    >
      <el-icon class="avatar-uploader-icon">
        <Plus />
      </el-icon>
      <template #file="{ file }">
        <div class="w-full h-full">
          <el-image :src="file.url" fit="cover" class="w-full h-full" />
          <span class="el-upload-list__item-actions">
            <span class="el-upload-list__item-preview" @click="perview(file)">
              <el-icon><zoom-in /></el-icon>
            </span>
            <span
              v-show="!hiddenDelete"
              class="el-upload-list__item-delete"
              @click="remove(file)"
            >
              <el-icon>
                <Delete />
              </el-icon>
            </span>
          </span>
        </div>
      </template>
    </el-upload>
    <el-image-viewer
      v-if="imageViewer"
      :url-list="uploadFileList.map((item: any) => item.url)"
      :initial-index="previewIndex"
      :teleported="true"
      :hide-on-click-modal="true"
      @close="closeImgViewer"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import type { UploadInstance, UploadRequestHandler } from "element-plus";
import { Plus, Delete, ZoomIn } from "@element-plus/icons-vue";
import { type UploadProps, type UploadUserFile, ElMessage } from "element-plus";

const props = defineProps({
  // 数量限制
  limit: {
    type: Number,
    default: 1,
  },
  // 大小限制(MB)
  fileSize: {
    type: Number,
    default: 2,
  },
  // 是否可以一次上传多个文件
  multiple: {
    type: Boolean,
    default: false,
  },
  // 默认上传图片数组 用于回显
  fileList: {
    type: Array<any>,
    default: () => {},
  },
  // 隐藏删除按钮
  hiddenDelete: {
    type: Boolean,
    dafault: false,
  },
  // 文件类型, 例如'png', 'jpg', 'jpeg',字符串，英文逗号隔开
  // fileType: {
  //   type: String,
  //   default: ".png,.jpg,.jpeg"
  // }
});
const emit = defineEmits(["getFileList"]);
// 上传图片的列表
const uploadFileList = ref<UploadUserFile[]>([]);
// 控制预览图片的显示隐藏
const imageViewer = ref<boolean>(false);
// 初始预览图像索引
const previewIndex = ref(0);
// 获取el-upload实例
const uploadRef = ref<UploadInstance>();
// 控制el-upload显示与隐藏
const showUpload = ref<boolean>(true);

// 文件状态改变时的钩子
const change = (uploadFile: UploadUserFile, uploadFiles: UploadUserFile[]) => {
  if (uploadFiles.length >= props.limit) {
    showUpload.value = false;
  }
  return uploadFile;
};

// 文件上传前钩子
const beforeUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/jpeg" && rawFile.type !== "image/png") {
    ElMessage({
      type: "error",
      message: "图片必须是 JPG 或 PNG 格式 !",
    });
    return false;
  } else if (rawFile.size / 1024 / 1024 > props.fileSize) {
    ElMessage({
      type: "error",
      message: `图片大小不能超过 ${props.fileSize}MB!`,
    });
    return false;
  }
  return true;
};

// 文件上传超出限制回调函数
const handleExceed = () => {
  ElMessage({
    type: "error",
    message: `最多上传 ${props.limit} 个文件!`,
  });
};

// 自定义上传函数 参数为上传的文件 覆盖xhr
const handleFileUpload: UploadRequestHandler = () => {
  return new Promise(() => {});
};

// 监听 uploadFileList.value
watch(
  () => uploadFileList.value,
  (newVal) => {
    emit("getFileList", newVal);
  }
);

// 预览
const perview = (file: UploadUserFile) => {
  previewIndex.value = uploadFileList.value.findIndex(
    (item: any) => item.uid == file.uid
  );
  imageViewer.value = true;
};

// 关闭预览
const closeImgViewer = () => {
  imageViewer.value = false;
};

// 移除
const remove = (file: UploadUserFile) => {
  const { url } = file;
  const index = uploadFileList.value.findIndex((file) => file.url == url);

  if (index != -1) {
    uploadFileList.value.splice(index, 1);
  }
  if (uploadFileList.value.length <= props.limit) {
    showUpload.value = true;
  }
  // 移除uploadFileList.value 无变化 无法监听
  emit("getFileList", uploadFileList.value);
};

// 监听props.fileList 便于隐藏el-upload
watch(
  () => props.fileList,
  (newVal) => {
    uploadFileList.value = newVal;
    if (newVal.length >= props.limit) {
      showUpload.value = false;
    }
    if (!newVal.length) {
      showUpload.value = true;
    }
  },
  {
    immediate: true,
    deep: true,
  }
);
</script>

<style lang="scss" scoped>
.hide-upload {
  ::v-deep() {
    .el-upload--picture-card {
      display: none;
    }
  }
}
</style>
