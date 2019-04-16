<template>
    <div class="home">
        <el-container>
            <el-aside width="200px">
                <leftnav></leftnav>
            </el-aside>
            <el-container>
                <el-header>
                    <Top ref="top"></Top>
                </el-header>
                <el-main>
                    <!-- 路由出口 -->
                    <router-view @getavatar="getUserAvatar"></router-view>
                </el-main>
                <el-footer>
                    <Bottom></Bottom>
                </el-footer>
            </el-container>
        </el-container>
        
    </div>
</template>

<script>
//引入导航组件
import leftnav from "@/components/LeftNav/LeftNav.vue"
//引入头部组件
import Top from "@/components/Top/Top.vue"
//引入底部组件
import Bottom from "@/components/Bottom/Bottom.vue"

export default {
    //注册组件
    components:{
        leftnav,
        Top,
        Bottom
    },
    methods:{
        getUserAvatar(){
            //调用顶部组件方法
            this.$refs.top.getUserInfo();
        }
    }
}
</script>

<style lang="less">
@import url("./home.less");
</style>


