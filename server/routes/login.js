var express = require('express');
var router = express.Router();

//引入链接对象
const connection=require("./js/connection")
//引入jsonwebtoken
const jwt = require('jsonwebtoken');
//准备签名
const secretKey="lorraine";
//统一设置请求头
router.all("*",(req,res,next) => {
  //设置响应头
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers", "authorization"); // 允许通过头部信息authorization 携带token
  
  //进入下一步
  next();
})

/* 验证token */

const expressJwt = require('express-jwt');

// 验证token的合法性
router.use(expressJwt ({
    secret: secretKey
}).unless({
    path: ['/login/checkaccount']  // 除了这个地址，其他的URL都需要验证（其他的所有请求 都要带上token 才能获取数据 否则不能获取到数据）
})); 
// 路由拦截器
router.use(function (err, req, res, next) {
    // 如果前端没有token或者是错误的token 就会抛出如下错误
    if (err.name === 'UnauthorizedError') { 
        // 响应给前端token无效的信息
        res.status(401).send('token不合法');
    }
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('登录页面');
});
  
//请求验证账号密码路由
router.post("/checkaccount",(req,res,next) => {
    //接收参数
    let{account,password}=req.body;
    //验证账号是否存在
    let sqlStr=`select * from account where account='${account}'`;
    connection.query(sqlStr,(err,data) => {
        if(err) throw err;
        if(data.length){
            //验证密码是否正确
            sqlStr += ` and password='${password}'`
            connection.query(sqlStr,(err,data) => {
                if(err) throw err;
                //生成token
                const token = jwt.sign(Object.assign({}, data[0]), secretKey, { expiresIn:60*60*2})
                if(data.length){
                    res.send({code:0,reason:`登陆成功！欢迎您，${account}！`,token});
                }else{
                    res.send({code:1,reason:"您输入的密码不正确，请重新输入！"});
                }
            })
        }else{
            res.send({code:2,reason:"您输入的账号不存在，请重新输入！"})
        }
    })
})

//请求获得当前登录用户路由
router.get("/currentaccount",(req,res,next) => {
    //express-jwt验证token合法后，会把token的值存入req.user，即当前登录账号数据对象
    res.send(req.user)
})


module.exports = router;
