import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { blogName } from '@/setting/blogInfo'

export default defineComponent({
  name: 'Logo',
  setup() {
    const router = useRouter()

    const toHome = () => {
      router.push({ path: '/' })
    }

    return () => {
      return (
        <div
          class="flex justify-center items-center hover:cursor-pointer"
          onClick={() => toHome}
        >
          <svg-icon
            color="white"
            class="hover:cursor-pointer mr-1"
            name="logo"
            width="1.8rem"
            height="1.8rem"
          />
          <span class="text-xl font-semibold text-sky-500">{blogName}</span>
        </div>
      )
    }
  },
})
