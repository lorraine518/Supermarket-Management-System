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
  res.send('商品页面');
});

//商品添加路由
router.post('/goodsadd', function(req, res, next) {
    //接收参数
    let {goodsgroup,goodscode,goodsname,goodsprice,salesprice,goodsnum}=req.body;
    // res.send(req.body);
    const sqlStr=`insert into goods (goodsgroup,goodscode,goodsname,goodsprice,salesprice,goodsnum) values('${goodsgroup}','${goodscode}','${goodsname}','${goodsprice}','${salesprice}','${goodsnum}')`;
    connection.query(sqlStr,(err,data) => {
        if(err) throw err;
        if(data.affectedRows > 0){
            res.send({code:0,reason:"添加商品成功！"});
        }else{
            res.send({code:1,reason:"添加商品失败！"});          
        }
    })
});

//请求商品列表路由（分页功能）
router.get("/goodsmanage", (req,res,next) => {
    //获取参数
    let {pageSize,currentPage}=req.query;
    //查询数据总条数
    let sqlStr="select * from goods order by id desc";
    connection.query(sqlStr,(err,data) => {
        if(err) throw err;
        let totalData=data.length;
        let n=(currentPage-1)*pageSize; //计算需要跳过的数据条数
        sqlStr+=` limit ${n},${pageSize}`;
        connection.query(sqlStr,(err,data) => {
            if(err) throw err;
            res.send({totalData,data})
        })
    })
});

//请求商品删除路由
router.get("/deletegoodsdata",(req,res,next) => {
    //获取id
    let{id}=req.query;
    const sqlStr=`delete from goods where id=${id}`
    connection.query(sqlStr,(err,data) => {
        if(err) throw err;
        if(data.affectedRows > 0){
            res.send({code:0,reason:"删除成功！"})
        }else{
            res.send({code:1,reason:"删除失败！"})
        }
    })
})

//请求批量删除路由
router.get("/multipledeletedata",(req,res,next) => {
    //获取id数组
    let{selectId}=req.query;
    //批量删除
    const sqlStr=`delete from goods where id in (${selectId})`
    connection.query(sqlStr,(err,data) => {
        if(err) throw err;
        if(data.affectedRows > 0){
            res.send({code:0,reason:"批量删除成功！"})
        }else{
            res.send({code:1,reason:"批量删除失败！"})
        }
    })
})

//请求修改回显数据
router.get("/editGoodsData",(req,res,next) => {
    //接收参数
    let{id}=req.query;
    //查询数据
    const sqlStr=`select * from goods where id=${id}`
    connection.query(sqlStr,(err,data) => {
        if(err) throw err;
        res.send(data)
    })
})

//请求保存修改路由
router.post("/savegoodsedit",(req,res,next) => {
    //接收参数
    let{editId,goodsgroup,goodsname,goodsnum,goodsprice,salesprice,goodscode}=req.body;
    //修改数据
    const sqlStr=`update goods set goodsgroup='${goodsgroup}',goodsname='${goodsname}',goodsnum='${goodsnum}',goodsprice='${goodsprice}',salesprice='${salesprice}',goodscode='${goodscode}' where id=${editId}`
    connection.query(sqlStr,(err,data) => {
        if(err) throw err;
        if(data.affectedRows > 0){
            res.send({code:0,reason:"修改成功！"})
        }else{
            res.send({code:1,reason:"修改失败！"})            
        }
    })
})
  

module.exports = router;
