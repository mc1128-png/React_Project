import userRequest from './user'
import profileRequest from "./profile";
import commentRequest from "./comment";
import articleRequest from "./article";
import favoriteRequest from "./favorite";
import tagRequest from "./tag"

const user = {
    user: userRequest,
    article: articleRequest,
    profile: profileRequest,
    comment: commentRequest,
    favorite: favoriteRequest,
    tag: tagRequest
}
export default user