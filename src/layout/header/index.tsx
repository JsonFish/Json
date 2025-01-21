import { defineComponent } from 'vue'
import Logo from './components/logo/index.tsx'
import Menu from './components/menu/index.tsx'
import Button from './components/button/index.tsx'
export default defineComponent({
  name: 'Header',
  setup() {
    return () => (
      <div class="fixed left-0 top-0 z-10 h-16 w-full flex justify-between backdrop-blur-sm">
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
