// 功能：路由分发
const express = require('express');
const c_user = require('./controller/c_user');
const c_topic = require('./controller/c_topic');

const router = express.Router();
router.get('/signin',c_user.showSignin);
router.post('/signin',c_user.handleSignin);
router.get('/',c_topic.showTopic);
// 导出router
module.exports = router;