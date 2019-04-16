<template>
    <div class="left-nav">
         <el-menu
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            background-color="rgb(48, 65, 86)"
            text-color="#fff"
            active-text-color="rgb(64, 158, 255)"
            unique-opened
            router
            >
            <el-submenu :index="index+1+''" v-for="(menu,index) in menus" :key="index">
                <template slot="title">
                <i :class="menu.iconClass"></i>
                <span>{{menu.title}}</span>
                </template>
                <el-menu-item :index="subMenu.path" v-for="(subMenu,i) in menu.children" :key="i">{{subMenu.subTitle}}</el-menu-item>
            </el-submenu>
            
        </el-menu>
    </div>
</template>

<script>
import {getCurrentUserInfo,getUserMenu} from "@/api/requestApi";
export default {
    data(){
        return {
            //菜单数据
            menus:[]
        }
    },
    created(){
        this.getUserAccess();
    },
    methods:{
        //请求获取当前用户显示菜单
        getUserAccess(){
            //获取用户身份信息
            let userGroup=this.local.get("user_access");
            //发送请求获取导航列表
            getUserMenu({userGroup})
            .then(res => {
                console.log(res);
                this.menus=res;
            })
            .catch(err => {
                console.log(res);
            })
        }
    }
}
</script>

<style lang="less"> 
@import url("./LeftNav.less");
</style>


