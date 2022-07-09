import * as constant from '../../constant/index'
import favoriteRequest from "../../request/favorite";

// 添加喜欢文章
export const addFavorite = (slug) => {
    return async (dispatch) => {
        try {
            // 网络请求
            const result = await favoriteRequest.addFavorite(slug)
            console.log(result)
            dispatch({type: constant.ADDFAVORITE, result})
        } catch (error) { // 错误
            console.log("error", error);
            dispatch({
                type: constant.ADDFAVORITE,
                result: {
                    status: 0,
                    message: error.message,
                    errors: error.errors
                }
            })
        }
    }
}

// 取消喜欢文章
export const deleteFavorite = (slug) => {
    return async (dispatch) => {
        try {
            // 网络请求
            const result = await favoriteRequest.removeFavorite(slug)
            console.log(result)
            dispatch({type: constant.DELETEFAVORITE, result})
        } catch (error) { // 错误
            console.log("error", error);
            dispatch({
                type: constant.DELETEFAVORITE,
                result: {
                    status: 0,
                    message: error.message,
                    errors: error.errors
                }
            })
        }
    }
}