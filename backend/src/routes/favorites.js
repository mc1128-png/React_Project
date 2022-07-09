    const express  = require('express')
    const router = express.Router()
    const authMiddleware = require('../middleware/index/authMiddleware')
    const {addFavorite,removeFavorite}  = require('../controller/favorite')
   
    /**
     *  用户喜欢文章路由
     */

    router.post('/:slug',authMiddleware,addFavorite)
    router.delete('/:slug',authMiddleware,removeFavorite)
   

    // 导出路由模块
    module.exports  = router