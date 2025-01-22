import { defineComponent } from 'vue'
import './index.css'
export default defineComponent({
  name: 'NoiseBg',
  setup() {
    return () => {
      return (
        <div class="main">
          <div class="noise w-screen h-screen"></div>
        </div>
      )
    }
  },
})
