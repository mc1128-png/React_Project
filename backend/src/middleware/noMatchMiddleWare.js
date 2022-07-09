const HttpException = require('../exception/http.exception.js')

const noMatchMiddleWare = (req, res, next) => {
    const noMatchError = new HttpException(404, '访问路径不匹配', 'router url not found')
    next(noMatchError)
}

module.exports = noMatchMiddleWare