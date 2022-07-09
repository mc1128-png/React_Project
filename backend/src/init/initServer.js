// 初始化服务
const initServer = async (app) => {
    return new Promise((resolve, reject) => {
        const PORT = process.env.PORT || 8000
        app
            .listen(PORT, () => {
                console.log(`服务器已经启动,server is running on http://localhost:${PORT}`)
                resolve()
            })
            .on('error', (err) => {
                console.log(err)
                reject()
            })
    })
}
module.exports = initServer