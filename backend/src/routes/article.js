const express = require('express')
const router = express.Router()
const ArticleController = require('../controller/article')
const authMiddleWare = require("../middleware/authMiddleWare")

router.post('/', authMiddleWare, ArticleController.createArticleController)
router.get('/', ArticleController.getFollowLimitArticlesController) // 获取全局文章
router.get('/follow', authMiddleWare, ArticleController.getFollowArticleController) // 获取关注者文章 ，follow放在slug上边，不让会当成占位
router.get('/:slug', authMiddleWare, ArticleController.getArticleController) // 获取一篇文章
router.put('/:slug', authMiddleWare, ArticleController.updateArticleController)
router.delete('/:slug', authMiddleWare, ArticleController.deleteArticleController)

module.exports = router
