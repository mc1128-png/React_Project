const sequelize = require('../db/sequelize')
const {DataTypes} = require('sequelize')

const Tag = sequelize.define('Tag', {
        // 标签名
        name: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        }
    },
    {
        // 关闭时间戳
        timestamps: false
    }
)

module.exports = Tag
