import { ref, watch, defineComponent, PropType } from 'vue'
import { Plus, Delete, ZoomIn } from '@element-plus/icons-vue'
import {
  ElMessage,
  UploadUserFile,
  UploadInstance,
  UploadProps,
  UploadRequestHandler,
} from 'element-plus'
import './index.scss'

export default defineComponent({
  props: {
    limit: {
      type: Number,
      default: 1,
    },
    fileSize: {
      type: Number,
      default: 2,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    fileList: {
      type: Array as PropType<UploadUserFile[]>,
      default: () => [],
    },
    hiddenDelete: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['getFileList'],
  setup(props, { emit }) {
    const uploadFileList = ref<UploadUserFile[]>([])
    const imageViewer = ref<boolean>(false)
    const previewIndex = ref<number>(0)
    const uploadRef = ref<UploadInstance>()
    const showUpload = ref<boolean>(true)

    const change = (
      uploadFile: UploadUserFile,
      uploadFiles: UploadUserFile[],
    ) => {
      if (uploadFiles.length >= props.limit) {
        showUpload.value = false
      }
      return uploadFile
    }

    const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
      if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
        ElMessage.error('图片必须是 JPG 或 PNG 格式 !')
        return false
      } else if (rawFile.size / 1024 / 1024 > props.fileSize) {
        ElMessage.error(`图片大小不能超过 ${props.fileSize}MB!`)
        return false
      }
      return true
    }

    const handleExceed = () => {
      ElMessage.error(`最多上传 ${props.limit} 个文件!`)
    }

    const handleFileUpload: UploadRequestHandler = () => new Promise(() => {})

    watch(
      () => uploadFileList.value,
      (newVal) => {
        emit('getFileList', newVal)
      },
    )

    const perview = (file: UploadUserFile) => {
      previewIndex.value = uploadFileList.value.findIndex(
        (item: any) => item.uid === file.uid,
      )
      imageViewer.value = true
    }

    const closeImgViewer = () => {
      imageViewer.value = false
    }

    const remove = (file: UploadUserFile) => {
      const { url } = file
      const index = uploadFileList.value.findIndex((item) => item.url === url)
      if (index !== -1) {
        uploadFileList.value.splice(index, 1)
      }
      if (uploadFileList.value.length <= props.limit) {
        showUpload.value = true
      }
      emit('getFileList', uploadFileList.value)
    }

    watch(
      () => props.fileList,
      (newVal) => {
        uploadFileList.value = newVal
        if (newVal.length >= props.limit) {
          showUpload.value = false
        }
        if (!newVal.length) {
          showUpload.value = true
        }
      },
      {
        immediate: true,
        deep: true,
      },
    )

    return () => (
      <div>
        <el-upload
          class={showUpload.value ? '' : 'hide-upload'}
          ref={uploadRef}
          v-model:file-list={uploadFileList.value}
          list-type="picture-card"
          multiple={props.multiple}
          action="#"
          before-upload={beforeUpload}
          onPreview={perview}
          onRemove={remove}
          limit={props.limit}
          auto-upload={true}
          onChange={change}
          onExceed={handleExceed}
          http-request={handleFileUpload}
        >
          {{
            default: () => (
              <el-icon class="avatar-uploader-icon">
                <Plus />
              </el-icon>
            ),
            file: ({ file }: { file: UploadUserFile }) => (
              <div class="w-full h-full">
                <el-image src={file.url} fit="cover" class="w-full h-full" />
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    onClick={() => perview(file)}
                  >
                    <el-icon>
                      <ZoomIn />
                    </el-icon>
                  </span>
                  {!props.hiddenDelete && (
                    <span
                      class="el-upload-list__item-delete"
                      onClick={() => remove(file)}
                    >
                      <el-icon>
                        <Delete />
                      </el-icon>
                    </span>
                  )}
                </span>
              </div>
            ),
          }}
        </el-upload>
        {imageViewer.value && (
          <el-image-viewer
            url-list={uploadFileList.value.map((item) => item.url)}
            initial-index={previewIndex.value}
            teleported
            hide-on-click-modal
            onClose={closeImgViewer}
          />
        )}
      </div>
    )
  },
})
