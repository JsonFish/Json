import { defineComponent, onMounted, ref } from 'vue'
import { ElMessage, ElLoading } from 'element-plus'
import TypeWriter from '@/components/typeWriter/index.vue'
import { reqGithubLogin } from '@/api/user'
import { blogInfor } from '@/api/info'
import type { Information, LinksType } from '@/api/info/type'
import { setToken } from '@/utils/token'
import useUserStore from '@/store/modules/user'
const userStore = useUserStore()
export default defineComponent({
  name: 'home',
  setup() {
    const blogInfoForm = ref<Information>({
      blogName: '', // 博客名
      blogAvatar: '', // 博客头像
      link: [],
    })
    blogInfor().then((response) => {
      blogInfoForm.value = response.data
    })
    onMounted(() => {
      // 处理github登录的code
      const parmars = window.location.href.split('?')[1]
      const code = new URLSearchParams(parmars).get('code')
      if (code) {
        const loading = ElLoading.service({
          lock: true,
          text: '登录中...',
          background: 'rgba(0, 0, 0, 0.6)',
        })
        reqGithubLogin(code.slice(0, -6)).then((response) => {
          if (response.code == 200) {
            userStore.username = response.data.username
            userStore.avatar = response.data.avatar
            // token 本地存储
            setToken(response.data)
            ElMessage({ type: 'info', message: '登录成功' })
          } else {
            ElMessage({ type: 'error', message: response.message })
          }
          loading.close()
        })
      }
      // 清除URL上的参数
      var url = new URL(window.location.href)
      url.search = ''
      history.replaceState(null, '', url.href)
    })
    const toLink = (url: string) => {
      window.open(url, '_blank')
    }
    return () => {
      return (
        <div class="w-70 mx-auto flex justify-between">
          <div class="flex pb-20 justify-between items-center w-full px-14">
            <div>
              <p class="text-2xl mb-2">Hi 👋, Welcome To My Blog. ✨</p>
              <p class="text-4xl font-bold mb-2">
                I'm
                <span class="text-cyan-400">
                  {' '}
                  {blogInfoForm.value.blogName}
                </span>
                .
              </p>
              <TypeWriter
                class="mb-2"
                size="1.5rem"
                timeSpace={0.8}
                wordPrintTime={0.15}
                typeList={[
                  '一名前端开发实习生。',
                  'A Front End Development Intern 💻.',
                ]}
              />
              <div class="text-2xl mb-4 flex items-center">
                I'm Interested In&ensp;
                <Svg-Icon width="24px" height="24px" name="vue" />
                <span class="text-emerald-400">Vue</span>, &ensp;
                <Svg-Icon width="24px" height="24px" name="react" />
                <span class="text-cyan-500">React</span> &ensp;And&ensp;
                <Svg-Icon width="24px" height="24px" name="nodejs" />
                <span class="text-lime-600">NodeJs</span>.
              </div>
              <div class="flex gap-4">
                {blogInfoForm.value.link.map((item: LinksType) => {
                  return (
                    <div
                      key={item.title}
                      onClick={() => toLink(item.url)}
                      title={item.title}
                      class="w-8 h-8 flex justify-center items-center bg-white rounded-lg border border-solid border-slate-300 hover:cursor-pointer"
                    >
                      <Svg-Icon
                        name={item.title}
                        width="1.4rem"
                        height="1.4rem"
                      ></Svg-Icon>
                    </div>
                  )
                })}
              </div>
            </div>
            <div>
              <el-avatar
                fit="cover"
                size={220}
                src={blogInfoForm.value.blogAvatar}
                alt="Avatar"
              />
            </div>
          </div>
        </div>
      )
    }
  },
})
