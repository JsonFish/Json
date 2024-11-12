// 主题切换相关仓库
import { defineStore } from 'pinia'
const useThemeStore = defineStore('theme', {
    // 为了完整类型推理，推荐使用箭头函数
    state: () => {
        return {
            darkTheme:true,
        }
    },
})
export default useThemeStore