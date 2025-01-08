import { defineComponent } from 'vue'
import Header from './Header/index.vue'
import Main from './Main/index.vue'
import NoiseBg from '@/components/NoiseBg/index.vue'
import Footer from './Footer/index.tsx'

export default defineComponent({
  name: 'Layout',
  setup() {
    return () => (
      <div>
        <NoiseBg class="fixed top-0 left-0 -z-10" />
        <Header />
        <Main class="pt-20 min-h-screen" />
        <Footer />
      </div>
    )
  },
})
