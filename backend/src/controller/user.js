// 用户控制器
const User = require("../model/user")
const {validateCreateUser, validateUserLogin} = require("../utils/validate/userValidate")
const HttpException = require("../exception/http.exception")
const {md5Password, matchPassword} = require("../utils/md5")
const {sign} = require('../utils/jwt')

// 用户创建
module.exports.createUser = async (req, res, next) => {
    try {
        // 0. authMiddleWare路由接口验证不需要

        // 1.获取数据（username，password，email）
        // console.log(req.body)
        let {email, username, password} = req.body.user

        // 2.数据校验
        let {error, validate} = validateCreateUser(email, username, password)
        // console.log("error :", error, ", validate :", validate)
        if (!validate) {
            throw new HttpException(422, "用户提交数据验证失败", error)
        }

        // 3.业务验证
        // 3.1 数据库查询username是否唯一 : 如果用户名唯一，根据username进行查询，此处暂时不用 => 查询用户名是否重复

        // 3.2 数据库查询email是否存在
        const existUser = await User.findByPk(email) // 查询全是异步的
        if (existUser) {
            throw new HttpException(422, "用户已注册", "User is existed")
        }

        // 4.创建用户：用户信息存储到数据库
        // 4.1 密码加密 ：单项数据加密
        const md5pwd = md5Password(password)
        // 4.2 user model存储数据
        const user = await User.create({
            email,
            username,
            password: md5pwd,
        })

        // 5.结果返回
        // 5.1 成功=>response()
        // 响应数据处理
        let data = {}
        let token = await sign(username, email)
        data.username = username
        data.email = email
        data.token = token
        if (user) {
            res
                .status(201)
                .json({
                    status: 1,
                    message: '请创建用户成功',
                    data
                })
        }
    } catch (error) { // error 是一个HttpException实例
        // 5.2 失败=>next(HttpException 实例对象)
        next(error)
    }
}

// 用户获取
module.exports.getUser = async (req, res, next) => {
    try {
        // 0. authMiddleWare路由接口验证,路由中配置

        // 1. 获取请求数据 : req.user
        const {email} = req.user
        // console.log(req.body.user) // undefined

        // 2. 验证请求数据  ：
        // 2.1 接口数据验证  不需要

        // 2.2 email 验证用户是否存在
        const user = await User.findByPk(email)
        if (!user) {
            throw new HttpException(401, "用户不存在", "user not found");
        }

        // 3 返回数据
        // 3.1 去除password字段
        delete user.dataValues.password

        // 3.2 添加token ,如果不返回客户端需要将其缓存起来
        let token = await sign(user.username, user.email)
        user.dataValues.token = token

        // 3.3 返回用户数据
        return res.status(200)
            .json({
                status: 1,
                message: '请求用户信息成功',
                data: user.dataValues
            })
    } catch (error) {
        next(error)
    }

};

// 用户登录
module.exports.loginUser = async (req, res, next) => {
    try {
        // 0. authMiddleWare路由接口验证不需要

        // 1. 获取请求数据  email password
        // console.log(req.body.user)
        let {email, password} = req.body.user;

        // 2. 验证请求数据  ： email password 字段是否正确
        let {error, validate} = validateUserLogin(email, password);
        if (!validate) {
            throw new HttpException(422, "用户提交数据验证失败", error)
        }

        // 3. 验证业务逻辑  :
        // 3.1 用户是否存在 ：email账号是否存在与数据库中
        const user = await User.findByPk(email);
        if (!user) {
            throw new HttpException(401, "用户不存在", "user not found", "user not found");
        }
        // console.log(user.password)

        // 3.2 密码是否匹配 ：密码加密 => 密文MD5PWD  与  数据库中获取的user.password是否匹配
        const oldMd5PWD = user.dataValues.password;
        const match = matchPassword(oldMd5PWD, password);
        if (!match) {
            throw new HttpException(401, "用户输入密码错误", "password not match");
        }

        // 4. 返回数据
        // 4.1 生成token
        let token = await sign(
            user.username,
            user.email
        )
        // 4.2 响应数据 => 对相应数据进行处理过滤返回需要的数据
        // 1) 准备一个新容器对象
        // 2）直接返回所有数据，去除敏感数据
        delete user.dataValues.password; // dataValues封装的数据里面的字段
        user.dataValues.token = token

        // 4.3 返回数据
        return res.status(200).json({
            status: 1,
            data: user,
            message: "用户登录成功",
        });
    } catch (e) {
        next(e);
    }
};

