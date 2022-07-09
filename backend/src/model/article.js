const sequelize = require('../db/sequelize')
const {DataTypes} = require('sequelize')

const Article = sequelize.define('Article', {
    // 别名  唯一
    slug: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

module.exports = Article
