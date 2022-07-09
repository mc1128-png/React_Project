import *as constant from "../../constant/index"
import {push} from "connected-react-router";
import request from "../../request/index"

// 清空数据
export const unload = () => {
    return {type: constant.USER_UNLOAD}
}

// 字段同步
export const userFieldUpdate = (key, value) => {
    return {type: constant.USER_REGISTER_FIELD, key, value}
}

export const registerSubmit = (user) => {
    return async (dispatch, getState) => {
        try {
            // 网络请求
            const {email, username, password} = user
            const result = await request.user.register(email, username, password)
            console.log(result)
            if (result.status === 1) {
                // 跳转login
                dispatch(push("/login"))
            } else { // 失败
                dispatch({type: constant.USER_REGISTER_RESULT, result})
            }
        } catch (error) { // 错误
            dispatch({
                type: constant.USER_REGISTER_RESULT,
                result: {
                    message: error.message,
                    errors: error.errors
                }
            })
        }
    }
}

export const updateSubmit = (user) => {
    return async (dispatch) => {
        try {
            // 网络请求
            const result = await request.user.update(user)
            console.log(result)
            dispatch({type: constant.USER_UPDATE_RESULT, result})
        } catch (error) { // 错误
            dispatch({
                type: constant.USER_UPDATE_RESULT,
                result: {
                    status: 0,
                    message: error.message,
                    errors: error.errors
                }
            })
        }
    }
}

export const loginSubmit = (email, password) => {
    return async dispatch => {
        try {
            // 网络请求
            const result = await request.user.login(email, password)
            console.log(result)
            dispatch({type: constant.USER_LOGIN_RESULT, result})
        } catch (error) { // 错误
            dispatch({
                type: constant.USER_LOGIN_RESULT,
                result: {
                    status: 0,
                    message: error.message,
                    errors: error.errors
                }
            })
        }
    }
}

export const userSyncResult = (user) => {
    return {type: constant.USER_LOGIN_ASYNC_RESULT, result: user}
}

// 退出
export const logout = () => {
    return {type: constant.USER_SETTING_LOGOUT}
}
