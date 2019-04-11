import Vue from 'vue' //引入vue
import App from './App.vue' //引入顶部组件
import router from './router' //引入路由
import request from "./utils/request" //引入axios
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//引入公用样式
import "./assets/css/base.css"

Vue.config.productionTip = false  //生产环境中不产生提示
Vue.prototype.request=request;  //将axios挂载在Vue原型上

Vue.use(ElementUI);

new Vue({
  router, //注册路由 等价router:router
  render: h => h(App)   //在底层调用createElement方法创建节点
}).$mount('#app') //挂载实例对象 等价el:"#app"
