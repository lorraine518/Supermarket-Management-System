<template>
    <div class="passwordmodify">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>修改密码</span>
            </div>
          <el-form :model="passwordmodifyForm" status-icon :rules="rules" ref="passwordmodifyForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="密码" prop="password">
                <el-input v-model.number="passwordmodifyForm.password" type="password"></el-input>
            </el-form-item>

            <el-form-item label="新密码" prop="newPassword">
                <el-input type="password" v-model="passwordmodifyForm.newPassword" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="确认新密码" prop="confirmNewPassword">
                <el-input type="password" v-model="passwordmodifyForm.confirmNewPassword" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('passwordmodifyForm')">修改</el-button>
            </el-form-item>
          </el-form>  

        </el-card>
    </div>
</template>

<script>
//引入正则验证函数
import {checkReg} from "@/utils/validator"
console.log(checkReg);

export default {
    data(){
        const newPasswordCheck=(rule,value,callback) => {
            if(value === ""){
                return callback(new Error("请输入新的密码"));
            }else if(!checkReg(value)){
                return callback(new Error("以字母开头，长度在3~6之间，只能包含字符、数字和下划线")); 
            }else{
                if(this.passwordmodifyForm.confirmNewPassword !==""){
                    this.$refs.passwordmodifyForm.validateField("confirmNewPassword")
                }
                callback();
            }
        };
        const confirmNewPassword=(rule,value,callback) => {
            if(value === ""){
                return callback(new Error("请再次输入新的密码"));
            }else if(value !== this.passwordmodifyForm.newPassword){
                return callback(new Error("两次输入的新密码必须一致"));                
            }else{
                callback();
            }
        }
        return {
            passwordmodifyForm:{
                password:"",
                newPassword:"",
                confirmNewPassword:""
            },
            rules:{
                password:[
                    {required:true, message:"请输入密码"}
                ],
                newPassword:[
                    {required:true,validator:newPasswordCheck}
                ],
                confirmNewPassword:[
                    {required:true,validator:confirmNewPassword}
                ]
            }
        }
    },
    methods:{
        submitForm(){
            //触发验证
            this.$refs.passwordmodifyForm.validate(valid => {
                if(valid){
                    //收集数据
                    let params={
                        password:this.passwordmodifyForm.password,
                        newPassword:this.passwordmodifyForm.newPassword
                    };
                    //页面跳转
                    this.$router.push("/home");
                }else{
                    console.log("验证失败");
                    return;
                }
            });
        },

    }
}
</script>

<style lang="less">
@import url("./passwordmodify.less");
</style>


