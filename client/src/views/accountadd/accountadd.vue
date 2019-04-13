<template>
    <div class="accountadd">
      <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>添加管理员账号</span>
            </div>
          <el-form :model="accountaddForm" status-icon :rules="rules" ref="accountaddForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="账户" prop="account">
                <el-input v-model.number="accountaddForm.account"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="accountaddForm.password" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="确认密码" prop="confirmpassword">
                <el-input type="password" v-model="accountaddForm.confirmpassword" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="选择用户组" prop="usergroup">
                <el-select v-model="accountaddForm.usergroup" placeholder="请选择用户组">
                <el-option label="部门干员" value="部门干员"></el-option>
                <el-option label="主管" value="主管"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('accountaddForm')">提交</el-button>
                <el-button @click="resetForm('accountaddForm')">重置</el-button>
            </el-form-item>
          </el-form>  

        </el-card>
        
    </div>
</template>

<script>
//引入正则验证函数
import {checkReg} from "@/utils/validator";

//引入请求函数
import {accountaddRequest} from "@/api/requestApi"
// console.log(accountaddRequest);


export default {
  data() {
    //自定义校验规则
    //验证密码合法
    const confirmpassword = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("确认密码不能为空"));
      }
      if (!(value === this.accountaddForm.password)) {
        return callback(new Error("请保持两次输入的密码相同"));
      } else {
        callback();
      }
    };
    //验证确认密码
    const checkpassword = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入密码"));
      } else if (!checkReg(value)) {
        return callback(
          new Error("以字母开头，长度在3~6之间，只能包含字符、数字和下划线")
        );
      } else {
        if (this.accountaddForm.confirmpassword !== "") {
          //触发确认密码验证
          this.$refs.accountaddForm.validateField("confirmpassword");
        }
        callback();
      }
    };
    //验证账户名
    const checkAccount = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入账户名"));
      } else if (value.length<3 || value.length>6) {
        return callback(
          new Error("账户名长度在3~6之间")
        );
      } else{
        //请求验证账户名是否存在
        this.checkAccountExist(callback);
      }
    };
    return {
      accountaddForm: {
        account: "",
        password: "",
        confirmpassword: "",
        usergroup: ""
      },
      rules: {
        account: [
          { required: true,validator:checkAccount}
        ],
        password: [
          { required: true, validator: checkpassword, trigger: "blur" }
        ],
        confirmpassword: [
          { required: true, validator: confirmpassword, trigger: "blur" }
        ],
        usergroup: [
          { required: true, message: "请选择用户组", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      //触发验证
      this.$refs.accountaddForm.validate(valid => {
        if (valid) {
          //收集数据
          let params = {
            account: this.accountaddForm.account,
            password: this.accountaddForm.password,
            usergroup:this.accountaddForm.usergroup
          };
          //发送post请求
          this.request.post("/account/accountadd",params)
          .then(res => {
            //接收响应数据
            let{code,reason}=res;
            //判断返回code
            if(code === 0){
              this.$message({
                showClose: true,
                message: reason,
                type: 'success'
              });
              //页面跳转
              this.$router.push("/home/accountmanage");
            }else if(code === 1){
              this.$message({
                showClose: true,
                message: reason,
                type: 'error'
              });
            }
          })
          .catch(err => {
            console.log(err);
          })

        } else {
          console.log("验证失败！");
          return;
        }
      });
    },
    resetForm() {
      this.$refs.accountaddForm.resetFields();
    },
    //请求验证用户名是否存在
    checkAccountExist(callback){
      //发送请求
      this.request.get("/account/checkaccountexist",{account:this.accountaddForm.account})
      .then(res => {
        // console.log(res);
        //接收参数
        let{code,reason}=res;
        if(code === 0){
          callback();
        }else{
          return callback(
            new Error(reason)
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
    }
  }
};
</script>

<style lang="less">
@import url("./accountadd.less");
</style>


