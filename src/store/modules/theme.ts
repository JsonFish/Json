import { defineStore } from 'pinia'

const useThemeStore = defineStore('theme', {
    // 为了完整类型推理，推荐使用箭头函数
    state: () => {
        return {
            // 所有这些属性都将自动推断出它们的类型
            lightOrDark:false,
        }
    },
})
export default useThemeStore