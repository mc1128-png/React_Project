import *as constant from "../../constant/index"
import {getData, saveData, deleteData} from "../../utils/localStorage";

const initUser = () => {
    //本地获取用户信息
    const currentUser = getData('currentUser')
    if (currentUser) {
        //同步到仓库state : 本地磁盘数据 => 内存数据
        return currentUser
    }
    return null
}

const initState = {
    username: '',
    password: '',
    email: '',
    errors: null,
    currentUser: initUser(),
    token: null,
    redirect: ''
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case constant.USER_REGISTER_FIELD:
            const {key, value} = action
            return {...state, [key]: value}
        case constant.USER_REGISTER_RESULT:
            const result = action.result
            // console.log(result.errors)
            return {...state, errors: result}
        case constant.USER_LOGIN_RESULT:
            const {status, data} = action.result
            if (status === 1) {
                let currentUser = null
                let token = null
                currentUser = data
                token = data.token
                saveData("currentUser", currentUser)
                saveData("token", token)
                // console.log(result.errors)
                return {
                    ...state,
                    email: currentUser.email,
                    username: currentUser.username,
                    avatar: currentUser.avatar,
                    bio: currentUser.bio,
                    currentUser,
                    token,
                    errors: null,
                    redirect: '/'
                }
            } else {
                return {...state, errors: action.result}
            }
        case constant.USER_UPDATE_RESULT: // 更新
            if (action.result.status === 1) {
                // 更新后用户信息 同步仓库 store
                state.currentUser = action.result.data
                // state.token = action.result.data.token
                // state.email = action.result.data.email
                // state.username = action.result.data.username
                // state.bio = action.result.data.bio
                // state.avatar = action.result.data.avatar

                //  更新后用户信息 同步本地 localstorage
                saveData("currentUser", action.result.data)
                saveData("token", action.result.data.token)
                return {...state, ...action.result.data}
            } else {
                return {...state, errors: action.result.message}
            }
        case constant.USER_UNLOAD:
            return {...initState}
        case constant.USER_SETTING_LOGOUT: // 退出
            // 清除 currentUser & token
            state = initState
            deleteData('currentUser')
            deleteData('token')
            return {...state, redirect: '/login'}
        case constant.USER_LOGIN_ASYNC_RESULT:
            const currentUser = action.result
            // console.log("currentUser", currentUser)
            return {
                ...state,
                currentUser,
                email: currentUser.email,
                username: currentUser.username,
            }
        default:
            break
    }
    return state
}

export default userReducer