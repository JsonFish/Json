import { defineComponent, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { View } from '@element-plus/icons-vue'
import { getArticleList } from '@/api/article/index.ts'
import { ArticleInfo } from '@/api/article/type'

export default defineComponent({
  name: 'ArticleList',
  setup() {
    const router = useRouter()
    const articleList = ref<any>([])
    const currentPage = ref<number>(1)
    const pageSize = ref<number>(100)
    const total = ref<number>(0)
    onMounted(async () => {
      await getArticle()
    })
    const getArticle = async () => {
      await getArticleList(currentPage.value, pageSize.value).then(
        (response) => {
          articleList.value = response.data.articleList
          total.value = response.data.total
        },
      )
    }
    const toArticle = (id: number) => {
      router.push({ path: '/article', query: { id } })
    }
    const formatDate = (dateString: string) => {
      const date = new Date(dateString)
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const year = date.getFullYear()
      return `${month}/${day}/${year}`
    }

    return () => {
      return (
        <div class="w-70 my-0 mx-auto flex justify-between">
          <el-row>
            {articleList.value.map((item: ArticleInfo, index: number) => {
              return (
                <el-col key={item.id} span={12}>
                  <div
                    class={[
                      'an' + (index + 1),
                      'flex',
                      'mb-12',
                      'mx-4',
                      'px-4',
                      'hover:bg-articleCard',
                      'rounded',
                      'overflow-hidden',
                      'opacity-0',
                      'translate-x-1/4',
                    ]}
                  >
                    {/* {(index + 2) % 4 !== 0 && (index + 1) % 4 !== 0 && (
                      <div class="overflow-hidden w-48 my-3 ml-2 mr-4 hover:cursor-pointer">
                        <el-image
                          loading="lazy"
                          lazy={true}
                          class="h-full duration-500 hover:scale-110 "
                          fit="cover"
                          src={item.articleCover}
                        />
                      </div>
                    )} */}
                    <div class="w-full py-2">
                      <div onClick={() => toArticle(item.id)}>
                        <span class="text-xl font-bold line-clamp-1 hover:cursor-pointer">
                          {item.articleTitle}
                        </span>
                      </div>
                      <div class="mt-2 h-12" onClick={() => toArticle(item.id)}>
                        <el-text class="line-clamp-2 hover:cursor-pointer">
                          {item.articleSummary}
                        </el-text>
                      </div>
                      <div class="flex justify-between">
                        <div class="flex hover:cursor-pointer">
                          <div class="flex items-center mr-2">
                            <el-icon size="14" class="mr-1">
                              <View />
                            </el-icon>
                            <span class="text-xs">{item.browse}</span>
                          </div>
                          <div class="flex items-center mr-2">
                            <Svg-Icon
                              class="mr-1"
                              name="star"
                              color="#ccc"
                              width="16px"
                              height="18px"
                            ></Svg-Icon>
                            <span class="text-xs">{item.upvote}</span>
                          </div>
                          <div class="flex items-center">
                            {item.tags?.map((item: any) => {
                              return (
                                <div
                                  class="flex items-center"
                                  style="line-height: 12px"
                                >
                                  <Svg-Icon
                                    class="mr-1"
                                    name={item.tagName}
                                    width="14px"
                                    height="14px"
                                  ></Svg-Icon>
                                  <span class="text-xs mr-1" key={item}>
                                    {item.tagName}
                                  </span>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                        <div class="flex items-center">
                          <el-icon size="12" class="mr-1">
                            <clock />
                          </el-icon>
                          <span class="text-xs">
                            {formatDate(item.create_time)}
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* {((index + 2) % 4 == 0 || (index + 1) % 4 == 0) && (
                      <div class="overflow-hidden w-48 my-3 ml-4 mr-2 hover:cursor-pointer">
                        <el-image
                          loading="lazy"
                          lazy={true}
                          class="h-full duration-500 hover:scale-110"
                          fit="cover"
                          src={item.articleCover}
                        />
                      </div>
                    )} */}
                  </div>
                </el-col>
              )
            })}
          </el-row>
        </div>
      )
    }
  },
})
