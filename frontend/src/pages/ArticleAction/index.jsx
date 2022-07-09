import {memo} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import * as action from '../../store/actions/favorite'
import {deleteArticleBySlug} from "../../store/actions/article";

const FAVORITED_CLASS = 'btn btn-sm btn-primary';
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary';

const ArticleAction = memo(props => {
    const {article, currentUser} = props
    const {slug, isFavorite, favoriteCount, author} = article

    if (currentUser) { // 登录
        const isOwn = currentUser && author && currentUser.username === author.username
        if (isOwn) {
            return (
                <span>
                    <Link to={`/article/edit/${slug}`}>
                        <i className="ion-edit"></i> 编辑
                    </Link>
                    {" "}
                    <button
                        className="btn  btn-outline-danger btn-sm"
                        onClick={() => {
                            props.deleteArticleBySlug(slug)
                        }}
                    >
                        <i className="ion-trash-a"></i> 删除
                    </button>
                </span>
            )
        } else { // 不是自己的
            return (
                <button
                    className={isFavorite ? FAVORITED_CLASS : NOT_FAVORITED_CLASS}
                    onClick={() => {
                        if (isFavorite) {
                            props.deleteFavorite(slug)
                            window.location.reload()
                        } else {
                            props.addFavorite(slug)
                            window.location.reload()
                        }
                    }}
                >
                    <i className="fa fa-heart-o"></i> {favoriteCount}
                </button>
            )
        }
    } else { // 未登录
        return (
            <button
                className="btn  btn-outline-danger btn-sm"
            >
                <i className="ion-trash-a"></i> 喜欢
            </button>
        )
    }

})

// const mapState = state => ({})

const mapDispatch = dispatch => ({
    deleteArticleBySlug: (slug) => dispatch(deleteArticleBySlug(slug)),
    addFavorite: (slug) => dispatch(action.addFavorite(slug)),
    deleteFavorite: (slug) => dispatch(action.deleteFavorite(slug)),
})

export default connect(null, mapDispatch)(ArticleAction)