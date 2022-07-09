    const express  = require('express')
    const router = express.Router()
    const {createTagController,getTagsController,deleteTagController} = require('../controller/tag')
    const authMiddleware = require('../middleware/index/authMiddleware')
   
    /**
     * 标签路由地址和控制器映射
     */

    //私有接口：需要token认证
    router.post('/',authMiddleware,createTagController) 
    router.get('/',getTagsController) 
    router.delete('/:tag',authMiddleware,deleteTagController) 

    // 导出路由模块
    module.exports  = router