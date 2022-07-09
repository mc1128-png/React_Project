const md5 = require("md5")
const SALT = "MACHAO"

// 键值对形式
const md5Password = (password) => {
    const md5PWD = md5(md5(password + SALT))
    return md5PWD
}

const matchPassword = (oldMd5PWD, password) => {
    const newMd5PWD = md5(md5(password + SALT))
    let match = oldMd5PWD === newMd5PWD ? true : false
    return match
}

module.exports = {
    md5Password,
    matchPassword
}