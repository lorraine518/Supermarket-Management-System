<template>
    <div class="goodsmanage">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>商品管理</span>
            </div>
            
            <!-- 查询 -->
            <div class="goodsmanageform">
                <el-form :model="goodssearchForm" status-icon :rules="rules" ref="goodssearchForm" label-width="100px" class="demo-ruleForm" size="mini">
                     <el-form-item prop="goodsgroup">
                        <el-select v-model="goodssearchForm.goodsgroup" placeholder="选择分类" style="width:120px;">
                        <el-option label="日用品" value="日用品"></el-option>
                        <el-option label="食品" value="食品"></el-option>
                        <el-option label="全部" value="全部"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="关键字：" prop="keywords">
                        <el-input v-model.number="goodssearchForm.keywords"></el-input>
                    </el-form-item>
                    (商品名称、条形码)
                    <el-form-item>
                        <el-button type="success" @click="searchGoods">查询</el-button>
                    </el-form-item>
                </el-form>  
            </div>

            <div class="goodstable">
                <!-- 表格 -->
                <el-table
                    ref="multipleTable"
                    :data="goodsData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                    >
                    <el-table-column
                    type="selection"
                    width="55"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="goodscode"
                    label="商品条形码"
                    >

                    </el-table-column>
                    <el-table-column
                    prop="goodsname"
                    label="商品名称"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="goodsgroup"
                    label="所属分类"
                    show-overflow-tooltip>
                    </el-table-column>

                    <el-table-column
                    prop="salesprice"
                    label="售价"
                    show-overflow-tooltip>
                    </el-table-column>

                    <el-table-column
                    prop="goodsnum"
                    label="库存"
                    show-overflow-tooltip>
                    </el-table-column>

                    <el-table-column
                    prop="manage"
                    label="管理"
                    show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-button
                            @click.native.prevent="deleteGoodsData(scope.row.id)"
                            type="danger"
                            size="small">
                            移除
                            </el-button>
                            <el-button
                            @click.native.prevent="editGoodsData(scope.row.id)"
                            type="primary"
                            size="small">
                            修改
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                
                <div class="btns" style="margin-top: 20px">
                    <el-button type="danger" @click="multipleDeleteGoodsData">全部删除</el-button>
                    <el-button @click="cancleDelete">取消选择</el-button>
                </div>

                <!-- 分页 -->
                <el-pagination
                @size-change="pageSizeChange"
                @current-change="pageCurrentChange"
                :current-page="currentPage"
                :page-sizes="[3, 5, 10]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalData">
                </el-pagination>

                <!-- 模态框 -->
                <el-dialog title="修改商品信息" :visible.sync="dialogFormVisible" style="text-align:left;" width="600px">
                    <!-- 表单域 -->
                    <el-form :model="editgoodsForm" :rules="rulesEdit" ref="editgoodsForm" status-icon>

                    <el-form-item label="商品名称" label-width="120px" prop="goodsname">
                        <el-input v-model="editgoodsForm.goodsname" auto-complete="off" style="width:220px"></el-input>
                    </el-form-item>

                    <el-form-item label="商品库存" label-width="120px" prop="goodsnum">
                        <el-input v-model="editgoodsForm.goodsnum" auto-complete="off" style="width:220px"></el-input>
                    </el-form-item>

                    <el-form-item label="商品售价" label-width="120px" prop="salesprice">
                        <el-input v-model="editgoodsForm.salesprice" auto-complete="off" style="width:220px"></el-input>
                    </el-form-item>

                    <el-form-item label="商品分类" label-width="120px" prop="goodsgroup">
                        <el-select v-model="editgoodsForm.goodsgroup" placeholder="请选择商品分组">
                        <el-option label="日用品" value="日用品"></el-option>
                        <el-option label="食品" value="食品"></el-option>
                        </el-select>
                    </el-form-item>
                    </el-form>

                    <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEditData">确 定</el-button>
                    </div>
                </el-dialog>
            </div>
        </el-card>
    </div>
</template>

<script>
//引入小数验证函数
import {checkFloatNumberReg} from "@/utils/validator";
//引入整数验证函数
import {checkIntNumberReg} from "@/utils/validator";
//引入时间戳函数
import {timeStamp} from "@/utils/timeStamp"

