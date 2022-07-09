import * as constant from '../../constant/index'
import articleRequest from "../../request/article";
import {push} from 'connected-react-router'

// 清空数据
export const unload = () => {
    return {type: constant.ARTICLE_UNLOAD}
}

export const articleAddTag = () => {
    return {type: constant.ARTILE_ADD_TAG}
}

export const articleRemoveTag = (tag) => {
    return {type: constant.ARTILE_REMOVE_TAG, payload: tag}
}

// 字段同步
export const articleFieldUpdate = (key, value) => {
    return {type: constant.ARTICLE_UPDATE_FIELD, key, value}
}

// 创建文章
export const createArticle = (article) => {
    return async (dispatch) => {
        try {
            // 网络请求
            const result = await articleRequest.create(article)
            console.log(result)
            if (result.status === 1) {
                const {slug} = result.data
                dispatch(push(`/article/${slug}`))
            } else {
                dispatch({
                    type: constant.ARTICLE_CREATE_RESULT,
                    result: {
                        status: 0,
                        message: result.message,
                        errors: result.errors
                    }
                })
            }
        } catch (error) { // 错误
            console.log("error", error);
            dispatch({
                type: constant.ARTICLE_CREATE_RESULT,
                result: {
                    status: 0,
                    message: error.message,
                    errors: error.errors
                }
            })
        }
    }
}

// 获取文章
export const getArticleBySlug = (slug) => {
    return async (dispatch) => {
        try {
            // 网络请求
            const result = await articleRequest.get(slug)
            // console.log(result)
            dispatch({type: constant.ARTICLE_GET_RESULT, result})
        } catch (error) { // 错误
            console.log("error", error);
            dispatch({
                type: constant.ARTICLE_GET_RESULT,
                result: {
                    status: 0,
                    message: error.message,
                    errors: error.errors
                }
            })
        }
    }
}

// 更新文章
export const updateArticle = (article) => {
    return async (dispatch) => {
        try {
            // 网络请求
            const result = await articleRequest.update(article)
            console.log(result)
            if (result.status === 1) {
                const {slug} = result.data
                dispatch(push(`/article/${slug}`))
            } else {
                dispatch({
                    type: constant.ARTICLE_UPDATE_RESULT,
                    result: {
                        status: 0,
                        message: result.message,
                        errors: result.errors
                    }
                })
            }
        } catch (error) { // 错误
            console.log("error", error);
            dispatch({
                type: constant.ARTICLE_UPDATE_RESULT,
                result: {
                    status: 0,
                    message: error.message,
                    errors: error.errors
                }
            })
        }
    }
}

// 删除文章
export const deleteArticleBySlug = (slug) => {
    return async (dispatch) => {
        try {
            // 网络请求
            const result = await articleRequest.delete(slug)
            console.log(result)
            if (result.status === 1) {
                dispatch(push(`/home`))
            } else {
                dispatch({
                    type: constant.ARTICLE_DELETE_RESULT,
                    result: {
                        status: 0,
                        message: result.message,
                        errors: result.errors
                    }
                })
            }
        } catch (error) { // 错误
            console.log("error", error);
            dispatch({
                type: constant.ARTICLE_DELETE_RESULT,
                result: {
                    status: 0,
                    message: error.message,
                    errors: error.errors
                }
            })
        }
    }
}