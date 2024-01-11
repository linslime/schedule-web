import { createApp } from 'vue'
import App from './App.vue'
//引入ant design vue
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
//引入图标
import * as Icons from '@ant-design/icons-vue'
//引入路由
import router from './router';

//对象复制
import objCoppy from './utils/objCoppy';
//信息确定弹框
import myconfirm from './utils/myconfirm';
const app = createApp(App)
//引入按钮权限
import { permission } from '@/directives/permission'
//全局挂载
app.config.globalProperties.$objCoppy = objCoppy
app.config.globalProperties.$myconfirm = myconfirm

//注册图标组件
Object.keys(Icons).forEach((key) => {
    app.component(key, Icons[key as keyof typeof Icons])
})
//引入Pinia
import { createPinia } from 'pinia'
const pinia = createPinia()
app.use(pinia).use(router).use(Antd).mount('#app')
//按钮权限
app.directive('permission',permission)
//权限验证
import './permission'