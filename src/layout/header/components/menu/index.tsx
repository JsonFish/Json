import { defineComponent } from 'vue'
import { constantRoute } from '@/router/routes'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
export default defineComponent({
  name: 'Menu',
  setup() {
    const router = useRouter()
    const route = useRoute()
    return () => (
      <div class="flex text-menu">
        {constantRoute[0].children?.map((item, index: number) => {
          const IconComponent =
            ElementPlusIconsVue[
              item.meta.icon as keyof typeof ElementPlusIconsVue
            ]
          return (
            item.meta.show && (
              <div
                class={[
                  'flex',
                  'items-center',
                  'h-full',
                  'mx-2',
                  'hover:cursor-pointer',
                  'hover:text-menuActive',
                  'hover:font-semibold',
                  route.path === item.path && 'text-menuActive font-semibold',
                ]}
                key={index}
                onClick={() => router.push(item.path)}
              >
                {IconComponent ? <IconComponent class="w-4 mr-1" /> : null}
                <span class="text-sm leading-4">{item.meta.title}</span>
              </div>
            )
          )
        })}
      </div>
    )
  },
})
