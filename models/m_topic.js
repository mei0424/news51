// 引入数据文件
const connection = require('../tools/db_config');
const findAllTopic = (callback) => {
    const sql = 'select * from topics order by createdAt desc';
    connection.query(sql,(err,data) => {
        if(err) {
            return callback(err);
        }
        callback(null,data);
    })
}

// 向数据库中添加话题
const addTopic = (body,callback) => {
    const sql = 'insert into topics set ?';
    connection.query(sql,body,(err,data) => {
        if(err) {
            return callback(err);
        }
        callback(null,data);
    })
}

// 获取详情页数据
const findTopicByID = (body,callback) => {
    const sql = 'select * from topics where id = ?';
    connection.query(sql,body,(err,data) => {
        if(err) {
            return callback(err);
        }
        callback(null,data);
    })
}
exports.findAllTopic = findAllTopic;
exports.addTopic = addTopic;
exports.findTopicByID = findTopicByID;

