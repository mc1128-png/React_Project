/*
* 文章控制器
* 后端路由  url-function
* 前端路由  url-component（hash，history）
* */

const Article = require("../model/article")
const User = require("../model/user")
const Tag = require("../model/tag")
const HttpException = require("../exception/http.exception")
const sequelize = require('../db/sequelize')
const {validateArticle} = require("../utils/validate/articleValidate")
const {getSlug} = require('../utils/slug')

function handleArticle(article, author, favoriteCount, isFavorite) {
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
    article.dataValues.favoriteCount = favoriteCount
    article.dataValues.isFavorite = isFavorite
    // console.log(favoriteCount)
    // console.log(isFavorite)
    // console.log(article.dataValues)
    return article.dataValues
}

function handleArticle2(article, favoriteCount, isFavorite) {
    // 处理tag
    const tags = []
    for (const tag of article.dataValues.Tags) {
        // console.log(tag.name)
        tags.push(tag.name)
    }
    article.dataValues.tags = tags
    // 处理author
    let author = article.dataValues.User
    // console.log(article)
    // console.log(author)
    // console.log(article.dataValues.User)
    delete author.dataValues.password
    delete article.dataValues.UserEmail
    delete article.dataValues.User
    article.dataValues.author = author
    article.dataValues.favoriteCount = favoriteCount
    article.dataValues.isFavorite = isFavorite
    // 处理喜欢
    return article.dataValues
}

const getFavorites = async (article, currentUser) => {
    // 返回数据准备
    let favoriteCount = await article.countUsers()
    let favoriteUsers = await article.getUsers()
    // console.log(favoriteUsers)
    let allFavoritesEmail = []
    for (const favoriteUser of favoriteUsers) {
        allFavoritesEmail.push(favoriteUser.email)
    }
    let isFavorite = false
    if (currentUser) {
        let loginUserEmail = currentUser.email
        isFavorite = allFavoritesEmail.includes(loginUserEmail)
    }

    return {favoriteCount, isFavorite}
}

// 创建文章
const createArticleController = async (req, res, next) => {
    // req, res,一定不能反
    try {
        // 00 需要登陆 验证token

        // 01 获取body传过来的数据（可能有tags（系统自带，自定义标签），因为数据是服务端产生，所以客户端多传递几个数据也没问题）
        const {title, description, body, tags} = req.body.article
        // console.log(title)

        // 02 数据验证
        let {error, validate} = validateArticle(title, description, body);
        if (!validate) {
            throw new HttpException(422, "用户提交数据验证失败", error)
        }

        // 03 （作者信息，标签信息）验证：登录用户且在数据库存在才能创建文章 => 作者信息email
        const {email} = req.user
        // 1).安全验证 2).获取作者信息，给文章返回做准备
        const author = await User.findByPk(email)
        // console.log(author)
        if (!author) {
            throw new HttpException(401, '作者账号不存在', 'author not found')
        }

        // 04 （存储数据需要追加作者信息）生成名别slug
        const slug = getSlug()
        // console.log(slug)

        // 05 存储文章slug description title  body 追加作者email
        let article = await Article.create({
            slug,
            title,
            description,
            body,
            UserEmail: email // 追加字段，方便查询文章时候获取作者信息(初始化时就会自动有一个userEmail，要匹配其并覆盖)
        })
        // console.log(article)

        // 06 标签存储：文章和标签的关系 / 新的标签存储
        if (tags.length > 0) {
            // 6.1 遍历每个标签
            for (let tag of tags) {
                // 6.2 确定标签是否存在(区分新老标签)
                let existTag = await Tag.findByPk(tag)
                if (!existTag) {
                    // 新标签  标签存储
                    let newTag = await Tag.create({
                        name: tag
                    })
                    // 存储新标签和文章的关系
                    // console.log(article.__proto__)
                    await article.addTag(newTag)
                } else {
                    // 老标签
                    // 存储标签和文章的关系
                    await article.addTag(existTag)
                }
            }
        }

        // 07 返回文章
        // 7.1） 获取文章 => 关联标签和作者
        // 编辑（文章，标签）--> 保存 --> 预览（文章，标签，作者）
        // 重新查询:确认文章存储成功，获取真正的数据库文章关联的作者和标签
        article = await Article.findByPk(slug, {
            include: Tag // 文章，Tag多对多关系，自动去找标签中间表TagList
        })
        // console.log(article)
        /*
          UserEmail: '952190617@163.com',
          Tags: [ [Tag], [Tag] ]
        */

        // 7.2） 返回文章信息进行处理
        article = handleArticle(article, author)
        // console.log(article)
        // 7.3） 返回数据
        return res.status(200).json({
            status: 1,
            message: '文章创建成功',
            data: article
        })
    } catch (error) {
        next(error)
    }
}

