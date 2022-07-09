import * as constant from '../../constant'

const initState = {
    count: 0,
    articles: [],
    tags: [],
    tag: null,
    tab: "all",
    currentPage: 1
}

const articleReducers = (state = initState, action) => {
    switch (action.type) {
        case constant.ARTICLES_AUTHOR_RESULT: // 作者的文章
            if (action.result.status === 1) {
                // console.log("articleReducer", action.result.data)
                const {articles, count} = action.result.data
                return {...state, articles, count}
            } else {
                return {...state, errors: action.result.message}
            }
        case constant.TAGS_GET_RESULT: // 标签
            if (action.result.status === 1) {
                return {...state, tags: action.result.data}
            } else {
                return {...state, errors: action.result.message}
            }
        case constant.ARTICLES_TAG_SYNC: // 同步tag
            return {...state, tab: null, tag: action.tag}
        case constant.ARTICLES_TAB_SYNC: // 同步tab
            return {...state, tag: null, tab: action.tab}
        case constant.ARTICLES_PAGE_SYNC: // 同步page
            return {...state, currentPage: action.page}
        case constant.ARTICLES_TAB_RESULT: // 全局文章
            if (action.result.status === 1) {
                const {count, articles} = action.result.data
                return {...state, count, articles}
            } else {
                return {...state, errors: action.payload.message}
            }
        default:
            break;
    }
    return state
}

export default articleReducers