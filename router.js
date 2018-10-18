// 功能：路由分发
const express = require('express');
const c_user = require('./controller/c_user');
const c_topic = require('./controller/c_topic');

const router = express.Router();
router.get('/signin',c_user.showSignin);
router.post('/signin',c_user.handleSignin);
router.get('/',c_topic.showTopic);
router.get('/topic/create',c_topic.creatTopic);

router.post('/createTopic',c_topic.handelCreatTopic);
// 动态路由
router.get('/topic/:topicID',c_topic.showDetail);

// 退出登录
router.get('/signout',c_user.handleSignout);

// 展示注册页面
router.get('/signup',c_user.showSignUp);
// 处理注册页面表单
router.post('/signup',c_user.handelSignUp);

// 使用动态路由，渲染编辑话题页面
router.get('/topic/:topicID/edit',c_topic.showEdit);
// 使用动态路由，处理编辑页表单提交
router.post('/topic/:topicID/edit',c_topic.handelEditForm);

// 删除话题功能
router.get('/topic/:topicID/delete',c_topic.deleteTopic);
// 导出router
module.exports = router;