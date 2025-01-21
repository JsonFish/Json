import { ref, onMounted, defineComponent } from 'vue'
import router from '@/router'
import LoginDialog from '@/components/Login/index.vue'
import useThemeStore from '@/store/modules/theme.ts'
import useUserStore from '@/store/modules/user'

export default defineComponent({
  name: 'HeaderBtn',
  setup() {
    const themeStore = useThemeStore()
    const loginDialog = ref<any>(null)
    const userStore = useUserStore()
    onMounted(() => {
      judgeTheme()
    })
    // 登录
    const toLogin = () => {
      loginDialog.value.dialogFormVisible = true
    }
    // 退出登录
    const logOut = () => {
      userStore.logOut()
      router.push('/')
    }
    // 跳转github
    const toGithub = () => {
      window.open('https://github.com/JsonFish/Json', '_blank')
    }
    // 判断主题
    const judgeTheme = () => {
      if (themeStore.darkTheme) {
        var document: Document = window.document
        document.documentElement.classList.toggle('dark')
      }
    }
    // 切换主题
    const changeTheme = (e: any) => {
      themeStore.darkTheme = !themeStore.darkTheme
      var document: Document = window.document
      const transition = document.startViewTransition(() => {
        document.documentElement.classList.toggle('dark')
      })

      // 在 transition.ready 的 Promise 完成后，执行自定义动画
      transition.ready.then(() => {
        // 由于我们要从鼠标点击的位置开始做动画，所以我们需要先获取到鼠标的位置
        const { clientX, clientY } = e

        // 计算半径，以鼠标点击的位置为圆心，到四个角的距离中最大的那个作为半径
        const radius = Math.hypot(
          Math.max(clientX, innerWidth - clientX),
          Math.max(clientY, innerHeight - clientY),
        )
        const clipPath = [
          `circle(0% at ${clientX}px ${clientY}px)`,
          `circle(${radius}px at ${clientX}px ${clientY}px)`,
        ]
        const isDark = document.documentElement.classList.contains('dark')
        // 自定义动画
        document.documentElement.animate(
          {
            // 如果要切换到暗色主题，我们在过渡的时候从半径 100% 的圆开始，到 0% 的圆结束
            clipPath: isDark ? clipPath.reverse() : clipPath,
          },
          {
            duration: 600,
            // 如果要切换到暗色主题，我们应该裁剪 view-transition-old(root) 的内容
            pseudoElement: isDark
              ? '::view-transition-old(root)'
              : '::view-transition-new(root)',
          },
        )
      })
    }
    return () => (
      <div class="flex justify-center items-center ml-5">
        <el-divider direction="vertical" class="mr-7" />
        {!userStore.avatar ? (
          <div
            title="登录"
            onClick={toLogin}
            class="w-7 h-7 flex justify-center items-center rounded-lg border border-solid border-slate-400 hover:cursor-pointer hover:bg-btnHover"
          >
            <svg-icon
              color={themeStore.darkTheme ? '#f2f5fc' : '#000'}
              name="login"
              width="1.3rem"
              height="1.3rem"
            ></svg-icon>
          </div>
        ) : (
          <div class="w-7 h-7 hover:cursor-pointer">
            <el-dropdown placement="bottom" size="small">
              {{
                default: () => <el-avatar size={28} src={userStore.avatar} />,
                dropdown: () => (
                  <el-dropdown-menu>
                    <el-dropdown-item onClick={logOut}>
                      退出登录
                    </el-dropdown-item>
                  </el-dropdown-menu>
                ),
              }}
            </el-dropdown>
          </div>
        )}
        <div
          onClick={toGithub}
          title="github"
          class="w-7 h-7 ml-3 flex justify-center items-center rounded-lg border border-solid border-slate-400 hover:cursor-pointer hover:bg-btnHover"
        >
          <svg-icon
            color={themeStore.darkTheme ? '#f2f5fc' : '#313131'}
            name="github"
            width="1.2rem"
            height="1.2rem"
          ></svg-icon>
        </div>
        <div
          class="w-7 h-7 ml-3 flex rounded-lg justify-center items-center border border-solid border-slate-400 hover:cursor-pointer hover:bg-btnHover"
          onClick={changeTheme}
        >
          <svg-icon
            color={themeStore.darkTheme ? '#f2f5fc' : '#313131'}
            name={themeStore.darkTheme ? 'moon' : 'sunny'}
            width="1.2rem"
            height="1.2rem"
          ></svg-icon>
        </div>
        <LoginDialog ref={loginDialog}></LoginDialog>
      </div>
    )
  },
})
