<template>
    <div class="login">
        <h2 class="title">
            <span class="el-icon-menu"></span>
            超市后台管理系统</h2>
        <div class="loginform">
            <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="账户" prop="account">
                    <el-input v-model.number="loginForm.account"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="loginForm.password" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="确认密码" prop="confirmpassword">
                    <el-input type="password" v-model="loginForm.confirmpassword" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
                    <el-button @click="resetForm('loginForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        
    </div>
</template>

<script>
import { checkReg } from "@/utils/validator";

export default {
  data() {
    //自定义校验规则
    const confirmpassword = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("确认密码不能为空"));
      }
      if (!(value === this.loginForm.password)) {
        return callback(new Error("请保持两次输入的密码相同"));
      } else {
        callback();
      }
    };
    const checkpassword = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入密码"));
      } else if (!checkReg(value)) {
        return callback(
          new Error("以字母开头，长度在3~6之间，只能包含字符、数字和下划线")
        );
      } else {
        if (this.loginForm.confirmpassword !== "") {
          //触发确认密码验证
          this.$refs.loginForm.validateField("confirmpassword");
        }
        callback();
      }
    };
    return {
      loginForm: {
        account: "",
        password: "",
        confirmpassword: ""
      },
      rules: {
        account: [
          { required: true, message: "请输入账户名", trigger: "blur" },
          {
            min: 3,
            max: 8,
            message: "请输入长度在3~8之间的账户名",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, validator: checkpassword, trigger: "blur" }
        ],
        confirmpassword: [
          { required: true, validator: confirmpassword, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm() {
        //触发验证
        this.$refs.loginForm.validate((valid) => {
            if(valid){
                //收集数据
                let params={
                    account: this.loginForm.account,
                    password: this.loginForm.password,
                    confirmpassword: this.loginForm.confirmpassword
                }
                console.log(params);
                //页面跳转
                this.$router.push("/home");
            }else{
                console.log("验证失败！");
                return;
            }
        })
    },
    resetForm() {
        this.$refs.loginForm.resetFields();
    }
  }
};
</script>

<style lang="less">
@import url("./login.less");
</style>


