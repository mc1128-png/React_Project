const sequelize = require('../db/sequelize')
const {DataTypes} = require('sequelize')

const Comment = sequelize.define('Comment', {
        // 评论内容
        body: {
            // type: DataTypes.TEXT, // TEXT不能做primaryKey
            type: DataTypes.STRING, // TEXT不能做primaryKey
            // primaryKey: true, // 一定不能写 ，不写的话自动加一个主键id
            // allowNull: false //
        }
    }
)

module.exports = Comment
