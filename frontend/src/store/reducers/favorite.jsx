import * as constant from '../../constant'

const initState = {
    author: "",
    article: "",
    count: "",
    isFavorite: false,
    errors: null,
}

const articleReducer = (state = initState, action) => {
    switch (action.type) {
        case constant.ADDFAVORITE: // 添加喜欢文章
            if (action.result.status === 1) {
                return {...state, ...action.result.data}
            } else {
                return {...state, errors: {message: action.result.message}}
            }
        case constant.DELETEFAVORITE: // 取消喜欢文章
            if (action.result.status === 1) {
                return {...state, ...action.result.data}
            } else {
                return {...state, errors: {message: action.result.message}}
            }
        default:
            break;
    }
    return state
}

export default articleReducer