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
//引入jsonwebtoken
const jwt = require('jsonwebtoken');
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


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('账号添加页面');
});

//账号添加路由
router.post('/accountadd', function(req, res, next) {
  //获取参数
  let {account,password,usergroup}=req.body;
  //添加默认头像地址
  let avatarUrl="/upload/default.jpg";
  //存入数据
  //创建SQL语句
  const sqlStr=`insert into account(account,password,user_group,avatar_url) values('${account}','${password}','${usergroup}','${avatarUrl}')`;
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

//请求验证账户是否存在路由
router.get("/checkaccountexist",(req,res,next) => {
  let{account}=req.query;
  const sqlStr=`select * from account where account='${account}'`;
  connection.query(sqlStr,(err,data) => {
    //账户存在则返回1
    if(data.length){
      res.send({code:1,reason:"账户名已经存在！"})
    }else{
      res.send({code:0,reason:"账户名可以使用！"})
    }
  })
})

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
      //响应修改状态
      res.send({code:0,reason:"修改成功！"})
    }else{
      res.send({code:1,reason:"修改失败！"})
    }
  })
})

//请求验证修改后账户是否存在
router.get("/checkeditaccountexist",(req,res,next) => {
  let{account,editId}=req.query;
  //查询id原用户名
  let oldname="";
  const sqlStr=`select * from account where id='${editId}'`
  connection.query(sqlStr,(err,data) => {
    if(err) throw err;
    oldname=data[0].account;
    //当account不同于原用户名时查重
    if(account !== oldname){
      let sqlStr=`select * from account where account='${account}'`;
      connection.query(sqlStr,(err,data) => {
        if(err) throw err;
        //账户存在则返回1
        if(data.length){
          res.send({code:1,reason:"账户名已经存在！"})
        }else{
          res.send({code:0,reason:"账户名可以使用！"})
        }
      })
    }else{
      res.send({code:2,reason:"未修改账户名"})
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

//请求保存新密码路由
router.post("/passwordmodify",(req,res,next) => {

  let{newPassword}=req.body;
  const sqlStr=`update account set password='${newPassword}' where id=${req.user.id}`
  connection.query(sqlStr,(err,data) => {
    if(err) throw err;
    if(data.affectedRows > 0){
      res.send({code:0,message:"修改密码成功！"})
    }else{
      res.send({code:1,message:"修改密码失败！"})      
    }
  })
})


/* ----------------- 上传后端配置 开始 -------------- */ 

// 引入multer
const multer = require('multer')

// 配置上传到服务器放置的目录 和 重命名
const storage = multer.diskStorage({
	destination: 'public/upload', // 图片上传到服务器的这个目录
	  // 图片重命名
    filename (req, file, cb) {
        var fileFormat =(file.originalname).split("."); // haha.jpg => ['haha', 'jpg']
        // 获取时间戳
        var filename = new Date().getTime();  
        // 124354654 + "." + jpg
        cb(null, filename + "." + fileFormat[fileFormat.length - 1]);
    }
})

// 上传对象
const upload = multer({
    storage,
});

/* ----------------- 上传后端配置 结束-------------- */ 

//请求上传头像路由
router.post("/uploadavatar",upload.single('imgfile'),(req,res,next) => {
  // res.send(req.file)
  //获取文件名
  let imgName=req.file.filename;
  //拼接数据库中存储的图片路径
  let path=`/upload/${imgName}`;
  //修改数据
  const sqlStr=`update account set avatar_url='${path}' where id=${req.user.id}`;
  connection.query(sqlStr,(err,data) => {
    if(err) throw err;
    if(data.affectedRows > 0){
      res.send({code:0,message:"上传头像成功！",path})
    }else{
      res.send({code:1,message:"上传头像失败！"})
    }
  })

})

module.exports = router;
