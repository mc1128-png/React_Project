import React from "react";
import {memo} from "react";
import CommentItem from "./CommentItem";

const CommentList = (props) => {
    const {comments, currentUser, deleteComments, slug} = props
    if (!comments || comments.length === 0) {
        return <div>当前没有评论</div>
    } else {
        return (
            <div>
                {
                    props.comments.map(comment => {
                        return <CommentItem key={comment.id} comment={comment} currentUser={currentUser}
                                            deleteComments={deleteComments} slug={slug}/>
                    })
                }
            </div>
        )
    }
}

export default memo(CommentList)