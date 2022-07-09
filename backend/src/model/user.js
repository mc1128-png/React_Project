const sequelize = require('../db/sequelize')
const {DataTypes} = require('sequelize')

const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        unique: "username", //
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // 头像
    avatar: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    // 简介
    bio: {
        type: DataTypes.TEXT,
        allowNull: true
    },
})

module.exports = User

