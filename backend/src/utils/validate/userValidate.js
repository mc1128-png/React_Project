const validator = require("validator")

// 创建用户校验和用户更新校验使用一个校验规则
const validateCreateUser = (email, username, password) => {
    try {
        let error = {} // 数据校验对象:错误结果对象

        if (validator.isEmpty(email)) { // undefined  " "
            error.email = "邮箱不能为空"
        }
        if (validator.isEmpty(username)) {
            error.username = "用户名不能为空"
        }
        if (validator.isEmpty(password)) {
            error.password = "密码不能为空"
        }
        // email : undefined => 对应的Boolean false/true
        if (email && !validator.isEmail(email)) {
            error.email = "邮箱格式不正确"
        }
        let validate = Object.keys(error).length < 1 // 校验结果标记 true通过/false不通过
        return {error, validate}
    } catch (error) {
        // console.log(error)
    }
}

// 登录校验
const validateUserLogin = (email, password) => {
    try {
        let error = {} // 数据校验对象:错误结果对象

        if (validator.isEmpty(email)) { // undefined  " "
            error.email = "邮箱不能为空"
        }

        if (validator.isEmpty(password)) {
            error.password = "密码不能为空"
        }
        // email : undefined => 对应的Boolean false/true
        if (email && !validator.isEmail(email)) {
            error.email = "邮箱格式不正确"
        }

        let validate = Object.keys(error).length < 1 // 校验结果标记 true通过/false不通过
        return {error, validate}
    } catch (error) {
        // console.log(error)
    }
}

module.exports = {
    validateCreateUser,
    validateUserLogin
}