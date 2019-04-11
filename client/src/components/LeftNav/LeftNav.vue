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
export default {
    data(){
        return {
            //菜单数据
            menus:[
                //系统管理
                {
                    iconClass:"el-icon-setting",
                    title:"系统管理",
                    children:[
                        {path:"/home/systeminfo",subTitle:"系统信息"}
                    ]
                },
                //账号管理
                {
                    iconClass:"el-icon-star-on",
                    title:"账号管理",
                    children:[
                        {path:"/home/accountmanage",subTitle:"账号管理"},
                        {path:"/home/accountadd",subTitle:"添加账号"},
                        {path:"/home/passwordmodify",subTitle:"密码修改"}
                    ]
                },
                //商品管理
                {
                    iconClass:"el-icon-goods",
                    title:"商品管理",
                    children:[
                        {path:"/home/goodsmanage",subTitle:"商品管理"},
                        {path:"/home/goodsadd",subTitle:"添加商品"}
                    ]
                },
                //统计管理
                {
                    iconClass:"el-icon-tickets",
                    title:"统计管理",
                    children:[
                        {path:"/home/salestotal",subTitle:"销售统计"},
                        {path:"/home/stocktotal",subTitle:"进货统计"}
                    ]
                },
                //进货管理
                {
                    iconClass:"el-icon-tickets",
                    title:"进货管理",
                    children:[
                        {path:"/home/stockmanage",subTitle:"库存管理"},
                        {path:"/home/stockadd",subTitle:"添加库存"}
                    ]
                }
            ]
        }
    }
}
</script>

<style lang="less"> 
@import url("./LeftNav.less");
</style>


