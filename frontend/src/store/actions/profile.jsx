import *as constant from "../../constant/index"
import request from "../../request/index"

export const getProfile = (username) => {
    return async (dispatch) => {
        try {
            // 网络请求
            const result = await request.profile.get(username)
            console.log("result", result)
            dispatch({type: constant.PROFILE_GET_RESULT, result})
        } catch (error) { // 错误
            dispatch({
                type: constant.PROFILE_GET_RESULT,
                result: {
                    status: 0,
                    message: error.message,
                    errors: error.errors
                }
            })
        }
    }
}

export const profileUnload = () => {
    return {type: constant.PROFILE_UNLOAD}
}

export const addFollow = (username) => {
    return async (dispatch) => {
        try {
            // 网络请求
            const result = await request.profile.follow(username)
            console.log("result", result)
            dispatch({type: constant.ADDFOLLOW, result})
        } catch (error) { // 错误
            dispatch({
                type: constant.ADDFOLLOW,
                result: {
                    status: 0,
                    message: error.message,
                    errors: error.errors
                }
            })
        }
    }
}

export const unFollow = (username) => {
    return async (dispatch) => {
        try {
            // 网络请求
            const result = await request.profile.unfollow(username)
            console.log("result", result)
            dispatch({type: constant.ONUNFOLLOW, result})
        } catch (error) { // 错误
            dispatch({
                type: constant.ONUNFOLLOW,
                result: {
                    status: 0,
                    message: error.message,
                    errors: error.errors
                }
            })
        }
    }
}