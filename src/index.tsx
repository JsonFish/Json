import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  setup() {
    onMounted(() => {
      console.log(
        '大佬们 求个star⭐ 网站源码 Github：https://github.com/JsonFish/Json',
      )
    })
    return () => {
      return <routerView />
    }
  },
})
