<template>
    <div class="systeminfo">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>系统信息</span>
            </div>

            <el-alert
                title="商品总数：5。已经销售的总金额：890.00。库存商品总价：1235.82。"
                type="info"
                show-icon>
            </el-alert>
            <el-alert
                title="导入数据"
                type="success"
                show-icon>
            </el-alert>
            <div class="subcard">
                <el-row>
                <el-col :span="12"><div class="grid-content bg-purple">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>销售排行</span>
                        </div>
                        <el-table
                        :data="salesData"
                        style="width: 100%">
                        
                        <el-table-column
                            prop="goodsname"
                            label="商品名称"
                        >
                        </el-table-column>

                        <el-table-column
                            prop="salesnum"
                            label="销量">
                        </el-table-column>
                        </el-table>
                    </el-card>
                </div></el-col>

                <el-col :span="12"><div class="grid-content bg-purple-light">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>缺货的商品</span>
                        </div>
                        <el-table
                        :data="soldoutData"
                        style="width: 100%">
                        <el-table-column
                            prop="goodsname"
                            label="商品名称"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="havenum"
                            label="库存"
                            >
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button type="text">入库</el-button>
                            </template>
                        </el-table-column>

                        </el-table>
                    </el-card>
                </div></el-col>
                </el-row>
            </div>

        </el-card>
    </div>
</template>

<script>
export default {
    data(){
        return {
            salesData:[
                {goodsname:"洗发水",salesnum:"5"},
                {goodsname:"茅台酒",salesnum:"7"}
            ],
            soldoutData:[
                {goodsname:"洗发水",havenum:"5"},
                {goodsname:"茅台酒",havenum:"7"}                
            ]
        }
    }
}
</script>

<style lang="less">
    @import url("./systemInfo.less");
</style>


