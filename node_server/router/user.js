const express=require('express');
const pool=require('../pool.js');
const r=express.Router();
r.post('/reg',(req,res)=>{
    //1.1获取post请求的数据
    let obj=req.body;
    console.log(obj);
    //1.2判断每一项是否为空
    if(!obj.uname){
        res.send({
            code:401,
            msg:'uname required'
        });
        //阻止往后执行
    return;
    }
    if(!obj.upwd){
        res.send({
            code:402,
            msg:'uname required'
        });
        return;
    }
    if(!obj.email){
        res.send({
            code:403,
            msg:'uname required'
        });
        return;
    }
    if(!obj.phone){
        res.send({
            code:402,
            msg:'uname required'
        });
        return;
    }
    //1.3执行SQL命令
    
pool.query('INSERT INTO xz_user SET ?',[obj],(err,result)=>{
    if(err) throw err;
    console.log(result);
    res.send({
        code:200,
        msg:'register suc'
    });
});

    //res.send('注册成功！');   
});
r.post('/login',(req,res)=>{
    let obj=req.body;
    if(!obj.uname){
        res.send({code:401,msg:'uname required'});
        return;
    }
    if(!obj.upwd){
        res.send({code:402,msg:'upwd required'});
        return;
    }
   
    //执行sql语句
    pool.query('SELECT * FROM xz_user WHERE uname=? AND upwd=?',[obj.uname,obj.upwd],(err,result)=>{
        if(err) throw err;
        console.log(result);
       //结果为数组，如果数组长度为0说明登录失败，否则登录成功
       if(result.length===0){
           res.send({code:301,msg:'uname or upwd err'});
       }else{
          res.send({code:200,msg:'login suc'}); 
       }
    });
}); 
r.get('/update',(req,res)=>{
    let obj=req.query;
    console.log(obj);
    let i=400;
    for(var key in obj){
        ///每循环一次加一
        i++;
        if(obj[key]===''){
            res.send({code:i,msg:key+' required'});
            return;
        }
    }
//SQL命令
    pool.query('UPDATE xz_user SET ? WHERE uid=?',[obj,obj.uid],(err,result)=>{
        if(err) throw err;
        console.log(result);
        //result为对象，如果对象下的属性affectedRows为0说明修改失败，否则修改成功
        if(result.affectedRows===0){
            res.send({code:301,msg:'update err'});
        }else{
            res.send({code:200,msg:'update suc'});
        }
    });
    //测试：res.send('success!');
});
r.get('/list',(req,res)=>{
    let obj=req.query;
   
    //验证是否为空
    //如果页码为空，或者小于1，则大小为2
    if(!obj.pno || obj.pno<1){
        obj.pno=1;
    }
    //如果每页大小为空，欧哲小于1，则大小为2
    if(obj.count==='' || obj.count<1){
        obj.count=2;
    }
    console.log(obj);
    //将每页大小和当前页码转为整型
    let c=parseInt(obj.count);
    let p=parseInt(obj.pno);
    //计算开始查询的值
    let start=(p-1)*c;

    pool.query('SELECT * FROM xz_user LIMIT ?,?',[start,c],(err,result)=>{
        if(err) throw err;
        console.log(result);
        //查询到的是数组，直接把数组响应显示到浏览器端
        res.send(result);
    });

   // res.send('成功');

   
});
r.get('/delete',(req,res)=>{
    let obj=req.query;
    console.log(obj);
    pool.query('SELECT * FROM xz_user WHERE uid=?',[obj.uid],(err,result)=>{
        if(err) throw err;
        console.log(result);
        if(result.length>0){
            pool.query('DELETE FROM xz_user WHERE uid=?',[obj.uid],(er,result)=>{
                if(err) throw err;
                res.send('删除成功');
            })
        }else{
            res.send('没有这个用户');
        }
    });
});
r.post('/details',(req,res)=>{
    let obj=req.body;
    console.log(obj);
    if(!obj.uname){
        res.send('请输入名字');
        return;
    }
    pool.query('SELECT * FROM xz_user WHERE uname=?',[obj.uname],(err,result)=>{
        if(err) throw err;
        console.log(result);
        if(result.length>0){
            res.send(result);
        }else{
            res.send('没有此用户！');
        }
    });
});
r.get('/all',(req,res)=>{
    pool.query('SELECT * FROM xz_user',(err,result)=>{
        if(err) throw err;

      if(result.length>0){
        res.send(result)
      }else{
        res.send('error ...')
      }
    })
})
module.exports=r;