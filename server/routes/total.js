var express = require('express');
var router = express.Router();

//引入链接对象
const connection=require("./js/connection")
//统一设置请求头
router.all("*",(req,res,next) => {
  //设置响应头
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers", "authorization"); // 允许通过头部信息authorization 携带token  
  //进入下一步
  next();
})

/* 验证token信息 */
// 准备签名
const secretKey = 'lorraine';
/* 验证token的合法性 */
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



  

module.exports = router;
