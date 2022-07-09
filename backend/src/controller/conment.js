const HttpException = require("../exception/http.exception")
const Comment = require("../model/comment")
const Article = require("../model/article")
const User = require("../model/user")

// 创建评论
module.exports.createCommentController = async (req, res, next) => {
    try {
        // 获取文章：slug
        const {slug} = req.params
        // console.log(slug)

        // 获取评论内容
        const body = req.body.comment
        // console.log(req.body)

        // 验证文章是否存在
        let article = await Article.findByPk(slug)
        if (!article) {
            throw new HttpException(404, '评论的文章不存在', 'not found')
        }

        // 获取评论的用户：登录用户
        const user = await User.findByPk(req.user.email)
        if (!user) {
            throw new HttpException(404, '评论的用户不存在', 'not found')
        }

        // 创建评论
        // 01 存储评论
        let newComment = await Comment.create({body})
        // 02 存储登录用户和评论关系
        // console.log(user.__proto__)
        await user.addComments(newComment)
        // 03 存储文章和评论关系
        await article.addComments(newComment)

        // 返回数据处理
        // 追加评论人
        newComment.dataValues.user = { // ?
            username: user.username,
            avatar: user.avatar,
            bio: user.bio,
        }
        // console.log(newComment)

        // 返回数据
        return res.status(201).json({
            status: 1,
            message: '评论创建成功',
            data: newComment
        })
    } catch (error) {
        next(error)
    }
}

// 评论列表
module.exports.getCommentController = async (req, res, next) => {
    // req, res,一定不能反
    try {
        // 获取评论对应的文章
        const {slug} = req.params
        // console.log(slug)
        let article = await Article.findByPk(slug)

        // 验证文章是否存在
        if (!article) {
            throw new HttpException(404, '获取的文章不存在', 'article not found')
        }

        // 获取所有评论：某个文章 / 关联评论人的信息
        let comment = await Comment.findAll({
            where: {
                ArticleSlug: slug
            },
            include: [
                {
                    model: User,
                    attributes: ['username', 'avatar', 'bio']
                }
            ]
        })
        // console.log(comment)

        return res.status(200).json({
            status: 1,
            message: '评论获取成功',
            data: comment
        })
    } catch (error) {
        next(error)
    }
}

// 删除评论
module.exports.deleteCommentController = async (req, res, next) => {
    try {
        // 获取文章slug
        // 获取评论id
        const {slug, id} = req.params

        // 验证文章存在
        const article = await Article.findByPk(slug)
        if (!article) {
            throw new HttpException(404, '删除的文章不存在', 'article not found')
        }

        // 验证评论存在
        const comment = await Comment.findByPk(id)
        if (!comment) {
            throw new HttpException(404, '删除的评论不存在', 'comment not found')
        }

        // 用户权限检查：当前登录用户是否是要删除的评论的作者
        const loginEmail = req.user.email
        const commentEmail = comment.UserEmail
        if (loginEmail !== commentEmail) {
            throw new HttpException(404, '删除权限不符合', 'currentUser not found')
        }

        // 文章作者是否有删除评论的权限?
        // 删除评论
        // await Comment.destroy({
        //     where: {
        //         id: UserId
        //     }
        // })
        await comment.destroy()

        return res.status(200).json({
            status: 1,
            message: '评论删除成功',
        })
    } catch (error) {
        next(error)
    }
}