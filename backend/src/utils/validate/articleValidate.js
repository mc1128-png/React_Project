const validator = require("validator")

// 创建用户校验和用户更新校验使用一个校验规则
const validateArticle = (title, description, body) => {
    try {
        let error = {} // 数据校验对象:错误结果对象

        if (validator.isEmpty(title)) { // undefined  " "
            error.title = "标题不能为空"
        }
        if (validator.isEmpty(description)) {
            error.description = "描述不能为空"
        }
        if (validator.isEmpty(body)) {
            error.body = "内容不能为空"
        }
        let validate = Object.keys(error).length < 1 // 校验结果标记 true通过/false不通过
        return {error, validate}
    } catch (error) {
        // console.log(error)
    }
}

module.exports = {
    validateArticle
}