import * as constant from '../../constant'

const initState = {
    body: "", // 评论的
    errors: null,
    comments: [],
}

const commentsReducer = (state = initState, action) => {
    switch (action.type) {
        case constant.COMMENT_UPDATE_FIELD: // 同步字段
            const key = action.key
            const value = action.value
            return {...state, [key]: value}
        case constant.COMMENT_CREATE_RESULT:
            if (action.result.status === 1) {
                const comment = action.result.data
                return {...state, body: '', comments: state.comments.concat([comment])}
            } else {
                return {...state, body: '', errors: {message: action.result.message}}
            }
        case constant.COMMENT_GET_RESULT:
            if (action.result.status === 1) {
                return {...state, body: '', comments: action.result.data}
            } else {
                return {...state, body: '', errors: {message: action.result.message}}
            }
        case constant.COMMENT_DELETE_RESULT:
            if (action.result.status === 1) {
                const commentId = action.result.id
                return {...state, body: '', comments: state.comments.filter(item => item.id !== commentId)}
            } else {
                return {...state, body: '', errors: {message: action.result.message}}
            }
        default:
            break;
    }
    return state
}

export default commentsReducer