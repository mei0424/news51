// 程序入口
// 功能：搭建服务器
// 1 导包
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const serve_index = require('serve-index');
const session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

var options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'news51'
};

var sessionStore = new MySQLStore(options);

// 引包 router.js
const router = require('./router');
// 2 创建app对象
const app = express();
app.use(morgan('tiny'));
// 挡在浏览器中输入localhost:12345/views 时显示该目录下的所以文件
app.use('/views',serve_index('./views'));


// 统一处理静态资源
app.use('/public', express.static('./public'));
app.use('/node_modules', express.static('./node_modules'));

// 配置包
app.engine('html', require('express-art-template'));
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

// 功能：所有页面的个人中心部分的显示与隐藏
// app.locals是app自带的属性
// 作用：如果给app.locals增加新属性，那么这个属性可以直接在.html文件中通过模板使用
// 例如：
// app.locals.fn = 'abc';

// 我们给 app.locals 添加用户的session属性
// app.locals 是公共成员
// 下面的app.use() 要放在配置session之后

app.use((req,res,next) => {
    app.locals.sessionUser = req.session.user;
    // next() 千万要调用 否则下面代码不能执行
    next();
})

// 3 监听请求
app.use(router);

app.use((req,res,next) => {
    res.render('404.html');
})

app.use((err,req,res,next)=> {
    res.send({
        code:500,
        message:err.message
    })
})

// 4 绑定端口号
app.listen(12345, () => {
    console.log('run it');
})


// 功能：统一配置404页面
// 如果用户url地址输入错误，显示404页面
// 当输入的路径标识全都匹配不到时，才显示404页面
// 所以代码应该放在监听请求的后面

// 第三方中间件的使用：
    // morgan --作用：输出请求日志
    // 使用方式：
        // 1 下载安装
        // 2 引入文件
        // 3 配置文件
        // app.use(morgan('tiny'));

    // serve-index  --作用：显示该目录下的所以文件
    
