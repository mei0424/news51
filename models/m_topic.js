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
// 修改单条数据库数据
const updateTopicById = (body,topicID,callback) => {
    const sql = 'update topics set title = ?, content = ? where id = ?';
    connection.query(sql,[
        body.title,
        body.content,
        topicID
    ],(err,data) => {
        if(err) {
            return callback(err);
        }
        callback(null,data);
    })
}

// 删除话题数据
const deleteTopicById = (topicID,callback) => {
    const sql = 'delete from topics where id  = ?';
    connection.query(sql,topicID,(err,data) => {
        if(err) {
            return callback(err);
        }
        callback(null,data);
    })
}
exports.findAllTopic = findAllTopic;
exports.addTopic = addTopic;
exports.findTopicByID = findTopicByID;
exports.updateTopicById = updateTopicById;
exports.deleteTopicById = deleteTopicById;

