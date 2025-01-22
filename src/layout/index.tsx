import { defineComponent } from 'vue'
import Header from './header/index.tsx'
import Main from './main/index.tsx'
import NoiseBg from '@/components/nosieBg/index.tsx'
import Footer from './footer/index.tsx'

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
