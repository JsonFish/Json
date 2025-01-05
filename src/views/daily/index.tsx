import { defineComponent, ref, onMounted } from 'vue'
import Upload from '@/components/Upload/index.vue'
import { DynamicInfo } from '@/api/daily/type'
import { getDaily } from '@/api/daily'
export default defineComponent({
  name: 'daily',
  setup() {
    const dailyList = ref<Array<DynamicInfo>>([])
    const avatar = ref<string>('')
    const name = ref<string>('')
    const total = ref<number>(0)
    const pageSize = ref<number>(6)
    const currentPage = ref<number>(1)
    onMounted(() => {
      getDailyList()
    })
    const getDailyList = () => {
      getDaily(currentPage.value, pageSize.value).then((response) => {
        dailyList.value = response.data.dynamicList
        avatar.value = response.data.avatar
        name.value = response.data.username
        total.value = response.data.total
      })
    }
    return () => (
      <div class="min-h-screen">
        <div class="flex justify-center items-center text-4xl mb-2">
          <p>日常</p>
        </div>
        <div>
          <div class="mx-auto my-0 w-65">
            <el-row>
              {dailyList.value.map((item: DynamicInfo, index: number) => (
                <el-col key={item.id} span={8}>
                  <el-card
                    class={[
                      'an' + (index + 1),
                      'border-0',
                      'm-1',
                      'opacity-0',
                      'translate-x-1/4',
                    ]}
                    body-style="padding:10px"
                    shadow="never"
                  >
                    {{
                      header: () => (
                        <div class="flex items-center h-8">
                          <el-avatar
                            size={50}
                            shape="square"
                            src={avatar.value}
                            fit="fill"
                          />
                          <span class="ml-2">{name.value}</span>
                        </div>
                      ),
                      default: () => (
                        <div>
                          <p class="mb-1">{item.content}</p>
                          <Upload fileList={item.images} hiddenDelete={true} />
                        </div>
                      ),
                      footer: () => (
                        <span class="text-xs">发布于 {item.create_time}</span>
                      ),
                    }}
                  </el-card>
                </el-col>
              ))}
            </el-row>
          </div>
          <el-row class="mt-5">
            <div class="mx-auto my-4">
              <el-pagination
                hide-on-single-page
                v-model:current-page={currentPage.value}
                v-model:page-size={pageSize.value}
                total={total.value}
                background
                layout="->,prev, pager, next"
                onCurrentChange={() => getDailyList()}
              />
            </div>
          </el-row>
        </div>
      </div>
    )
  },
})