export default {
    data(){
        //定义小数检测函数
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
        //定义整数检测函数
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
            //查询商品表单
            goodssearchForm:{
                goodsgroup:"",
                keywords:""
            },
            //修改表单数据
            editgoodsForm:{
                goodscode:"",
                goodsgroup: "",
                goodsname: "",
                goodsnum: "",
                goodsprice: "",
                salesprice: ""
            },
            //修改表单验证规则
            rulesEdit:{
                goodsgroup:[
                    {}
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
            },
            //查询表单验证规则
            rules:{

            },
            //表格渲染数据
            goodsData:[
                
            ],
            //当前页
            currentPage:1,
            //页面显示数据条数
            pageSize:5,
            //数据总条数
            totalData:5,
            //多选项数组
            multipleSelection:[],
            //选中项id数组
            selectId:[],
            //模态框显示控制
            dialogFormVisible:false,
            //待修改项id
            editId:""
        }
    },
    methods:{
        //选中项控制函数
        handleSelectionChange(val){
            this.multipleSelection = val;
            //获取id数组
            this.selectId=val.map(v => v.id);            
        },
        //页面显示数据条数改变
        pageSizeChange(val){
            this.pageSize=val;
            //请求分页数据
            this.getGoodsData();
        },
        //当前页改变
        pageCurrentChange(val){
            this.currentPage=val;
            //请求分页数据
            this.getGoodsData();
        },
        //请求分页数据
        getGoodsData(){
            //发送当前页和页面显示数量
            let params={
                pageSize:this.pageSize,
                currentPage:this.currentPage,
                //查询表单字段
                goodsgroup:this.goodssearchForm.goodsgroup,
                keywords:this.goodssearchForm.keywords
            };
            this.request.get("/goods/goodsmanage",params)
            .then(res => {
                // console.log(res);
                // 接收响应数据
                let{totalData,data}=res;
                //渲染数据到页面
                this.totalData=totalData;
                this.goodsData=data;

                // 如果当前页面所有数据都被删除，则请求上一页的数据
                if(!data.length && this.currentPage>1){
                    this.currentPage-=1;
                    //请求数据
                    this.getGoodsData();
                }

                //关键字显色
                // this.showKeywords(data);
            })
            .catch(err => {
                console.log(err);
            })
        },
        //请求查找商品
        searchGoods(){
            this.getGoodsData();
            this.showKeywords();
        },
        //关键字显色
        showKeywords(data){ //未实现功能
            //获取关键字
            let keywords=this.goodssearchForm.keywords;
            //遍历数据数组
            for(const i in data){
                if(keywords){
                    if(data[i].goodsname.includes(keywords)){
                        //拆分该数据
                        let strArr=data[i].goodsname.split(keywords);
                        data[i].goodsname=`${strArr[0]}<span style=\"color: red;\">${keywords}</span>${strArr[1]}`;
                    }

                    if(data[i].goodscode.includes(keywords)){
                        //拆分该数据
                        let strArr=data[i].goodscode.split(keywords);
                        data[i].goodscode=`${strArr[0]}<span style=\"color: red;\">${keywords}</span>${strArr[1]}`;
                    }
                }
                
            }
        },
        //请求删除数据
        deleteGoodsData(id){
            //显示弹框
            this.$confirm('此操作将永久删除该数据, 是否继续?', '温馨提醒', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            })
            .then(() => {
                //发送请求，提交id
                this.request.get("/goods/deletegoodsdata",{id})
                .then(res => {
                    //接收响应数据
                    let{code,reason}=res;
                    if(code === 0){
                        this.$message({
                            type:'success',
                            message:reason
                        });
                        //请求数据
                        this.getGoodsData();
                    }else if(code === 1){
                        this.$message({
                            type:'error',
                            message:reason
                        })
                    }else{
                        this.$message({
                            type:'error',
                            message:reason
                        })
                    }
                })
                .catch(err => {
                    console.log(err);
                })
            })
            .catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            })
        },
        //请求修改回显数据
        editGoodsData(id){
            //显示模态框
            this.dialogFormVisible=true;
            //发送请求，传入id
            this.request.get("/goods/editGoodsData",{id})
            .then(res => {
                // console.log(res);
                //接收并回显响应数据
                this.editgoodsForm=res[0];
                this.editId=res[0].id
            })
            .catch(err => {
                console.log(err);
            })
        },
        //保存修改数据
        saveEditData(){
            //验证表单
            this.$refs.editgoodsForm.validate((valid) => {
                if(valid){
                    //通过验证，发送请求
                    //收集参数
                    let params={
                        editId:this.editId,
                        goodsgroup: this.editgoodsForm.goodsgroup,
                        goodsname: this.editgoodsForm.goodsname,
                        goodsnum: this.editgoodsForm.goodsnum,
                        goodsprice: this.editgoodsForm.goodsprice,
                        salesprice: this.editgoodsForm.salesprice,
                        goodscode:this.editgoodsForm.goodscode
                    }
                    this.request.post("/goods/savegoodsedit",params)
                    .then(res => {
                        // console.log(res);
                        let{code,reason}=res;
                        if(code === 0){
                            this.$message({
                                type:'success',
                                message:reason
                            });
                            //请求数据
                            this.getGoodsData();
                        }else{
                            this.$message({
                                type:'error',
                                message:reason
                            })
                        };
                        //关闭模态框
                        this.dialogFormVisible=false;
                        //请求数据
                        this.getGoodsData();
                    })
                    .catch(err => {
                        console.log(err);
                    })
                }
            })
        },
        //请求批量删除数据
        multipleDeleteGoodsData(){
            //判断是否有选中项
            if(this.selectId.length){
                //显示确认弹框
                this.$confirm('此操作将永久删除数据, 是否继续?', '温馨提醒', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                })
                .then(() => {
                    //发送请求提交id数组
                    this.request.get("/goods/multipledeletedata",{selectId:this.selectId})  
                    .then(res => {
                        // console.log(res);
                        //接收响应数据
                        let{code,reason}=res;
                        if(code === 0){
                            this.$message({
                                type:'success',
                                message:reason
                            });
                            this.getGoodsData();
                        }else{
                            this.$message({
                                type:'error',
                                message:reason
                            })
                        }
                    })       
                    .catch(err => {
                        console.log(err);
                    })
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                })
            }else{
                //提示信息
                this.$message({
                    type:'error',
                    message:"请选择要删除的数据！"
                })
                return;
            }
        },
        //取消全选
        cancleDelete(){
            this.$refs.multipleTable.clearSelection();
        }
    },
    //created钩子函数发送请求
    created(){
        this.getGoodsData();
    }
}
</script>

<style lang="less">
@import url("./goodsmanage.less");
</style>


