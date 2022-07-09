import {Link} from 'react-router-dom'

const FAVORITED_CLASS = 'btn btn-sm btn-primary';
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary';

const Item = ({article}) => {
    // console.log(article)
    return (
        <div className="article-preview">
            {/*基础信息*/}
            <div className='article-meta'>
                {/*头像*/}
                <Link to={`/profile/${article.author.username}`}>
                    <img src={article.author.avatar || "https://assets.leetcode-cn.com/aliyun-lc-upload/users/kan-chuan/avatar_1629884682.png?x-oss-process=image%2Fresize%2Ch_40%2Cw_40%2Fformat%2Cwebp"}
                         alt={article.author.username}/>
                </Link>
                {/*作者名称&创建时间*/}
                <div>
                    <Link to={`/profile/${article.author.username}`}>
                        {article.author.username}
                    </Link>
                    {" "}
                    <span>
                        {new Date(article.createdAt).toLocaleDateString()}
                    </span>
                </div>

                {/*喜欢*/}
                <div className="pull-xs-right">
                    <button className={article.isFavorite ? FAVORITED_CLASS : NOT_FAVORITED_CLASS}>
                        <i className="fa fa-heart-o"></i> {article.favoriteCount}
                    </button>
                </div>
            </div>

            {/*文章信息*/}
            <Link to={`/article/${article.slug}`} className="preview-link">
                <h5>{article.title}</h5>
                <p>{article.description}</p>
                <span>阅读更多...</span>
                <ul className="tag-list">
                    {
                        article.tags.map(tag => {
                            return <li className="tag-default tag-pill tag-outline" key={tag}>{tag}</li>
                        })
                    }
                </ul>
            </Link>
        </div>
    )
}

export default Item