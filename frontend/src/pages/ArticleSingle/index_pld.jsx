import {PureComponent} from 'react'
import {connect} from 'react-redux';
import * as action from '../../store/actions/article'
import {getComments} from '../../store/actions/comments'
import {addFavorite, deleteFavorite} from "../../store/actions/favorite";
import {Link} from "react-router-dom";
import {marked} from "marked";
import CommentsContainer from "../Comments";

/*
* 1.文章slug
* 2.获取文章数据
* 3.文章回显
* 3.1）头信息：标题，作者，行为（关注，喜欢（别人的）||修改，删除（自己的））
* 3.2）文章信息：显示，标签   markdown转化html
* 3.3）评论信息：添加评论（已登录，未登录没有添加评论），评论列表
* */

const FAVORITED_CLASS = 'btn btn-sm btn-primary';
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary';

// 文章详情
class ArticleSingle extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			slug: props.match.params.slug
		}
	}

	render() {
		const {
			isFavorite,
			favoriteCount,
			title,
			currentUser,
			body,
			description,
			tags,
			author,
			createdAt,
			slug,
			deleteArticleBySlug,
			addFavorite,
			deleteFavorite
		} = this.props
		// console.log(currentUser.username, author.username)
		const isOwn = currentUser && author && currentUser.username === author.username
		const markdata = body
		// const markhtml = marked.parse(markdata, {sanitize: true})
		const markhtml = marked.parse(markdata)
		const markObj = {__html: markhtml}
		return (
			<div className="article-page">
				{/*头信息*/}
				<div className="banner">
					<div className="container">
						<h1>{title}</h1>
						<div className='article-meta'>

							{/*头像*/}
							<div className="info">
								<Link to={`/profile/${author && author.username}`}>
									<img
										src={(author && author.avatar) || "https://assets.leetcode-cn.com/aliyun-lc-upload/users/kan-chuan/avatar_1629884682.png?x-oss-process=image%2Fresize%2Ch_40%2Cw_40%2Fformat%2Cwebp"}
										alt={author && author.username}/>
								</Link>
							</div>

							{/*作者名称&创建时间*/}
							<div className="info">
								<Link to={`/profile/${author && author.username}`}>
									{author && author.username}
								</Link>
								{" "}
								<span>{new Date(createdAt).toLocaleDateString()}</span>
							</div>

							{/*喜欢*/}
							{
								isOwn ? (
									<span>
                                <Link to={`/article/edit/${slug}`}>
                                    <i className="ion-edit"></i>编辑
                                </Link>
										{" "}
										<button
											className="btn btn-outline-danger btn-sm"
											onClick={() => {
												deleteArticleBySlug(slug)
											}}
										>
                                    <i className="ion-trash-a"></i>删除
                                </button>
                            </span>
								) : (
									<button
										className={isFavorite ? FAVORITED_CLASS : NOT_FAVORITED_CLASS}
										onClick={() => {
											if (isFavorite) {
												deleteFavorite(slug)
												window.location.reload()
											} else {
												addFavorite(slug)
												window.location.reload()
											}
										}}
									>
										<i className="fa fa-heart-o"></i>
										{" "}
										{favoriteCount}
									</button>
								)
							}
						</div>
					</div>
				</div>

				{/*文章信息*/}
				<div className="row article-content">
					<div className="col-xs-12">
						{/*文章描述*/}
						<div>{description}</div>

						{/*文章内容*/}
						<div dangerouslySetInnerHTML={markObj}></div>

						{/*显示标签*/}
						<ul className="tag-list">
							{
								tags.map(tag => {
									return <li className="tag-default tag-pill" key={tag}>
										<i className="fa fa-trash-o fa-lg"></i>{tag}
									</li>
								})
							}
						</ul>
					</div>
				</div>

				{/*评论信息*/}
				<CommentsContainer currentUser={currentUser} slug={slug}/>
			</div>
		)
	}

	componentDidMount() {
		// const slug = this.state.slug
		const slug = this.props.match.params.slug
		// console.log("ArticleSingle", slug)
		// 获取文章数据
		this.props.getArticleBySlug(slug)
		this.props.getComments(slug)
	}

	componentWillUnmount() {
		// 清理仓库数据
		this.props.onUnload()
	}
}

const mapState = state => ({
	...state.article,
	...state.user
})

const mapDispatch = dispatch => {
	return {
		getArticleBySlug: (slug) => dispatch(action.getArticleBySlug(slug)),
		deleteArticleBySlug: (slug) => dispatch(action.deleteArticleBySlug(slug)),
		onUnload: () => dispatch(action.unload()),
		getComments: (slug) => dispatch(getComments(slug)),
		addFavorite: (slug) => dispatch(addFavorite(slug)),
		deleteFavorite: (slug) => dispatch(deleteFavorite(slug)),
	}
}

export default connect(mapState, mapDispatch)(ArticleSingle)