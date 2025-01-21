import { defineComponent } from 'vue'
import Logo from './Logo/index.tsx'
import Menu from './Menu/index.tsx'
import Button from './Button/index.tsx'
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
