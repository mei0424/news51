// 引入db_config 文件
const connection = require('../tools/db_config');
const m_user = require('../models/m_user');
const showSignin = (req, res) => {
    res.render('signin.html');
}
const handleSignin = (req, res,next) => {
    // res.send('处理表单数据');
    const body = req.body;
    // console.log(body);
    m_user.checkEmail(body.email, (err, results) => {
        // 代码执行到这，说明已经获取到异步执行的结果
        if (err) {
            // return res.send('服务器错误');
            return next(err);
        }
        if (!results[0]) {
            // return res.send('该用户不存在，请先注册');
            return res.send({
                code: 1,
                message: '该用户不存在，请先注册'
            })
        }
        if(body.password != results[0].password) {
            // return res.send('密码错误,请确认密码后重新登录');
            return res.send({
                code: 2,
                message: '密码错误,请确认密码后重新登录'
            })
        }
        req.session.user = results[0];
        res.send({
            code: 200,
            message: '验证通过,可以跳转'
        })
        // res.redirect('/');
    });

}
// 退出登录
const handleSignout = (req,res,next) => {
    // 清除session中保存的用户信息
    delete req.session.user;
    // 跳转到登录页
    res.redirect('/signin');
}

// 展示注册页面
const showSignUp = (req,res,next) => {
    res.render('signup.html');
}
// 处理注册页面表单
const handelSignUp = (req,res,next) => {
    // 1 获取到表单数据
    const body = req.body;
    // 2 验证邮箱是否存在
        // 之前再登录页的时候，在模板中已经验证过邮箱，直接调用即可
    m_user.checkEmail(body.email,(err,data) => {
        if(err) {
            return next(err);
        }
        // 我们获取到的数据有两种情况：1 空数组 2 数组内有一条数据
        // 如果有数据，说明邮箱已存在，
        if(data[0]){
            return res.send({
                code:0,
                message:'邮箱已存在，换一个'
            })
        }
        // 代码走到这，说明邮箱不存在，可以使用
        // 3 邮箱不存在，再验证昵称是否存在
        // 在模块文件中查找该昵称
        m_user.checkNickname(body.nickname,(err,data) => {
            if(err){
                return next(err);
            }
            if(data[0]){
                return res.send({
                    code:1,
                    message: '昵称已存在，再想一个'
                })
            }
            // 4 邮箱昵称都不存在，则执行添加sql语句，将数据添加到数据库中
            m_user.addNewUser(body,(err,data) => {
                if(err) {
                    return next(err);
                }
                // 表示添加成功
                res.send({
                    code:200,
                    message: '注册成功'
                })
            });
        })
        
    })
    
}
// 导出
exports.showSignin = showSignin;
exports.handleSignin = handleSignin;
exports.handleSignout = handleSignout;
exports.showSignUp = showSignUp;
exports.handelSignUp = handelSignUp;