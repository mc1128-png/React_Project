const {Sequelize} = require('sequelize')
// 连接方法 3: 分别传递参数 (其它数据库)
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    /* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
    dialect: process.env.DB_DIALECT,
    logging: false // 禁用日志
});

module.exports = sequelize