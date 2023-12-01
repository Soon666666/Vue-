import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// 引用router
import router from './router'
//引用store
import store from './store'

//引用axios和vue-axios
import axios from 'axios'
import VueAxios from 'vue-axios'
//设置每个访问后台的api，都加上一个/api，便于代理跳转到
//http://localhost:8080
axios.defaults.baseURL = "/api"


//完整引入element-lus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import zhCn from 'element-plus/dist/locale/zh-cn.mjs' //中文
//项目中全局配置store，router,axios,ElementPlus
const app=createApp(App)
app.use(store).use(router).use(VueAxios,axios);
app.use(ElementPlus,{locale:zhCn})
app.mount('#app');



