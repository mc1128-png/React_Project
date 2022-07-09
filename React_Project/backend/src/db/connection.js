const sequelize = require('./sequelize')

// 异步验证
const dbConnection = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            await sequelize.authenticate()
            console.log(`mysql connect success on PORT ${process.env.DB_PORT}`)
            resolve()
        } catch (err) {
            console.log(`mysql connect fail on ${process.env.DB_PORT}`, err)
            reject(err)
        }
    })
}

module.exports = dbConnection