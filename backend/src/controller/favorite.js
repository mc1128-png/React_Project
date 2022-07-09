/*
* 喜欢控制器
* */

const Article = require("../model/article")
const Tag = require("../model/tag")
const User = require("../model/user")
const HttpException = require("../exception/http.exception")

function handleArticle(article, author, count, favorite) {
    // 处理tag
    const tags = []
    for (const tag of article.dataValues.Tags) {
        // console.log(tag.name)
        tags.push(tag.name)
    }
    article.dataValues.tags = tags
    // 处理author
    delete author.dataValues.password
    delete article.dataValues.UserEmail
    article.dataValues.author = author
    // 处理喜欢的信息
    article.dataValues.favoriteCount = count
    article.dataValues.favorited = favorite
    delete author.dataValues.password
    return article.dataValues
}

// 添加喜欢
module.exports.addFavorite = async (req, res, next) => {
    try {
        // 获取文章参数slug
        const {slug} = req.params

        // 获取文章：检验文章是否存在
        let article = await Article.findByPk(slug, {
            include: Tag
        })
        if (!article) {
            throw new HttpException(404, "喜欢的文章不存在", 'article not found')
        }

        // 登录用户添加喜欢
        const userEmail = req.user.email
        // console.log(article.__proto__)
        // console.log(userEmail)

        // 添加文章喜欢的用户
        // let user = await User.findByPk(userEmail)
        // console.log(user)

        // let user2 = User.findByPk("mc952190617@163.com") // 这种方法获取是错误的
        // console.log(user2)
        // await article.addUser(user) // 添加的实例
        // await article.addUser([user, user2]) // 添加的实例  ??

        // 因该是添加作者
        // await article.addUsers([userEmail, "mc952190617@163.com"]) // 添加用户email, 数组多个数据也可以
        await article.addUsers([userEmail]) // 添加用户email, 数组多个数据也可以
        // await article.addUsers(userEmail) // 添加用户email

        // 返回数据准备
        // 1.作者信息
        const author = await article.getUser() // 文章的粉丝
        // console.log(author)

        // 2.喜欢的个数并且+1
        let count = await article.countUsers()
        // console.log(count)

        // 3.文章
        article = handleArticle(article, author, count, true)

        // 响应数据
        res.status(200).json({
            status: 1,
            message: '喜欢文章成功',
            data: article
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
};

module.exports.removeFavorite = async (req, res, next) => {
    try {
        // 获取文章参数slug
        const {slug} = req.params
        // 获取文章：检验文章是否存在
        let article = await Article.findByPk(slug, {
            include: Tag
        })
        if (!article) {
            throw new HttpException(404, "取消的文章不存在", 'article not found')
        }

        // 删除文章喜欢的用户
        const userEmail = req.user.email

        let user = await User.findByPk(userEmail)
        // console.log("user",user)

        // let user2 = User.findByPk("mc952190617@163.com") // 这种方法获取是错误的
        // console.log("user2",user2)
        // await article.removeUser(userEmail) // 移除的实例
        // await article.removeUsers([user, "mc952190617@163.com"]) // 移除的实例
        await article.removeUsers([user]) // 移除的实例

        // 返回数据准备
        let author = await article.getUser() // 文章的粉丝
        // console.log(author)

        // 1.喜欢的个数
        const count = await article.countUsers()
        // console.log(count)

        // 2.文章
        article = handleArticle(article, author, count, false)

        // 响应数据
        res.status(200).json({
            status: 1,
            message: '取消喜欢文章成功',
            data: article
        })
    } catch (error) {
        next(error)
    }
};