import { defineComponent, h } from 'vue'
import type { VNode } from 'vue'
import { RouterView } from 'vue-router'

export default defineComponent({
  name: 'Main',
  render() {
    return (
      <RouterView>
        {{
          default: ({ Component }: { Component: VNode }) => (
            <keep-alive
              include={['home', 'articleList', 'friendLink', 'daily']}
            >
              {h(Component)}
            </keep-alive>
          ),
        }}
      </RouterView>
    )
  },
})
