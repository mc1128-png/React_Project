import *as constant from "../../constant/index"

const initState = {
    email: '',
    bio: '',
    avatar: null,
    errors: null,
    following: false,
    followers: []
}

const profileReducer = (state = initState, action) => {
    // console.log("profileReducer", action.result)
    switch (action.type) {
        case constant.PROFILE_GET_RESULT:
            if (action.result.status === 1) {
                return {...state, ...action.result.data}
            } else {
                return {...state, errors: {message: action.result.message}}
            }
        case constant.PROFILE_UNLOAD:
            return {...initState}
        case constant.ADDFOLLOW:
            if (action.status === 1) {
                return {...state, ...action.result.data}
            } else {
                return {...state, errors: {message: action.result.message}}
            }
        case constant.ONUNFOLLOW:
            if (action.status === 1) {
                return {...state, ...action.result.data}
            } else {
                return {...state, errors: {message: action.result.message}}
            }
        default:
            break
    }
    return state
}

export default profileReducer