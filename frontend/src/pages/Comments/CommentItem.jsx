import React from "react";
import {memo} from "react";
import {Link} from "react-router-dom";

const CommentItem = (props) => {
    const {comment, currentUser, deleteComments, slug} = props
    const showDelete = currentUser && comment && currentUser.username === comment.User.username
    return (
        <div className="card">
            {/*评论内容*/}
            <div className="card-block">
                <p className="card-text">{comment.body}</p>
            </div>

            {/*评论人信息*/}
            <div className="card-footer">
                <Link to={`/profile/${comment.User.username}`} className="comment-author">
                    <img
                        src={comment.User.avatar || "https://assets.leetcode-cn.com/aliyun-lc-upload/users/kan-chuan/avatar_1629884682.png?x-oss-process=image%2Fresize%2Ch_40%2Cw_40%2Fformat%2Cwebp"}
                        alt={comment.User.username}/>
                </Link>
                {" "}
                <Link to={`/profile/${comment.User.username}`} className="comment-author">
                    {comment.User.username}
                </Link>
                <span>
                    {new Date(comment.createdAt).toLocaleDateString()}
                </span>
                {/*删除按钮（登录用户===评论用户）*/}
                {
                    showDelete ? <button className="mod-options btn-danger" onClick={
                        () => {
                            deleteComments(slug, comment.id)
                        }
                    }>删除</button> : null
                }
            </div>
        </div>
    )
}

export default memo(CommentItem)