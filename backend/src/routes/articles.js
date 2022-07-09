const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/index/authMiddleware')
const { createArticleController, getArticleController, updateArticleController, deleteArticleController, getFollowArticlesController,getArticlesController } = require('../controller/article')

/**
 *  文章路由
 * 
 * 后端路由：url - function
 * 前端路由：url - component(hash / history)
 */
router.post('/', authMiddleware, createArticleController) //创建
router.get('/follow', authMiddleware, getFollowArticlesController) //获取关注者文章 //注意：顺序在/:slug
router.get('/:slug', getArticleController) //获取单个文章
router.get('/',getArticlesController) //获取全局文章
router.put('/:slug', authMiddleware, updateArticleController)
router.delete('/:slug', authMiddleware, deleteArticleController)


// 导出路由模块
module.exports = router