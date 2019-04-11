const mysql=require("mysql");
const connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"supermarket"
});

//执行链接
connection.connect();

//暴露
module.exports=connection;