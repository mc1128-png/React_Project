import * as constant from '../../constant/index'
import commentRequest from "../../request/comment";

// 清空数据
export const unload = () => {
    return {type: constant.ARTICLE_UNLOAD}
}

// 字段同步
export const commentsFieldUpdate = (key, value) => {
    return {type: constant.COMMENT_UPDATE_FIELD, key, value}
}

// 创建文章评论
export const createComments = (comment, slug) => {
    // console.log("comment", comment)
    return async (dispatch) => {
        try {
            // 网络请求
            const result = await commentRequest.create(comment, slug)
            console.log(result)
            dispatch({type: constant.COMMENT_CREATE_RESULT, result})
        } catch (error) { // 错误
            console.log("error", error);
            dispatch({
                type: constant.COMMENT_CREATE_RESULT,
                result: {
                    status: 0,
                    message: error.message,
                    errors: error.errors
                }
            })
        }
    }
}

// 评论获取
export const getComments = (slug) => {
    // console.log(slug)
    return async (dispatch) => {
        try {
            // 网络请求
            const result = await commentRequest.get(slug)
            console.log(result)
            dispatch({type: constant.COMMENT_GET_RESULT, result})
        } catch (error) { // 错误
            console.log("error", error);
            dispatch({
                type: constant.COMMENT_GET_RESULT,
                result: {
                    status: 0,
                    message: error.message,
                    errors: error.errors
                }
            })
        }
    }
}

// 评论删除
export const deleteComments = (slug, id) => {
    // console.log("comment", comment)
    return async (dispatch) => {
        try {
            // 网络请求
            const result = await commentRequest.delete(slug, id)
            console.log(result)
            dispatch({type: constant.COMMENT_DELETE_RESULT, result: {...result, id}})
        } catch (error) { // 错误
            console.log("error", error);
            dispatch({
                type: constant.COMMENT_DELETE_RESULT,
                result: {
                    status: 0,
                    message: error.message,
                    errors: error.errors
                }
            })
        }
    }
}