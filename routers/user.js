const express = require('express')
const router = express.Router()
const pool = require('./databaes')
const jwt = require('../token/jwt')


/*
// 创建令牌
let token = jwt.create({'uname':'make'});
console.log(token); 

// 验证令牌
let verifyRes = jwt.verify(token);
console.log(verifyRes); 

// 解码令牌
let deRes = jwt.decoded(token, true);
console.log(deRes);
*/

// 查询用户列表
router.get('/inquire',(req,res)=>{
    let {name,pwd} = req.query
    let sql = `select * from t_login`
    pool.query(sql,(err,result)=>{
        res.send({
            msg:'ok',
            code:200,
            data:result
        })
        // console.log(result);
    })

})

// 登录
router.post('/postLogin',(req,res)=>{
    let {uname,upwd} =  req.body 
    let token = jwt.create({'uname':uname})
    pool.query('select * from t_login where uname=?  and upwd= ?',[uname,upwd],(err,result)=>{
        if(err) throw err
        if(result[0]){
            res.send({
                msg:'OK',
                code:200,
                token
            })
        }else{
            res.send({
                msg:'账号或密码错误',
                code:201,
            })
        }
    })
})

// 注册
router.post('/register',(req,res)=>{
    let {uname,upwd} =  req.body 
    pool.query('select * from t_login where uname=?',[uname],(err,result)=>{
        if(!result[0]){
            pool.query('insert into t_login(uname,upwd) values(?,?)',[uname,upwd],(err,result)=>{
                res.send({
                    msg:'注册成功',
                    code:200,
                })
            })
        }else{
            res.send({
                msg:'注册失败,用户名重复',
                code:201
            })
        }
    })  
})

// 修改密码
router.post('/amend',(req,res)=>{
    let {uname,upwd} =  req.body 
    pool.query('update t_login  set upwd = ? where uname=?',[upwd,uname],(err,result)=>{
        res.send({
            msg:'修改成功',
            code:200,
        })
    })
})

// 删除用户
router.post('/delete',(req,res)=>{
    let {uname} =  req.body 
    pool.query('delete from t_login where uname = ? ',[uname],(err,result)=>{
        res.send({
            msg:'删除成功',
            code:200,
        })
    })
})

module.exports = router