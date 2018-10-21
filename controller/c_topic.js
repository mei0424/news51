const m_topic = require('../models/m_topic');
// 引包 moment
const moment = require('moment');
const showTopic = (req,res,next) => {
    // res.send('列表页');
    // 渲染列表页 需要从数据库中获取到数据，使用模板引擎，将数据渲染到页面中
    m_topic.findAllTopic((err,data) => {
        if(err) {
            return next(err);
        }
        // 获取到数据后
        // console.log(data);
        res.render('index.html',{
            topics: data,
            user: req.session.user
        });

    });
}

const creatTopic = (req,res,next) => {
    res.render('topic/create.html',{
        user: req.session.user
    });
}
// 处理发起话题表单数据
const handelCreatTopic = (req,res,next) => {
    // 获取到表单数据
    const body = req.body;
    // console.log(body);//{ title: '第一篇文章', content: '第一篇测试文章' }
    // 由于后期需要将新增的话题排到最前面，所以我们在查询数据时按照事件进行排序
    // 但是我们获取的表单数据中没有创建时间，所以我们需要为body添加上时间
    // 这里需要用到一个时间包 moment 
    // 将当前传入body

    body.createdAt = moment().format();
    // 还需要将 userId 也添加到body属性中 方便获取编写用户
    body.userId = req.session.user.id;

    // 操作数据库 在m_topic 文件中执行
    m_topic.addTopic(body,(err,data) => {
        if(err) {
            return next(err);
        }
        res.send({
            code: 200,
            message: '发布话题成功'
        })
    });


}

// 展示详情页
const showDetail = (req,res,next) => {
    // res.render('topic/show.html');
    // 1 获取到topicID值
    // console.log(req.params);//{ topicID: '3' }
    const topicID = req.params.topicID;
    // 2 根据topicID在数据库中查找,找到相应的数据,对页面进行渲染
    m_topic.findTopicByID(topicID,(err,data) => {
        if(err) {
            return next(err);
        }
        res.render('topic/show.html',{
            topic: data[0],
            user: req.session.user
        });
    });

}

// 渲染话题编辑页
const showEdit = (req,res,next) => {
    // 1 获取到topicID
    const topicID = req.params.topicID;
    // console.log(topicID);
    // 2 需要将对应的话题渲染回客户端
    // 在模块页面查询MySQL数据库，将获得的数据渲染到页面
    m_topic.findTopicByID(topicID,(err,data) => {
        if(err) {
            return next(err);
        }
        res.render('topic/edit.html',{
            topic:data[0],
            user:req.session.user
        });
    })
}

// 处理编辑页表单提交
const handelEditForm = (req,res,next) => {
    // 1 获取表单内容和话题id
    const body = req.body;
    const topicID = req.params.topicID;
    // console.log(body);//{ title: '第十一篇文章', content: '第十一测试篇文章（2）' }
    // 2 在模块中修改数据库数据
    m_topic.updateTopicById(body,topicID,(err,data) => {
        if(err) {
            return next(err);
        }
        res.send({
            code: 200,
            message: '修改成功'
        })
    });
}

// 删除话题功能
const deleteTopic = (req,res,next) => {
    // 1 获取话题id值
    const topicID = req.params.topicID;
    // 2 根据id值删除话题
    m_topic.deleteTopicById(topicID,(err,data) => {
        if(err) {
            return next(err);
        }
        res.send({
            code: 200,
            message: '删除成功'
        })


    });
}

module.exports.showTopic = showTopic;
module.exports.creatTopic = creatTopic;
module.exports.handelCreatTopic = handelCreatTopic;
module.exports.showDetail = showDetail;
module.exports.showEdit = showEdit;
module.exports.handelEditForm = handelEditForm;
module.exports.deleteTopic = deleteTopic;