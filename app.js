// 程序入口
// 功能：搭建服务器
// 1 导包
const express = require('express');
const bodyParser = require('body-parser');
// 引包 router.js
const router = require('./router');
// 2 创建app对象
const app = express();

// 统一处理静态资源
app.use('/public',express.static('./public'));
app.use('/node_modules',express.static('./node_modules'));

// 配置包
app.engine('html',require('express-art-template'));
app.use(bodyParser.urlencoded({
    extended: false
}));

// 3 监听请求
app.use(router);

// 4 绑定端口号
app.listen(12345,()=>{
    console.log('run it');
})