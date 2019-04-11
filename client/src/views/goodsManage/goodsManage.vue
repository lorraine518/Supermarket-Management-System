<template>
    <div class="goodsmanage">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>商品管理</span>
            </div>

            <div class="goodsmanageform">
                <el-form :model="goodssearchForm" status-icon :rules="rules" ref="goodssearchForm" label-width="100px" class="demo-ruleForm">
                     <el-form-item prop="goodsgroup">
                        <el-select v-model="goodssearchForm.goodsgroup" placeholder="选择分类" style="width:120px;">
                        <el-option label="日用品" value="日用品"></el-option>
                        <el-option label="食品" value="食品"></el-option>
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
                    style="width: 100%">
                    <el-table-column
                    type="selection"
                    width="55">
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
                    prop="goodsprice"
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
                            @click.native.prevent="deleteRow(scope.$index, goodsData)"
                            type="danger"
                            size="small">
                            移除
                            </el-button>
                            <el-button
                            @click.native.prevent="deleteRow(scope.$index, goodsData)"
                            type="primary"
                            size="small">
                            修改
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="btns" style="margin-top: 20px">
                    <el-button type="danger">全部删除</el-button>
                    <el-button >取消选择</el-button>
                </div>

                <!-- 分页 -->
                <el-pagination
                :current-page="currentPage"
                :page-sizes="[3, 5, 10]"
                :page-size="5"
                layout="total, sizes, prev, pager, next, jumper"
                :total="25">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data(){
        return {
            goodssearchForm:{
                goodsgroup:"",
                keywords:""
            },
            rules:{
                goodsgroup:[
                    {}
                ],
                keywords:[
                    {required:true,message:"请输入关键字"}
                ]
            },
            goodsData:[
                
            ],
            currentPage:1
        }
    },
    methods:{
        searchGoods(){
            //收集数据
            let params={
                goodsgroup:this.goodssearchForm.goodsgroup,
                keywords:this.goodssearchForm.keywords
            }
            // console.log(params);
            //跳转页面
            this.$router.push("/home/goodsmanage");
        }
    },
    //created钩子函数发送请求
    created(){
        this.request.get("/goods/goodsmanage")
        .then(res => {
            console.log(res);
            this.goodsData=res;
        })
        .catch(err => {
            console.log(err);
        })
    }
}
</script>

<style lang="less">
@import url("./goodsmanage.less");
</style>


