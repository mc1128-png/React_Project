const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/index/authMiddleware')
const { createComment,getComments,deleteComment} = require('../controller/comment')

/**
 *  评论路由
 */
router.post('/:slug', authMiddleware, createComment) // slug 文章 ： 创建评论
router.get('/:slug',getComments)  // 获取评论列表，slug 文章别名 
router.delete('/:slug/:id', authMiddleware, deleteComment)  //删除评论；slug 文章； id 评论id



// 导出路由模块
module.exports = router