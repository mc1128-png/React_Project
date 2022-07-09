const express = require('express')
const router = express.Router()
const UserController = require('../controller/user')
const authMiddleWare = require("../middleware/authMiddleWare")

// 登陆注册属于开放接口，因为没有token，不需要authMiddleWare验证
router.post('/', UserController.createUser) // 注册
router.post('/login', UserController.loginUser) // 登录
// 私有接口需要认证
router.get('/', authMiddleWare, UserController.getUser) // 用户获取profile
router.put('/', authMiddleWare, UserController.updateUser) // 用户更新

/*router.get('', (req, res) => {
    console.log('get data');
    res.json({
        status: 200,
        message: 'success',
        data: {
            code: 1,
            data: {
                name: 'hello'
            },
            message: '请求成功'
        }
    })
})

router.post('', (req, res) => {
    console.log('控制器处理逻辑');
})*/

module.exports = router