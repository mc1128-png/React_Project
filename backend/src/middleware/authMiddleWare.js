// 不同的文件夹里放着不同的鉴权方式
const HttpException = require("../exception/http.exception")
const {sign, decode} = require('../utils/jwt')
// 前台 jwt 认证
const authMiddleWare = async (req, res, next) => {
    // 00 模拟
    // 生成token
    // const jwtToken = await sign("machao", "mc952190617@163.com")
    await sign("machao", "mc952190617@163.com")
    // console.log("模拟token",jwtToken)

    // 01 获取jwt
    // 1) header 获取authorization = token jwt
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return next(new HttpException(401, "authorization必须提供", "authorization missing"))
    }
    // 2）验证authorization格式
    const authHeadeArray = authHeader.split(" ")
    if (authHeadeArray[0] !== "Token") {
        return next(new HttpException(401, "authorization格式错误 正确格式为Token content", "token foramt error"))
    }
    // 3）jwt token 存在校验
    const token = authHeadeArray[1]
    if (!token) {
        return next(new HttpException(401, "authorization内容错误 正确格式为Token content", "token content missing"))
    }

    // 02 key 验证token ：解签
    try {
        const user = await decode(token)
        // console.log("user", user)
        if (!user) {
            return next(new HttpException(401, "token content missing", "token content error"))
        }
        // token 验证成功之后，后期的controller方便使用user
        req.user = user
        req.token = token
        // 03 解签成功
        return next()
    } catch (error) {
        // 04 解签失败
        return next(new HttpException(401, "authorization验证失败", error.message))
    }
}

module.exports = authMiddleWare