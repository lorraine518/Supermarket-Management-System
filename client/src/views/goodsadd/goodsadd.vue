<template>
    <div class="goodsadd">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>添加商品</span>
            </div>

            <div class="goodsmanageform">
                <el-form :model="goodsaddForm" status-icon :rules="rules" ref="goodsaddForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="所属分类" prop="goodsgroup">
                        <el-select v-model="goodsaddForm.goodsgroup" placeholder="请选择分类">
                        <el-option label="日用品" value="日用品"></el-option>
                        <el-option label="食品" value="食品"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="商品条形码" prop="goodscode">
                        <el-input v-model.number="goodsaddForm.goodscode" disabled=""></el-input>
                        <el-button type="success" @click="getTimeStamp">生成条形码</el-button>
                    </el-form-item>

                    <el-form-item label="商品名称" prop="goodsname">
                        <el-input v-model="goodsaddForm.goodsname" auto-complete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="商品售价" prop="goodsprice">
                        <el-input v-model="goodsaddForm.goodsprice" auto-complete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="市场价" prop="salesprice">
                        <el-input v-model="goodsaddForm.salesprice" auto-complete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="入库数量" prop="goodsnum">
                        <el-input v-model="goodsaddForm.goodsnum" auto-complete="off"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="submitForm">提交</el-button>
                        <el-button @click="resetForm">重置</el-button>
                    </el-form-item>
                </el-form>  
            </div>
        </el-card>
    </div>
</template>

<script>
//引入随机条形码工具函数
import {randomCode} from "@/utils/randomcode"
//引入小数验证函数
import {checkFloatNumberReg} from "@/utils/validator";
//引入整数验证函数
import {checkIntNumberReg} from "@/utils/validator";
//引入时间戳函数
import {timeStamp} from "@/utils/timeStamp"

export default {
    data(){
        const checkFloatNum= (rule,value,callback) => {
            if (value === "") {
                return callback(new Error("请输入商品价格"));
            }else if (!checkFloatNumberReg(value)) {
                return callback(
                new Error("请输入数字")
                )
            }else {
                callback();
            }
        }
        const checkIntNum= (rule,value,callback) => {
            if (value === "") {
                return callback(new Error("请输入商品数量"));
            }else if (!checkIntNumberReg(value)) {
                return callback(
                new Error("请输入整数数字")
                )
            }else {
                callback();
            }
        }
        return {
            goodsaddForm:{
                goodsgroup:"",
                goodscode:"",
                goodsname:"",
                goodsprice:"",
                salesprice:"",
                goodsnum:""
            },
            rules:{
                goodsgroup:[
                    {required:true,message:"请选择商品分类"}
                ],
                goodscode:[
                    {required:true,message:"请生成条形码"}
                ],
                goodsname:[
                    {required:true,message:"请输入商品名称"} 
                ],
                goodsprice:[
                    {required:true,validator:checkFloatNum}
                ],
                salesprice:[
                    {required:true,validator:checkFloatNum}
                ],
                goodsnum:[
                    {required:true,validator:checkIntNum}
                ]
            }
        }
    },
    methods:{
        submitForm() {
            //触发验证
            this.$refs.goodsaddForm.validate(valid => {
                if (valid) {
                //收集数据
                let params = {
                    goodsgroup: this.goodsaddForm.goodsgroup,
                    goodscode: this.goodsaddForm.goodscode,
                    goodsname:this.goodsaddForm.goodsname,
                    goodsprice:this.goodsaddForm.goodsprice,
                    salesprice:this.goodsaddForm.salesprice,
                    goodsnum:this.goodsaddForm.goodsnum
                };
                // console.log(params);
                //将数据提交给后台
                this.request.post("/goods/goodsadd",params)
                .then(res => {
                    // console.log(res);
                    //接收响应数据
                    let {code,reason}=res;
                    if(code === 0){
                        this.$message({
                            showClose: true,
                            message: reason,
                            type: 'success'
                        });
                    }else{
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
                //页面跳转
                this.$router.push("/home/goodsmanage");
                } else {
                console.log("验证失败！");
                return;
                }
            });
        },
        resetForm() {
            this.$refs.goodsaddForm.resetFields();
        },
        //获取随机条形码
        getRandomCode(){
            this.goodsaddForm.goodscode=randomCode();
        },
        //获取时间戳
        getTimeStamp(){
            this.goodsaddForm.goodscode=timeStamp();
        }
    }
}
</script>

<style lang="less">
@import url("./goodsadd.less");
</style>