// 获取单个文章
const getArticleController = async (req, res, next) => {
    try {
        console.log('getArticleController')
        const {slug} = req.params
        // 标签获取  include: Tag // 通过Tag关联查询
        let article = await Article.findByPk(slug, {
            include: Tag // 通过Tag关联查询
        })
        // console.log(article)
        // 作者信息：1）查看自己的文章 2）查看别人的文章
        // let authorEmail = article.UserEmail
        // let author = await User.findByPk(authorEmail)
        // console.log(article.__proto__) // getUser
        // console.log(article.__proto__.getUser) // 获取文章实例作者信息
        let author = await article.getUser()
        // console.log(author)

        /*// 返回数据准备
        let favoriteUsers = await article.getUsers()
        // console.log(favoriteUsers)
        let allFavoritesEmail = []
        for (const favoriteUser of favoriteUsers) {
            allFavoritesEmail.push(favoriteUser.email)
        }
        let isFavorite = false
        if (req.user) {
            let loginUserEmail = req.user.email
            isFavorite = allFavoritesEmail.includes(loginUserEmail)
        }

        const favoriteCount = await article.countUsers()
        // console.log(count)*/

        let {favoriteCount, isFavorite} = await getFavorites(article, req.user)
        // console.log(favoriteCount)

        article = handleArticle(article, author, favoriteCount, isFavorite)

        res.status(200).json({
            status: 1,
            message: '文章获取成功',
            data: article
        })
    } catch (error) {
        next(error)
    }
}

// 更新文章
const updateArticleController = async (req, res, next) => {
    try {
        console.log('updateArticleController')

        // 获取参数slug
        const {slug} = req.params

        // 更新数据body
        const data = req.body.article

        // 验证文章作者和登陆作者是同一个人
        // 获取文章作者
        let article = await Article.findByPk(slug)
        // let author =await article.getUser()
        // let authorEmail = author.email
        let authorEmail = article.UserEmail

        // 获取登录用户
        let loginEmail = req.user.email

        // 修改人权限通过  email 匹配（作者与登录用户）
        if (loginEmail !== authorEmail) {
            throw new HttpException(403, '作者账号才有修改权限', 'only author can update article')
        }

        // 根据slug获取更新文章(只更新内容不能更新标签)
        // 获取更新字段
        const title = data.title
        const description = data.description
        const body = data.body
        // const tags = data.tags

        // 更新操作
        const updateArticle = await article.update({
            title,
            description,
            body
        })
        // console.log(updateArticle)

        // 获取关联tags 重新查询数据
        article = await Article.findByPk(slug, {
            include: Tag // 通过Tag关联查询
        })

        // 获取作者：如果字段少，req.user就可以满足
        let author = await User.findByPk(loginEmail)

        // 处理更新后的数据 handleArticle
        article = handleArticle(article, author)

        // 返回数据
        res.status(200).json({
            status: 1,
            message: '文章更新成功',
            data: article
        })
    } catch (error) {
        next(error)
    }
}

// 删除文章
const deleteArticleController = async (req, res, next) => {
    try {
        console.log('deleteArticleController')
        const {slug} = req.params
        let article = await Article.findByPk(slug)
        // console.log(article)
        if (!article) {
            throw new HttpException(404, "删除的文章不存在", 'article not found')
        }

        // 验证用户权限
        const loginEmail = req.user.email
        // console.log(loginEmail) // 952190617@163.com

        let authorEmail = article.dataValues.UserEmail
        // console.log(authorEmail) // 952190617@163.com

        if (loginEmail !== authorEmail) {
            throw new HttpException(403, "只有作者能删除", 'only author can delete')

        }

        // 删除文章
        await article.destroy()
        /* await article.destroy({
             where: {
                 slug
             }
         })*/

        // 响应数据
        res.status(200).json({
            status: 1,
            message: '文章删除成功',
        })
    } catch (error) {
        next(error)
    }
}

// 获取多个文章
// 获取文章列表 ：关注的作者的文章
const getFollowArticleController = async (req, res, next) => {
    try {
        console.log('getFollowArticleController')
        // 获取粉丝的email = 就是登陆用户
        const fansEmail = req.user.email // 当前用户也就是粉丝

        // 获取登录用户关注的作者 follows中间表
        const query = `SELECT userEmail FROM followers WHERE followerEmail = "${fansEmail}"`
        const followAuthors = await sequelize.query(query)
        // console.log(followAuthors[0]) // 俩数组因为query不规范，因为sequelize的一个小bug

        // 没有关注的作者（一个都没关注） => 文章就是空数组
        if (followAuthors[0].length === 0) {
            return res.status(200).json({
                status: 1,
                message: '文章获取成功',
                data: [] // 客户端不显示是文章列表，会显示提示
            })
        }

        // 有关注的作者 => 获取作者的email
        // 遍历email
        let followAuthorEmails = []
        for (const item of followAuthors[0]) {
            followAuthorEmails.push(item.userEmail)
        }
        // console.log(followAuthorEmails)

        // 获取作者文章
        // 方式一
        // 遍历作者email
        /* Article.findAll({
             where:{
                 UseEmail:
             }
         })*/

        // 方式二：作者们的email批量关联获取文章
        // 获取每个作者的文章s ：where查询  （每一篇都要有tags和作者信息）
        let {count, rows} = await Article.findAndCountAll({
            distinct: true, // 去重
            where: {
                UserEmail: followAuthorEmails
            },
            include: [
                Tag, User
            ]

        })
        // console.log(count, rows)

        const articles = []
        // 每一篇文章都要处理tags和作者信息 ，过滤掉敏感信息
        for (const row of rows) {
            // console.log(row)
            // console.log(row.User)
            // console.log(row.Tags)
            let {favoriteCount, isFavorite} = await getFavorites(row, req.user)
            let handleArticle = handleArticle2(row, favoriteCount, isFavorite)
            articles.push(handleArticle)
        }
        // console.log(articles)

        // 响应数据
        res.status(200).json({
            status: 1,
            message: '文章获取成功',
            data: {articles,count}
        })
    } catch (error) {
        next(error)
    }
}

