<template>
    <div class="salestotal">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>销售数据统计</span>
            </div>

            <div class="salestotalform">
                <el-date-picker
                v-model="searchDate"
                type="datetimerange"
                :picker-options="pickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right">
                </el-date-picker>
                <el-button type='success' @click='submitForm'>提交</el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data(){
        return {
            pickerOptions:{
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                    }
                }]
            },
            searchDate:""
        }
    },
    methods:{
        submitForm(){
            //获取参数
            let params={
                searchDate:this.searchDate
            }
            console.log(params);    //参数为开始时间与结束时间的数组
            
        }
    }
}
</script>

<style lang="less">
@import url("./salesTotal.less");
</style>


