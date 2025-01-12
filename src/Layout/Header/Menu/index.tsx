import { defineComponent } from 'vue'
import { constantRoute } from '@/router/routes'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
export default defineComponent({
  name: 'Menu',
  setup() {
    const router = useRouter()
    const servlet = (path: string) => {
      router.push(path)
    }
    const route = useRoute()
    return () => (
      <div class="flex text-menu">
        {constantRoute[0].children?.map((item: any, index: number) => {
          return (
            <div
              class={[
                'flex',
                'items-center',
                'h-full',
                'mx-2',
                'hover:cursor-pointer',
                'hover:text-menuActive',
                'hover:font-semibold',
                route.path === item.path ? 'text-menuActive font-semibold' : '',
              ]}
              v-show={item.meta.show}
              key={index}
              onClick={() => servlet(item.path)}
            >
              <component class="w-4 mr-1" is={item.meta.icon}></component>
              <span class="text-sm leading-4">{item.meta.title}</span>
            </div>
          )
        })}
      </div>
    )
  },
})
