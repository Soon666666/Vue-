import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from 'path'
//定义解析函数
function _resolve(dir) {
  return path.resolve(__dirname, dir)
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 配置项目别名
  //适配书本的vue cli代码的目录@引用src
  resolve: {
    alias: {
      '@': _resolve('src'),
    },
  },
  server:{
    cors: true, // 默认启用并允许任何源
    open: true, // 在服务器启动时自动在浏览器中打开应用程序
    proxy:{
      //这里设置访问的URL为/api/XXX,是为了区分所有的后端服务，只要是后端服务统统有一个前缀/api
      //通过代理的方式取访问后台服务http://localhost:8080
      // /api/user  =>http://localhost:8080/user
      // /user
      '/api':{
        target:'http://localhost:8080/',//后端服务
        changeOrigin:true,//允许改变源
        ws:true,//允许websocket代理，避免websocket出错
        //在后端的时候，重写路径，去掉/api
        rewrite:(path)=>path.replace(/^\/api/,'')
      }
    }

  }
},
)
