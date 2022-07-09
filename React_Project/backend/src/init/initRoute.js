const userRouter = require('../routes/user')
const followRouter = require('../routes/follow')
const tagRouter = require('../routes/tag')
const articleRouter = require('../routes/article')
const favoriteRouter = require('../routes/favorite')
const commentRouter = require('../routes/conment')
const authMiddleWare = require("../middleware/authMiddleWare")

const initRoute = (app) => {
    // 测试
    app.get('/', authMiddleWare, (req, res) => {
        console.log("req.user", req.user, "req.token", req.token)
        res.json({
            status: 200,
            message: "API is OK!"
        })
    })

    // 使用路由模块 : 公共地址/api/v1/users
    app.use('/api/v1/users', userRouter)
    app.use('/api/v1/follow', followRouter)
    app.use('/api/v1/tag', tagRouter)
    app.use('/api/v1/article', articleRouter)
    app.use('/api/v1/favorite', favoriteRouter)
    app.use('/api/v1/comment', commentRouter)
}

module.exports = initRoute