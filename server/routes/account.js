var express = require('express');
var router = express.Router();

//引入链接对象
const connection=require("./js/connection")
//统一设置请求头
router.all("*",(req,res,next) => {
  //设置响应头
  res.setHeader("Access-Control-Allow-Origin","*");
  //进入下一步
  next();
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('账号添加页面');
});

//账号添加路由
router.post('/accountadd', function(req, res, next) {
  //获取参数
  let {account,password,usergroup}=req.body;
  //存入数据
  //创建SQL语句
  const sqlStr=`insert into account(account,password,user_group) values('${account}','${password}','${usergroup}')`;
  // console.log(sqlStr);
  //执行sql
  connection.query(sqlStr, (err,data) => {
    if(err) throw err;
    // console.log(data);
    if(data.affectedRows > 0){
      //添加成功
      res.send({code:0,reason:"添加账号成功！"})
    }else{
      res.send({code:1,reason:"添加账号失败！"})      
    }
  })
});

//请求账号列表(分页模式)路由
router.get("/accountmanage",(req,res,next) => {
  //获取参数
  let {pageSize,currentPage}=req.query;
  //查询数据获得总条数
  //创建SQL
  let sqlStr="select * from account order by id desc";
  //执行SQL
  connection.query(sqlStr,(err,data) => {
    if(err) throw err;
    let total=data.length;
    //根据分页方式拼接查询字符串
    let n=(currentPage-1)*pageSize; //n为需要跳过的数据条数
    sqlStr += ` limit ${n},${pageSize}`;
    //执行SQL
    connection.query(sqlStr,(err,data) => {
      if(err) throw err;
      res.send({total,data});
    })
  })
});

//请求删除数据路由
router.post("/accountdel",(req,res,next) => {
  //获取id
  let {id}=req.body;
  //查询数据
  const sqlStr=`delete from account where id=${id}`
  connection.query(sqlStr,(err,data) => {
    if (err) throw err;
    // res.send(data);
    if(data.affectedRows > 0){
      res.send({code:0,reason:"删除成功！"})
    }else{
      res.send({code:1,reason:"删除失败！"})      
    }
  })
});

//请求修改回填路由
router.get("/accountedit",(req,res,next) => {
  //获取id
  let {id}=req.query;
  const sqlStr=`select * from account where id=${id}`;
  connection.query(sqlStr,(err,data) => {
    res.send(data)
  })
});
//请求保存修改路由
router.post("/saveaccountedit",(req,res,next) => {
  //接收参数
  let{id,account,userGroup}=req.body;
  const sqlStr=`update account set account='${account}',user_group='${userGroup}' where id=${id}`;
  connection.query(sqlStr,(err,data) => {
    if(err) throw err;
    if(data.affectedRows > 0){
      res.send({code:0,reason:"修改成功！"})
    }else{
      res.send({code:1,reason:"修改失败！"})
    }
  })
})

//请求批量删除路由
router.get("/multipledelete",(req,res,next) => {
  //获取参数
  let{selectId}=req.query;
  const sqlStr=`delete from account where id in (${selectId})`;
  connection.query(sqlStr,(err,data) => {
    if(data.affectedRows > 0){
      res.send({code:0,reason:"批量删除成功！"})
    }
  })
})

module.exports = router;
