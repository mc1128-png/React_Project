const sequelize = require('../db/sequelize');
const HttpException = require('../exception/http.exception');
const Article = require('../model/article');
const Comment = require('../model/comment');
const User = require('../model/user');

// 创建评论
module.exports.createComment = async (req, res, next) => {
    try {
        console.log('---createComment')
        // 获取文章slug
        const { slug } = req.params
        // 获取评论内容
        const { body } = req.body

        // 获取评论文章
        const article = await Article.findByPk(slug)
        if (!article) {
            throw new HttpException(404, '评论文章不存在', '')
        }
        // 获取评论人
        const user = await User.findByPk(req.user.email)
        if (!user) {
            throw new HttpException(404, '评论用户不存在', '')
        }
        //创建评论
        // 01  存储评论数据
        let newComment = await Comment.create({ body })
        // // 02 存储用户和评论关系
        // // console.log(user.__proto__);
        await user.addComments(newComment)
        // //03 存储文章和评论关系
        await article.addComments(newComment)
        
        // 返回数据优化
        // 追加：评论人
        // newComment
        newComment.dataValues.user = {
            username: user.username,
            avatar: user.avatar,
            bio: user.bio,
        }
        return res.status(201)
            .json({
                status: 1,
                message: '创建评论成功',
                data: newComment
            })
    } catch (error) {
        next(error)
    }
}

// 评论列表
module.exports.getComments = async (req, res, next) => {
    try {
        // 获取评论对应文章
        const { slug } = req.params
        const article = await Article.findByPk(slug)
        if (!article) {
            throw new HttpException(404, '评论的文章不存在', 'comment article not found ')
        }
        // 获取评论 ： 条件 某个文章 / 评论人信息 关联
        const comments = await Comment.findAll({
            where: {
                articleSlug: slug
            },
            include: [
                {
                    model: User,
                    attributes: ['username', 'avatar', 'bio']
                }
            ]
        })

        console.log(comments);

        // 返回
        return res.status(200)
            .json({
                status: 1,
                message: '获取评论成功',
                data: comments
            })
    } catch (error) {
        next(error)
    }
}

// 删除评论
module.exports.deleteComment = async (req, res, next) => {
    try {
        // 获取文章slug
        // 获取评论id
        const {slug,id} = req.params

        console.log(slug,id);

        // 验证文章存在
        const article  = await Article.findByPk(slug)
        if (!article) {
            throw new HttpException(404, '删除评论的文章不存在', 'delelte comment article not found ')
        }
        // 验证评论存在
        const comment  = await Comment.findByPk(id)
        if (!comment) {
            throw new HttpException(404, '要删除的评论在', 'delete comment  not found ')
        }

        // 用户删除权限检查 ： 当前登录用户 是否是当前要评论的作者
        const userEmail   =  req.user.email
        const commentAuthorEmail  = comment.userEmail
        if(userEmail !==commentAuthorEmail){
            throw new HttpException(403, '当前用户没有删除权限', 'current user not have perssion to delete comment ')
        }

        // 文章作者是否有删除权限 : TODO ?

        // 删除评论
        await comment.destroy()
        // await Comment.destroy({where:{id}})

        // 响应数据
        return res.status(200)
        .json({
            status: 1,
            message: '删除评论成功'
        })
    } catch (error) {
        next(error)
    }
}


