const express = require('express')
const router = express.Router()
const FollowController = require('../controller/follow')
const authMiddleWare = require("../middleware/authMiddleWare")

// 添加关注 ：username被关注者   post 携带关注者信息
router.post('/:username', authMiddleWare, FollowController.followController) // 用户获取
// 取消关注 ：username被关注者   post 携带关注者信息
router.delete('/:username', authMiddleWare, FollowController.cancelFollowController)
// 获取粉丝
router.get('/:username', authMiddleWare, FollowController.getFollowersController)

module.exports = router