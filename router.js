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
// 导出router
module.exports = router;