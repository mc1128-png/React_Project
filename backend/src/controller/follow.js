// 关注控制器

const User = require("../model/user")
const HttpException = require("../exception/http.exception")

// 添加关注  A（登录用户）=> B（被关注者）
module.exports.followController = async (req, res, next) => {
    try {
        // 00 A用户登陆验证 => authMiddleWare

        // 01 获取被关注者username（unique）
        const beFollowerUsername = req.params.username
        // console.log(req.params)

        // 02 获取B被关注者信息（根据username => userB） 验证是否存在
        const beFollower = await User.findOne({
            where: {
                username: beFollowerUsername
            }
        })
        if (!beFollower) {
            throw new HttpException(404, "被关注用户不存在", "beFollower not found in database")
        }

        // 03 获取关注者信息email 来自于middleWare默认返回的
        const followEmail = req.user.email

        // 04 获取关注者信息（email => userA）
        const follower = await User.findByPk(followEmail)
        // console.log(follower)

        // 自己不能关注自己
        if (beFollower.email === followEmail) {
            throw new HttpException(404, "自己不能关注自己", "user can not be follow  self")
        }

        // 05 添加关注 ：关注者 给 被关注者 添加关注
        // console.log(beFollower.__proto__) // 简历模型关系时自动加上去的方法
        // console.log(beFollower.__proto__.addFollower.toString())
        // console.log(beFollower.__proto__.addFollowers.toString()) // 添加多个
        await beFollower.addFollower(follower) // 简历模型关系时自动加上去的方法

        // 06 添加关注结果信息处理
        const beFollowerProfile = {
            username: beFollower.username,
            bio: beFollower.bio,
            avatar: beFollower.avatar,
            following: true
        }

        // 07 返回信息
        res
            .status(201)
            .json({
                statue: "关注成功",
                status: 1,
                data: beFollowerProfile
            })
    } catch (error) {
        next(error)
    }
}

// 取消关注  A（登录用户）=> B（被关注者）
module.exports.cancelFollowController = async (req, res, next) => {
    try {
        // 00 A用户登陆验证 => authMiddleWare

        // 01 获取被关注者username（unique）
        const beFollowerUsername = req.params.username

        // 02 获取B被关注者信息（根据username => userB） 验证是否存在
        const beFollower = await User.findOne({
            where: {
                username: beFollowerUsername
            }
        })
        if (!beFollower) {
            throw new HttpException(404, "被关注用户不存在", "beFollower not found in database")
        }

        // 03 获取关注者信息email 来自于middleWare默认返回的
        const followEmail = req.user.email

        // 04 获取关注者信息（email => userA）
        const follower = await User.findByPk(followEmail)
        // console.log(follower)

        // 05 取消关注 ：关注者 从 被关注者 添加关注
        // console.log(beFollower.__proto__) // 简历模型关系时自动加上去的方法
        // console.log(beFollower.__proto__.removeFollower.toString())
        // console.log(beFollower.__proto__.removeFollowers.toString())
        await beFollower.removeFollower(follower) // 简历模型关系时自动加上去的方法

        // 06 取消关注结果信息处理
        const beFollowerProfile = {
            username: beFollower.username,
            bio: beFollower.bio,
            avatar: beFollower.avatar,
            following: false
        }

        // 07 返回信息
        res
            .status(201)
            .json({
                statue: "取消成功",
                status: 1,
                data: beFollowerProfile
            })
    } catch (error) {
        next(error)
    }
}

// 获取被关注者信息 ：获取关注着（粉丝） && 当前用户是否关注
// 场景 ：用户主页（其他人信息）=> 是否关注她，他的粉丝
module.exports.getFollowersController = async (req, res, next) => {
    try {
        // 00 登录

        // 01 获取被关注者用户名
        const username = req.params.username //   /:username

        // 校验username
        // 校验
        if (!username) {
            throw new HttpException(404, 'username 参数不存在', 'username params not found')
        }

        // 02 获取被关注用户信息
        const beFollower = await User.findOne({
            where: {
                username
            },
            include: ['followers'] // 通过followers中间表进行关联查询
            // followers: [ [User] ]
        })
        // console.log('beFollower', beFollower) //  followers: [ [User] ] 如果没有粉丝则为空 ,一个user为一个粉丝
        // console.log('beFollower', beFollower.followers[0]) // 关注者信息

        // 校验
        if (!beFollower) {
            throw new HttpException(404, '被关注的用户不存在', 'user not found')
        }

        // 获取被关注者所有粉丝
        // 01) 获取当前登录用户的email
        // 02）获取被关注着所有粉丝
        // 当前用户判断是否关注被关注者
        const {email} = req.user
        let following = false // 当前用户是否关注的标志
        let followers = [] // 粉丝信息处理后的容器
        for (const follower of beFollower.followers) {
            if (email === follower.dataValues.email) {
                following = true
            }
            // 粉丝数据处理
            delete follower.dataValues.password
            delete follower.dataValues.Followers
            followers.push(follower)
        }

        // 返回被关注者信息
        // 基本信息
        // 关注状态
        // 粉丝信息
        const profile = {
            username: beFollower.username,
            bio: beFollower.bio,
            avatar: beFollower.avatar,
            following,
            followers
        }

        res
            .status(200)
            .json({
                statue: "获取粉丝成功",
                status: 1,
                data: profile
            })
    } catch (error) {
        next(error)
    }
}