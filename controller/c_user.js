// 引入db_config 文件
const connection = require('../tools/db_config');
const m_user = require('../models/m_user');
const showSignin = (req, res) => {
    res.render('signin.html');
}
const handleSignin = (req, res) => {
    // res.send('处理表单数据');
    const body = req.body;
    // console.log(body);
    m_user.checkEmail(body.email, (err, results) => {
        // 代码执行到这，说明已经获取到异步执行的结果
        if (err) {
            // return res.send('服务器错误');
            return res.send({
                code: 500,
                message: '服务器错误'
            })
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
const handleSignout = (req,res) => {
    // 清除session中保存的用户信息
    delete req.session.user;
    // 跳转到登录页
    res.redirect('/signin');
}
// 导出
exports.showSignin = showSignin;
exports.handleSignin = handleSignin;
exports.handleSignout = handleSignout;