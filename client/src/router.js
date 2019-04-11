import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    //根目录重定向
    {
      path:"/",
      redirect:"/login"
    },
    //登录组件
    {
      path:"/login",
      component:() => import("./views/login/login.vue")
    },
    //后台主界面
    {
      path:"/home",
      component:() => import("./views/home/home.vue"),
      //重定向
      redirect:"/home/systeminfo",
      children:[
        //账号添加
        {
          path:"/home/accountadd",
          component:() => import("./views/accountadd/accountadd.vue")
        },
        //账号管理
        {
          path:"/home/accountmanage",
          component:() => import("./views/accountManage/accountManage.vue")
        },
        //商品添加
        {
          path:"/home/goodsadd",
          component:() => import("./views/goodsadd/goodsadd.vue")
        },
        //商品管理
        {
          path:"/home/goodsmanage",
          component:() => import("./views/goodsManage/goodsManage.vue")
        },
        //修改密码
        {
          path:"/home/passwordmodify",
          component:() => import("./views/passwordModify/passwordModify.vue")
        },
        //销售统计
        {
          path:"/home/salestotal",
          component:() => import("./views/salesTotal/salesTotal.vue")
        },
        //进货统计
        {
          path:"/home/stocktotal",
          component:() => import("./views/stockTotal/stockTotal.vue")
        },
        //系统信息
        {
          path:"/home/systeminfo",
          component:() => import("./views/systemInfo/systemInfo.vue")
        },
        //进货管理
        {
          path:"/home/stockmanage",
          component:() => import("./views/stockManage/stockManage.vue")
        },
        //添加进货
        {
          path:"/home/stockadd",
          component:() => import("./views/stockManage/stockManage.vue")
        }
      ]
    }
  ]
})
