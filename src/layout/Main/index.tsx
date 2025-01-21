import { defineComponent, h, KeepAlive } from 'vue'
import type { VNode } from 'vue'
import { RouterView } from 'vue-router'

export default defineComponent({
  name: 'Main',
  render() {
    return (
      <RouterView>
        {{
          default: ({ Component }: { Component: VNode }) => (
            <KeepAlive include={['home', 'articleList', 'friendLink', 'daily']}>
              {h(Component)}
            </KeepAlive>
          ),
        }}
      </RouterView>
    )
  },
})