// 获取多个文章列表 ：全局条件查询 author / tag / limit / offset
const getFollowLimitArticlesController = async (req, res, next) => {
    try {
        console.log('getFollowLimitArticlesController')
        const email = req.user ? req.user.email : null

        // 获取四个参数 author / tag / limit / offset req.query
        const {favorite, tag, author, limit = 10, offset = 0} = req.query
        let result;

        if (tag && !author && !favorite) { // limit / offset
            result = await Article.findAndCountAll({
                distinct: true,
                include: [
                    {
                        model: Tag,
                        attributes: [
                            'name'
                        ],
                        where: {
                            name: tag // 通过外部传入tag，去数据库中找通过tag关联的文章
                        }
                    },
                    {
                        model: User,
                        attributes: [
                            'email', 'username', 'bio', 'avatar'
                        ]
                    }
                ],
                limit: parseInt(limit), // 参数都是字符串 => 转化int
                offset: parseInt(offset)
            }) // 批量查询
        } else if (!tag && author && !favorite) { // limit / offset
            result = await Article.findAndCountAll({
                distinct: true,
                include: [
                    {
                        model: Tag,
                        attributes: [
                            'name'
                        ]
                    },
                    {
                        model: User,
                        attributes: [
                            'email', 'username', 'bio', 'avatar'
                        ],
                        where: {
                            username: author
                        }
                    }
                ],
                limit: parseInt(limit), // 参数都是字符串 => 转化int
                offset: parseInt(offset)
            }) // 批量查询
        } else if (tag && author && !favorite) {
            result = await Article.findAndCountAll({
                distinct: true,
                include: [
                    {
                        model: Tag,
                        attributes: [
                            'name'
                        ],
                        where: {
                            name: tag // 通过外部传入tag，去数据库中找通过tag关联的文章
                        }
                    },
                    {
                        model: User,
                        attributes: [
                            'email', 'username', 'bio', 'avatar'
                        ],
                        where: {
                            username: author
                        }
                    }
                ],
                limit: parseInt(limit), // 参数都是字符串 => 转化int
                offset: parseInt(offset)
            }) // 批量查询
        }

        if (!favorite && !tag && !author) {
            // !favorite && !tag && !author
            result = await Article.findAndCountAll({
                distinct: true,
                include: [
                    {
                        model: Tag,
                        attributes: [
                            'name'
                        ]
                    },
                    {
                        model: User,
                        attributes: [
                            'email', 'username', 'bio', 'avatar'
                        ]
                    }
                ],
                limit: parseInt(limit), // 参数都是字符串 => 转化int
                offset: parseInt(offset)
            }) // 批量查询
        }

        // 获取作者喜欢的文章
        if (favorite && !tag && !author) {
            const authorName = favorite
            const author = await User.findOne({
                where: {
                    username: authorName
                }
            })
            const authorEmail = author.email
            const query = `SELECT ArticleSlug from favorites WHERE UserEmail = "${authorEmail}"`
            const queryResult = await sequelize.query(query)
            // console.log("queryResult", queryResult)
            if (queryResult[0].length === 0) {
                return res.status(200)
                    .json({
                        status: 1,
                        message: "没有喜欢的文章",
                        data: []
                    })
            }
            let articleSlugs = []
            for (const articleSlug of queryResult[0]) {
                articleSlugs.push(articleSlug.ArticleSlug)
            }
            result = await Article.findAndCountAll({
                distinct: true,
                include: [Tag, User],
                where: {slug: articleSlugs},
                // limit: parseInt(limit), // 参数都是字符串 => 转化int
                // offset: parseInt(offset)
            }) // 批量查询
        }
        const {count, rows} = result
        // console.log(rows)
        // count总数 / limit 一夜数据 = 页码数据
        const articles = []
        // 每一篇文章都要处理tags和作者信息 ，过滤掉敏感信息
        for (const row of rows) {
            // console.log(row)
            let {favoriteCount, isFavorite} = await getFavorites(row, req.user)
            let handleArticle = handleArticle2(row, favoriteCount, isFavorite)
            articles.push(handleArticle)
        }

        // 响应数据
        res.status(200).json({
            status: 1,
            message: '文章获取成功',
            data: {articles, count}
        })
    } catch (error) {
        next(error)
    }
}


module.exports = {
    createArticleController,
    getArticleController,
    updateArticleController,
    deleteArticleController,
    getFollowArticleController,
    getFollowLimitArticlesController
}