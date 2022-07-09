require('dotenv').config({path: '../../.env'})

const jwt = require('jsonwebtoken')
const key = process.env.JWT_SECRET

// 加签 ：生成token
const sign = (username, email) => {
    return new Promise((resolve, reject) => {
        jwt.sign({username, email}, key, (error, token) => {
            if (error) {
                return reject(error)
            }
            return resolve(token)
        })
    })
}

// 解签 ：验证token
const decode = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, key, (error, decoded) => {
            if (error) {
                return reject(error)
            }
            return resolve(decoded)
        })
    })
}

module.exports = {sign, decode}