// 用户更新
module.exports.updateUser = async (req, res, next) => {
    /*try {
        // 0. authMiddleWare路由接口验证需要

        // 1.获取数据（username，password，email）
        let {email, username, password} = req.body.user

        // 2 数据库查询  获取更新的用户:根据email判断是否存在
        const existUser = await User.findByPk(email) // 查询全是异步的
        if (!existUser) {
            throw new HttpException(422, "用户不存在", "User is unExisted")
        }

        // 3 数据校验
        let {error, validate} = validateCreateUser(email, username, password)
        if (!validate) {
            throw new HttpException(422, "用户提交数据验证失败", error)
        }

        // 4 修改字段确认
        // 查询所有用户
        const users = await User.findByPk(email);
        let user = JSON.parse(JSON.stringify(users))
        // console.log(user.email)
        // console.log(user.username)
        // console.log(user.password)


        // 5.如有password处理 => 加密在更新
        const md5pwd = md5Password(password)

        // 6.更新操作 : User.update({key:value})
        if (user.username !== username) {
            await User.update({
                username: username,
            }, {
                where: {
                    email: user.email
                }
            });
        } else if (user.password !== password) {
            await User.update({
                password: md5pwd
            }, {
                where: {
                    email: user.email
                }
            });
        } else if (user.username !== username && user.password !== password) {
            await User.update({
                username: username,
                password: md5pwd
            }, {
                where: {
                    email: user.email
                }
            });
        }

        const updatedUpdated = await User.findByPk(email);
        let updated = JSON.parse(JSON.stringify(updatedUpdated))
        // console.log(updated.email)
        // console.log(updated.username)
        // console.log(updated.password)

        // 7.更新结果,去除敏感信息
        delete updated.password

        // 8.返回数据
        let data = {}
        let token = await sign(updated.username, updated.email)
        data.username = username
        data.email = email
        data.token = token
        res
            .status(201)
            .json({
                data
            })

    } catch (error) { // error 是一个HttpException实例
        // 5.2 失败=>next(HttpException 实例对象)
        next(error)
    }*/

    try {
        // 0. authMiddleWare路由接口验证需要

        // 1.获取数据（username）
        let {email} = req.user

        // 2. 获取用户:根据email判断是否存在
        const existUser = await User.findByPk(email) // 查询全是异步的
        if (!existUser) {
            throw new HttpException(422, "用户不存在", "User is unExisted")
        }

        // 3. 获取数据
        const bodyUser = req.body.user
        if (!bodyUser) {
            throw new HttpException(422, "修改数据不存在", "data is unExisted")
        }

        // 4. 数据存在判断, 确定修改字段
        // 老版本
        /*  const username = bodyUser.username ? bodyUser.username : existUser.username
            const password = bodyUser.password ? md5Password(bodyUser.password) : existUser.password
            const bio = bodyUser.bio ? bodyUser.bio : existUser.bio
            const avatar = bodyUser.avatar ? bodyUser.avatar : existUser.avatar
            */

        // 新版本，undefined不会覆盖，null不行
        const username = bodyUser.username
        const password = bodyUser.password ? md5Password(bodyUser.password) : existUser.password
        const bio = bodyUser.bio
        const avatar = bodyUser.avatar

        // 5. 更新操作 : User.update({key:value})
        // 5.1 先找到email对应的记录数据 => 更新数据   批量更新
        /*  const updateUser = await User.update({username, password, bio, avatar}, {
              where: {
                  email
              }
          })*/

        // 5.2 先获取用户实例在更新  单个更新
        const updateUser = await existUser.update({username, password, bio, avatar})

        // 6.更新结果,去除敏感信息
        delete updateUser.dataValues.password

        // 追加用这种方式，不能updateUser.token = await sign(updateUser.username, updateUser.email)
        // updateUser.dataValues.token = await sign(updateUser.username, updateUser.email)

        // 7.返回数据
        let data = {}
        let token = await sign(updateUser.username, updateUser.email)
        data.email = email
        data.username = username
        data.bio = bio
        data.avatar = avatar
        data.token = token
        res
            .status(201)
            .json({
                data
            })
    } catch (error) { // error 是一个HttpException实例
        next(error)
    }
}