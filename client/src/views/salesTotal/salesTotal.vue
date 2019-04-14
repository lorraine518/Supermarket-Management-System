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

            <div class="saleschart" style="height:300px">

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
                startDate:this.searchDate[0],
                endDate:this.searchDate[1]
            }
            console.log(params);    //参数为开始时间与结束时间的数组
        },
        //生成统计图表
        getTotalChart(categoryData=[],value=[]){
            //初始化容器
            const chartContainer=this.echarts.init(document.querySelector(".saleschart"));
            //准备配置
            let option = {
                tooltip: {
                    show: true
                },
                legend: {
                    data:['销量']
                },
                xAxis : [
                    {
                        type : 'category',
                        data : ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月"]
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        "name":"销量",
                        "type":"line",
                        "data":[100,120,45,324,145,80,55,220,256,34]
                    }
                ]
            }
            //生成图表
            chartContainer.setOption(option);
        }
    },
    mounted(){
        //请求数据

        this.getTotalChart();
    }
}
</script>

<style lang="less">
@import url("./salesTotal.less");
</style>


