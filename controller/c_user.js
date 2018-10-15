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
        res.send({
            code: 200,
            message: '验证通过,可以跳转'
        })
        // res.redirect('/');
    });
    // const sql = `select * from users where email=?`;
    // 注意：由于操作数据库是异步任务，所以需要采用回调函数
    // connection.query(sql,body.email,(err,results) => {
    //     if(err) {
    //         return res.send('服务器错误');
    //     }
    //     // 代码走到这，获取数据,有两种情况：
    //         // 1 查询不到该email 返回一个空数组
    //         // 2 数据库中包含 该Email 返回一个数组，包含该用户信息
    //     console.log(results);
    //     // 第一种情况时：
    //     if(!results[0]) {
    //         return res.send('该用户不存在，请先注册');
    //     }
    //     // 代码走到这时，说明用户存在，再验证密码
    //         // 1 密码错误 
    //     if(body.password != results[0].password) {
    //         return res.send('密码错误,请确认密码后重新登录');
    //     }
    //     // 2 密码正确 跳转到话题列表页
    //     res.send('密码正确');
    //     // res.redirect('/');



    // })

}
// 导出
exports.showSignin = showSignin;
exports.handleSignin = handleSignin;