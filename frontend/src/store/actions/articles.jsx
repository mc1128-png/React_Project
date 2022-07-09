import * as constant from '../../constant/index'
import articleRequest from "../../request/article";
import tagRequest from "../../request/tag";

// 获取作者的文章
export const getArticlesByAuthor = (username, page) => {
    return async (dispatch) => {
        try {
            const result = await articleRequest.getAuthor(username, page)
            console.log("getArticlesByAuthor", result)
            dispatch({type: constant.ARTICLES_AUTHOR_RESULT, result})
        } catch (error) { // 错误
            console.log(error);
            dispatch({
                type: constant.ARTICLES_AUTHOR_RESULT,
                result: {
                    status: 0,
                    message: error.message,
                    errors: error.errors
                }
            })
        }
    }
}

// 获取作者喜欢的文章
export const getArticlesByFavorite = (username, page) => {
    return async (dispatch) => {
        try {
            const result = await articleRequest.getFavorite(username, page) // ?
            console.log("getArticlesByFavorite", result)
            dispatch({type: constant.ARTICLES_AUTHOR_RESULT, result})
        } catch (error) { // 错误
            console.log(error);
            dispatch({
                type: constant.ARTICLES_AUTHOR_RESULT,
                result: {
                    status: 0,
                    message: error.message,
                    errors: error.errors
                }
            })
        }

    }
}

// 获取首页标签
export const getTags = () => {
    return async (dispatch) => {
        try {
            const result = await tagRequest.getAll()
            console.log("首页标签", result)
            dispatch({type: constant.TAGS_GET_RESULT, result})
        } catch (error) { // 错误
            console.log(error);
            dispatch({
                type: constant.TAGS_GET_RESULT,
                result: {status: 0, message: error.message, errors: error.errors}
            })
        }
    }
}

// 同步tag
export const syncTag = (tag) => {
    return {type: constant.ARTICLES_TAG_SYNC, tag}
}

// 同步tab
export const syncTab = (tab) => {
    return {type: constant.ARTICLES_TAB_SYNC, tab}
}

// 同步page
export const syncPage = (page) => {
    return {type: constant.ARTICLES_PAGE_SYNC, page}
}

// 获取选项卡文章
export const getTabArticles = () => {
    return async (dispatch, getState) => {
        try {
            const {tab, tag, currentPage} = getState().articles
            // console.log('tab', tab)
            // console.log('tag', tag)
            // console.log('page', currentPage)
            let result = {}
            if (tab) {
                if (tab === 'follows') { // 获取关注文章
                    result = await articleRequest.followArticles(currentPage)
                } else if (tab === 'all') { // 获取全局文章
                    result = await articleRequest.all(currentPage)
                }
                console.log(result)
            }
            if (tag) {
                // 通过标签过滤文章
                result = await articleRequest.byTag(tag, currentPage)
                console.log(result)
            }
            dispatch({type: constant.ARTICLES_TAB_RESULT, result})
        } catch (error) {
            console.log(error); // 请求具体错误
            dispatch({type: constant.ARTICLES_TAB_RESULT, result: {status: 0, message: error.message, errors: error}})
        }
    }
}