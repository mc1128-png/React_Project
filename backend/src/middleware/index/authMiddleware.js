
const HttpException = require('../../exception/http.exception')
const {sign,decode} = require('../../utils/jwt')

// 前台 jwt 认证 中间件
const authMiddleware  =async (req,res,next)=>{
    console.log('------authMiddleware-------')

    //01 获取jwt
    //1) header 获取 authorization = token jwt
    const authHeader  = req.headers.authorization
    // console.log(authHeader)
    if(!authHeader){
        return next(new HttpException(401,'authorization 必须提供',"authorization missing"))
    }
    //2) 验证authorization 格式
    const authHeaderArray = authHeader.split(' ')
    if(authHeaderArray[0]!=="Token"){
        return next(new HttpException(401,'authorization 格式错误，正确Token content',"token format error"))
    }
     //3) 获取jwt token;jwt token 存在校验 
     const token = authHeaderArray[1]
     if(!token){
        return next(new HttpException(401,'authorization 格式错误，正确Token content',"token content missing"))
     }
       
    //  console.log(token)
    //02 key验证jwt ： 解签
    try {
        console.log('token',token)
        const userInfo = await decode(token)
        console.log('userInfo',userInfo)

        if(!userInfo){
            return next(new HttpException(401,'token 内容不存在','token content error'))
        }
        console.log('------门卫放过-------');
        
        //03 解签成功
        // token 验证成功后 后期controller 方便使用user
        req.user  = userInfo
        req.token = token
        return next()
    } catch (error) {
        //04 解签失败
        return next(new HttpException(401,'authorization token验证失败,请重新登录',error.message))
    }


}

module.exports = authMiddleware