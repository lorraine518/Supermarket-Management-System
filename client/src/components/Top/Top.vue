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
                <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    {{currentUser}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="personal">个人中心</el-dropdown-item>
                    <el-dropdown-item command="logout">退出登录</el-dropdown-item>
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
            //当前登录用户
            currentUser:""
        }
    },
    methods:{
        handleCommand(command){
            if(command === "personal"){

            }else if(command === "logout"){
                //点击退出登录清除local中的token，跳转到登陆页面
                this.local.remove("z_l_y_p_s_2019");
                this.$router.push("/login");
            }
        }
    },
    //created钩子函数中发送请求获得当前登录用户
    created(){
        this.request.get("/login/currentaccount")
        .then(res => {
            // console.log(res);
            //获取响应数据
            let{account}=res;
            this.currentUser=account;
        })
        .catch(err => {
            console.log(err);
        })
    }
}
</script>

<style lang="less">
@import url("./Top.less");
</style>


