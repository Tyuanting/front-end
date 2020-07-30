const express=require('express');
const bodyParser=require('body-parser');//引入模块
const ru=require('./router/user.js');//引入用户路由器

//console.log(ru);
const app=express();//创建web服务器
app.listen(8080);//设置端口

app.use( express.static('./public') );//托管静态资源
//在路由器之前引用中间件
app.use( bodyParser.urlencoded({
    extended:false
}) );//将post请求的数据解析为对象
app.use('/update',(req,res,next)=>{
    next();
});

app.use('/user',ru);
