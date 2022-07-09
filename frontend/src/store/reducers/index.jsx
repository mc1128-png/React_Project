import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";
import userReducer from "./user";
import articleReducers from "./articles";
import articleReducer from "./article";
import profileReducer from "./profile";
import commentsReducer from "./comments";

const createRootReducer = (history) => combineReducers({
    user: userReducer,
    articles: articleReducers,
    article: articleReducer,
    profile: profileReducer,
    comments:commentsReducer,
    router: connectRouter(history)
})

export default createRootReducer