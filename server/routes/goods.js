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

//请求商品列表路由
router.get("/goodsmanage", (req,res,next) => {
    //查询全部数据响应给页面
    const sqlStr="select * from goods order by id desc";
    connection.query(sqlStr,(err,data) => {
        if(err) throw err;
        res.send(data);
    })
})
  

module.exports = router;
