import React, {memo} from 'react'
import {Link} from "react-router-dom";

const ButtonInfo = memo((props) => {
    const {isCurrentUser, profile} = this.props
    if (isCurrentUser) {
        return (
            <Link to="/setting" className="btn btn-sm btn-outline-secondary action-btn"><i className=""></i>编辑设置</Link>
        )
    } else {
        return (
            <button className={profile.following ? "btn-secondary" : "btn-outline-secondary"}
                    // className="btn btn-sm action-btn"
            ><i className="fa fa-user-plus"></i>{profile.following ? "添加关注" : "取消关注"}</button>
        )
    }
})

export default ButtonInfo