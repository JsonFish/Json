import { defineComponent, onMounted, onBeforeUnmount, ref } from 'vue'
import Logo from './Logo/index.tsx'
import Menu from './Menu/index.tsx'
import Button from './Button/index.tsx'
import './index.scss'
export default defineComponent({
  name: 'Header',
  setup() {
    // 组件挂载完成之后开始监听页面滚动事件
    onMounted(() => {
      window.addEventListener('scroll', Scroll, true)
    })
    // 组件销毁前移除监听
    onBeforeUnmount(() => {
      window.removeEventListener('scroll', () => {})
    })
    // 整个header的类名
    const className = ref<string>('')
    // 页面位置
    const prevScrollPos = ref<number>(0)
    const Scroll = () => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop
      // 向下滑动
      if (scrollTop < 10 && scrollTop > prevScrollPos.value) {
        className.value = 'headerFirstUp'
        return
      }
      // 页面中间向上滑动
      if (scrollTop >= 50) {
        // 向上滚动
        if (scrollTop < prevScrollPos.value) {
          className.value = 'headerDown backdrop-blur-sm'
          return
        }
        // else {
        //     // 向下
        //     className.value = 'headerUp'
        // }
      }
      if (scrollTop == 0) {
        className.value = 'headertopDown'
      }

      prevScrollPos.value = scrollTop
    }
    return () => (
      <div
        class={[
          'fixed',
          'left-0',
          'top-0',
          'z-10',
          'h-16',
          'w-full',
          'flex',
          'justify-between',
          'backdrop-blur-sm',
          className,
        ]}
      >
        <div class="w-75 my-0 mx-auto flex justify-between">
          <Logo />
          <div class="flex justify-between">
            <Menu />
            <Button />
          </div>
        </div>
      </div>
    )
  },
})
