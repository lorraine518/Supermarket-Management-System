import Vue from 'vue' //引入vue
import App from './App.vue' //引入顶部组件
import router from './router' //引入路由
import request from "./utils/request" //引入封装后的axios
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//引入公用样式
import "./assets/css/base.css"
//引入localStorage方法
import local from "./utils/localStorage"

Vue.config.productionTip = false  //生产环境中不产生提示
Vue.prototype.request=request;  //将封装后的axios挂载在Vue原型上
Vue.prototype.local=local;

Vue.use(ElementUI);

//使用路由守卫拦截路由
router.beforeEach((to,from,next) => {
  //获取local中的token
  const token=local.get("z_l_y_p_s_2019");
  if(token){
    //通过验证则不再拦截
    next();
  }else{
    if(to.path === "/login"){
      next();
    }else{
      //跳转登录界面
      next("/login");
    }
  }
})

new Vue({
  router, //注册路由 等价router:router
  render: h => h(App)   //在底层调用createElement方法创建节点
}).$mount('#app') //挂载实例对象 等价el:"#app"
