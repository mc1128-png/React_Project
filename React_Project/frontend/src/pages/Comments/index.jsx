import React, {PureComponent} from 'react'
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import *as action from '../../store/actions/comments'
import CommentList from "./CommentList";

class CommentsContainer extends PureComponent {
    handleChange = (e) => {
        this.props.commentsFieldUpdate("body", e.target.value)
    }

    createComment = (e) => {
        e.preventDefault()
        const comment = this.props.body
        // console.log("comment",comment)
        const slug = this.props.slug
        this.props.createComments(comment, slug)
    }

    deleteComments = (slug, id) => {
        this.props.deleteComments(slug, id)
    }

    render() {
        const {currentUser, body, slug} = this.props
        // console.log(this.props.slug)
        if (!currentUser) {
            return (
                <div className="col-xs-12 col-md-8 offset-md-2">
                    {/*登陆注册链接*/}
                    <p>
                        <Link to="/login">登录</Link>
                        &nbsp;or&nbsp;
                        <Link to="register">注册</Link>
                    </p>
                    {/*评论列表*/}
                    <CommentList comments={this.props.comments}/>
                </div>
            )
        } else {
            return (
                <div className="col-xs-12 col-md-8 offset-md-2">
                    {/*添加评论入口*/}
                    <form className="card comment-form" onSubmit={this.createComment}>
                        <div className="card-block">
                            <textarea
                                onChange={this.handleChange}
                                placeholder="添加评论"
                                className="form-control"
                                rows="4"
                                value={body}
                            />
                        </div>
                        <div className="card-footer">
                            <img
                                src={(currentUser && currentUser.avatar) || "https://assets.leetcode-cn.com/aliyun-lc-upload/users/kan-chuan/avatar_1629884682.png?x-oss-process=image%2Fresize%2Ch_40%2Cw_40%2Fformat%2Cwebp"}
                                alt={currentUser && currentUser.username}
                                className="comment-author-img"/>
                            <button className="btn btn-sm btn-primary" type="submit">提交</button>
                        </div>
                    </form>
                    {/*评论列表*/}
                    <CommentList comments={this.props.comments} currentUser={currentUser} slug={slug}
                                 deleteComments={this.props.deleteComments}/>
                </div>
            )
        }
    }

    componentDidMount() {
        // const slug = this.props.slug
        // this.props.getComments(slug)
    }
}

const mapState = state => ({
    ...state.comments
})

const mapDispatch = dispatch => ({
    commentsFieldUpdate: (key, value) => dispatch(action.commentsFieldUpdate(key, value)),
    createComments: (comment, slug) => dispatch(action.createComments(comment, slug)),
    getComments: (slug) => dispatch(action.getComments(slug)),
    deleteComments: (slug, id) => dispatch(action.deleteComments(slug, id)),

})

export default connect(mapState, mapDispatch)(CommentsContainer)
