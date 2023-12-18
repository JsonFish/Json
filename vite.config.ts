import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// 引入svg需要用到插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  let env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve("./src") // 相对路径别名配置，使用 @ 代替 src
      }
    },
    // 全局css
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
    // 代理跨域
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {  // 以 /api 开头的路径请求，会被拦截,然后代理跨域，发送到 target 配置的服务器上。
          // 已经在axios配置baseURL为 /api 所以该项目所有请求都会发到 target 配置的服务器
          target: env.VITE_SERVE,  // 获取数据的服务器地址设置
          changeOrigin: true, // 需要代理跨域
          // rewrite: (path) => path.replace(/^\/api/, ""), //路径重写 将以api开头的请求 全部将 /api 替换为 ''
        },
      },
    },
  }
})
