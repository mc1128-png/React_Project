    const express  = require('express')
    const router = express.Router()
    const {createUser,loginController,getUserController,updateUserController} = require('../controller/user')
    const authMiddleware = require('../middleware/index/authMiddleware')
   
    /**
     * 用户路由地址和控制器映射
     */

    // 开发接口： 所有人都能用  不需要token认证
    router.post('/',createUser) //创建用户
    router.post('/login',loginController) //用户登录

    //私有接口：需要token认证
    router.get('/',authMiddleware,getUserController) //获取用户
    router.put('/',authMiddleware,updateUserController) //用户修改

    // 导出路由模块
    module.exports  = router