<template>
    <div class="accountmanage">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>账号管理</span>
            </div>
            <!-- 表格 -->
            <el-table
                ref="multipleTable"
                :data="tableData"
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
                label="日期"
                >
                <template slot-scope="scope">{{ scope.row.create_date | filterTime }}</template>
                </el-table-column>
                <el-table-column
                prop="account"
                label="用户名"
                >
                </el-table-column>
                <el-table-column
                prop="user_group"
                label="用户分组"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                prop="manage"
                label="管理"
                show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-button
                        @click.native.prevent="deleteData(scope.$index, tableData)"
                        type="danger"
                        size="small">
                        移除
                        </el-button>
                        <el-button
                        @click.native.prevent="editData(scope.row.id)"
                        type="primary"
                        size="small">
                        修改
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="btns" style="margin-top: 20px">
                <el-button type="danger" @click=multipleDelete>批量删除</el-button>
                <el-button @click="cancleSelect">取消选择</el-button>
            </div>

            <!-- 分页 -->
            <el-pagination
            @size-change="pageSizeChange"
            @current-change="pageCurrentChange"
            :current-page="currentPage"
            :page-sizes="[3, 5, 10]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalPage">
            </el-pagination>

            <el-dialog title="修改账户" :visible.sync="dialogFormVisible" style="text-align:left;" width="600px">
            <el-form :model="editaccountForm" :rules="rules" ref="editaccountForm" status-icon>

              <el-form-item label="用户名" label-width="120px" prop="account">
                <el-input v-model="editaccountForm.account" auto-complete="off" style="width:220px"></el-input>
              </el-form-item>

              <el-form-item label="用户分组" label-width="120px" prop="usergroup">
                <el-select v-model="editaccountForm.user_group" placeholder="请选择用户分组">
                  <el-option label="主管" value="主管"></el-option>
                  <el-option label="部门干员" value="部门干员"></el-option>
                </el-select>
              </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="saveEditData">确 定</el-button>
            </div>
          </el-dialog>
        </el-card>
    </div>
</template>

<script>
//引入时间格式化函数
import { filterDate } from "@/utils/filterDate";
//引入moment
import moment from "moment";
import { longStackSupport } from 'q';

export default {
  data() {
    //定义修改用户名重名验证函数
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
      tableData: [
      ],
      currentPage:1,
      pageSize:5,
      multipleSelection: [],
      editaccountForm:{
      },
      dialogFormVisible:false,
      totalPage:5,
      //修改表单验证
      rules:{
        account:[
          { required: true, validator:checkAccount}
        ],
        usergroup:[]
      },
      editId:"",
      //选中项ID数组
      selectId:[]
    };
  },
  methods: {
    //切换每页显示数量函数
    pageSizeChange(val){
      this.pageSize=val;
      //调用请求数据函数
      this.getDataList();
    },
    //切换当前页函数
    pageCurrentChange(val){
      this.currentPage=val;
      //调用请求数据函数
      this.getDataList();
    },
    //封装请求数据列表函数（分页模式）
    getDataList(){
      let params={
        pageSize:this.pageSize,
        currentPage:this.currentPage
      }
      //发送当前页和每页数据条数给后端
      this.request.get("/account/accountmanage",params)
      .then(res => {

        //接收数据
        let {total,data}=res;
        
        //判断当前页面数据是否全部被删除
        if(!data.length && this.currentPage>1){
          //切换到上一页
          this.currentPage-=1;
          this.getDataList();
        }
        //修改页面数据
        this.totalPage=total;
        this.tableData=data;
      })
      .catch(err => {
        console.log(err);
      })
    },
    //请求删除数据函数
    deleteData(index, data){
      // console.log(data[index]);
      //添加弹窗提示
      this.$confirm('此操作将永久删除该账户, 是否继续?', '温馨提醒', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
           //发送请求
          this.request.post("/account/accountdel",{
            id:data[index].id
          })
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
              
              //请求列表数据
              this.getDataList();

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
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        })
    },

    //请求修改回填函数
    editData(id){
      //显示弹框
      this.dialogFormVisible=true;
      // 将id值保存在data中
      this.editId=id;
 
      //发送获取回填信息请求
      this.request.get("/account/accountedit",{id})
      .then(res => {
        this.editaccountForm=res[0];
      })
      .catch(err => {
        console.log(err);        
      })
    },

    //提交修改函数
    saveEditData(){
      //表单验证
      this.$refs.editaccountForm.validate(valid => {
        if(valid){
          //获取修改后的数据和id
          let params={
            id:this.editId,
            account:this.editaccountForm.account,
            userGroup:this.editaccountForm.user_group
          }
          //发送请求
          this.request.post("/account/saveaccountedit",params)
          .then(res => {
            //接收响应数据
            let {code,reason}=res;
            if(code === 0){
              this.$message({
                message: reason,
                type: 'success'
              });
              //请求数据
              this.getDataList();
            }else if(code === 1){
              this.$message({
                message: reason,
                type: 'error'
              })
            }
          })
          .catch(err => {
            console.log(err);
          });

          //隐藏修改模态框
          this.dialogFormVisible=false;
        }else{
          return;
        }
      })
    },

    //选中控制函数
    handleSelectionChange(val){
      this.multipleSelection = val;
      //遍历获取id数组
      this.selectId=val.map(v => v.id);
    },

    //批量删除函数
    multipleDelete(){
      //判断是否有选中项
      if(!this.selectId.length){
        this.$message({
          showClose: true,
          message: "请选择要删除的数据！",
          type: 'error'
        });
        return;
      }else{
        //弹出提示
        this.$confirm('此操作将永久删除该账户, 是否继续?', '温馨提醒', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          //发送请求，传入id数组
          this.request.get("/account/multipledelete",{selectId:this.selectId})
          .then(res => {
            let{code,reason}=res;
            if(code === 0){
              this.$message({
                showClose: true,
                message: reason,
                type: 'success'
              });
              
              //请求列表数据
              this.getDataList();

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
        })
        .catch(() => {
          this.$message({
              type: 'info',
              message: '已取消删除'
          });
        })
      }
      
    },
    //取消选择函数
    cancleSelect(){
      this.$refs.multipleTable.clearSelection();
    },
    //请求验证用户名是否存在
    checkAccountExist(callback){
      //发送请求
      this.request.get("/account/checkeditaccountexist",{account:this.editaccountForm.account,editId:this.editId})
      .then(res => {
        // console.log(res);
        //接收参数
        let{code,reason}=res;
        if(code === 0){
          callback();
        }else if(code === 1){
          return callback(
            new Error(reason)
          );
        }else if(code === 2){
          callback();          
        }
        
      })
      .catch(err => {
        console.log(err);
      });
    }
  },
  //created钩子函数发送请求
  created(){
    this.getDataList();
  },
  filters:{
    filterTime(val){
      return moment(val).format('YYYY-MM-DD HH:mm:ss')
    }
  }
};

</script>

<style lang="less">
@import url("./accountManage.less");
</style>


