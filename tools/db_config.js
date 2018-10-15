// 配置mysql

// mysql相关的配置
const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'news51'
});
module.exports = db;