// 功能：提取c_user.js 中数据库操作的部分

// 1 验证邮箱
const connection = require('../tools/db_config');
const checkEmail = function(email,callback){
    const sql = `select * from users where email=?`;
    connection.query(sql,email,(err,results) => {
        // 在这里需要使用获取到的数据，
        // 由于操作数据库是异步任务，
        // 所以需要使用回调函数来操作返回的结果
        if(err) {
           return callback(err,null);
        }
        callback(null,results);
    })
};
exports.checkEmail = checkEmail;