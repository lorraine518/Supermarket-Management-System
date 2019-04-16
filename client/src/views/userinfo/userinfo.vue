<template>
    <div class="userinfo">
     <!-- 面板组件 -->
       <el-card class="box-card">
            <!-- 头部 -->
            <div slot="header" class="clearfix">
                <span>个人中心</span>
            </div>
            <!-- 内容 -->
            <div class="text item">
                <!-- 头像 -->
                <div>
                    <el-upload
                        class="avatar-uploader"
                        action=""
                        :http-request="uploadAvatar"
                        :show-file-list="false"
                        :before-upload="beforeAvatarUpload">
                        <!-- 图像 -->
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <!-- 图标 -->
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>

                </div>
               <!-- 用户信息 -->
                <div style="margin-top: 20px;">
                    <p>ID: {{ userinfo.id }}</p>
                    <p>账号：{{ userinfo.account }} </p>
                    <p>用户组： {{ userinfo.user_group }}</p>
                    <p>创建时间： {{ userinfo.create_date | filterDate }}</p>
                </div>

            </div>
        </el-card>
    </div>
</template>

<script>
import moment from "moment";
import axios from "axios";
//引入请求用户信息api
import{getCurrentUserInfo} from "@/api/requestApi"

export default {
    data(){
        return {
            userinfo:{},
            imageUrl:''
        }
    },
    methods:{
        //上传图片函数
        uploadAvatar(file){
            //创建formdata保存图片信息
            let formData=new FormData();
            formData.append("imgfile",file.file);

            //只能使用axios发送post请求，并修改contenttype信息
            axios.post("/account/uploadavatar",formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => {
                // console.log(res.data);
                let{code,message,path}=res.data;
                path="http://127.0.0.1:666"+path;
                if(code === 0){
                    this.$message({
                        type:"success",
                        message
                    });
                    //回显头像图片
                    this.imageUrl=path;
                    //触发父组件事件
                    this.$emit("getavatar");
                    
                }else{
                     this.$message({
                        type:"error",
                        message
                    })
                }
            })
            .catch(err => {
                console.log(err);
            })
        },
        //获取用户信息
        getUserInfo(){
            getCurrentUserInfo()
            .then(res => {
                // console.log(res);
                //获取用户信息
                this.userinfo=res;
            })
            .catch(err => {
                console.log(err);
            })
        },
        //上传图片前回调函数
        beforeAvatarUpload(file){
            //发送请求前检测图片格式大小
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }
    },
    created(){
        //获取用户信息
        this.getUserInfo();
    },
    filters:{
        filterDate(val){
            return moment(val).format("YYYY-MM-DD HH:mm:ss");
        }
    }
}
</script>


<style lang="less">
.userinfo {
    // 面板组件
    .el-card {
        text-align: left;
        // 面板头
        .el-card__header {
            font-size: 20px;
            font-weight: bold;
            background-color: #f1f1f1;
        }
        // 面板身体
        .el-card__body {
            .avatar-uploader .el-upload {
                border: 1px dashed #d9d9d9;
                border-radius: 6px;
                cursor: pointer;
                position: relative;
                overflow: hidden;
            }
            .avatar-uploader .el-upload:hover {
                border-color: #409EFF;
            }
            .avatar-uploader-icon {
                font-size: 28px;
                color: #8c939d;
                width: 178px;
                height: 178px;
                line-height: 178px;
                text-align: center;
            }
            .avatar {
                width: 178px;
                height: 178px;
                display: block;
            }
        }
    }
}
</style>
