const dbConnection = require('../db/connection')
const sequelize = require('../db/sequelize')
const User = require('../model/user')
const Article = require('../model/article')
const Comment = require('../model/comment')
const Tag = require('../model/tag')

// 模型关系
/*
* A.hasOne(B)  A有一个B
* A.hasMany(B)  A有多个B
* A.belongsTo(B)  A属于B
* A.belongsToMany(B,.关联表.)  A属于多个B
* */

// 关联规则
const initRelation = () => {
    // 互相关注，多对多
    User.belongsToMany(User, {
        through: "Followers", // 自动创建的模型  中间表
        as: "followers", // 自连接子必须别名
        timestamps: false
    })

    // 用户写文章 一对多   在文章表里自动追加字段 userEmail
    User.hasMany(Article, {
        onDelete: "CASCADE" // 级联删除,关联的文章也会删除
    })
    Article.belongsTo(User)

    // 用户收藏文章 多对多
    User.belongsToMany(Article, {
        through: "favorites", // 通过其进行关联
        uniqueKey: false,
        timestamps: false
    })
    Article.belongsToMany(User, {
        through: "favorites", // 通过其进行关联
        uniqueKey: false,
        timestamps: false
    })

    // 评论：用户和评论 一对多
    User.hasMany(Comment, {
        onDelete: "CASCADE"
    })
    Comment.belongsTo(User)

    // 文章和标签 多对多
    Article.belongsToMany(Tag, {
        through: "TagList", // 通过其进行关联
        uniqueKey: false,
        timestamps: false
    })
    Tag.belongsToMany(Article, {
        through: "TagList", // 通过其进行关联
        uniqueKey: false,
        timestamps: false
    })

    // 评论：文章和评论  一对多
    Article.hasMany(Comment, {
        onDelete: "CASCADE"
    })
    Comment.belongsTo(Article)
}

// 初始化数据库
const initDB = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            // 数据库连接
            await dbConnection()

            // 初始化：模型 - 建表
            initRelation()

            // model = 同步到真实数据库
            // await sequelize.sync({force: true}) // 先删除在建立
            await sequelize.sync({alter: true}).catch(err => {
                console.log(err)
            }) // 有表就用表
            resolve()
        } catch (err) {
            reject(err)
        }
    })
}

module.exports = initDB