<template>
    <div class="top">
        <el-row :gutter="20">
        <el-col :span="20"><div class="grid-content bg-purple">
            <h2 class="title">
                <i class="el-icon-menu"></i>
                华联超市管理系统</h2>
        </div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple">
            <el-row :gutter="20">
            <el-col :span="4"><div class="grid-content bg-purple">
                <!-- 用户头像 -->
                <div class="avatar">
                    <img src="./smile.jpg" alt="">
                </div>
            </div></el-col>
            <el-col :span="20"><div class="grid-content bg-purple">
                <!-- 用户名 -->
                <el-dropdown>
                <span class="el-dropdown-link">
                    Malkuth<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="a">我的账户</el-dropdown-item>
                    <el-dropdown-item command="b">退出系统</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>                  
            </div></el-col>
            </el-row>
        </div></el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    methods:{
        
    }
}
</script>

<style lang="less">
@import url("./Top.less");
</style>


