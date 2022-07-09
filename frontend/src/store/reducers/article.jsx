import * as constant from '../../constant'

const initState = {
    author: "",
    title: "",
    description: "",
    body: "", // 文章的
    tag: '',
    tags: [],
    errors: null,
    slug: ""
}

const articleReducer = (state = initState, action) => {
    switch (action.type) {
        case constant.ARTICLE_UPDATE_FIELD: // 同步字段
            const key = action.key
            const value = action.value
            return {...state, [key]: value}
        case constant.ARTILE_ADD_TAG: // 添加标签
            const tags = state.tags.concat([state.tag])
            return {...state, tag: "", tags}
        case constant.ARTILE_REMOVE_TAG: // 移除标签
            const removeTag = action.payload
            const filterTags = state.tags.filter(tag => tag !== removeTag)
            return {...state, tags: filterTags}
        case constant.ARTICLE_CREATE_RESULT: // 创建文章
            return {...state, ...action.result.data}
        case constant.ARTICLE_GET_RESULT: // 获取文章
            if (action.result.status === 1) {
                return {...state, ...action.result.data}
            } else {
                return {...state, errors: action.result.message}
            }
        case constant.ARTICLE_UPDATE_RESULT: // 更新文章
            return {...state, ...action.result.data}
        case constant.ARTICLE_DELETE_RESULT: // 删除文章
            return {...state, ...action.result.data}
        case constant.ARTICLE_UNLOAD:
            return {...initState}
        default:
            break;
    }
    return state
}

export default articleReducer