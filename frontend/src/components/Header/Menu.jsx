import {memo} from 'react';
import {Link} from 'react-router-dom'

const HeaderMenu = memo(({currentUser}) => {
    // currentUser : store(内存) - localstorage（本地）
    if (currentUser) { //已登录
        return (
            <ul className="nav navbar-nav pull-xs-right">
                <li className="nav-item">
                    <Link to='/' className="nav-link">
                        主页
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to='/article/new' className="nav-link">
                        写作
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to='/setting' className="nav-link">
                        设置
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={`/profile/${currentUser.username}`} className="nav-link">
                        <img alt="avatar"
                             src={currentUser.avatar || "https://assets.leetcode-cn.com/aliyun-lc-upload/users/kan-chuan/avatar_1629884682.png?x-oss-process=image%2Fresize%2Ch_40%2Cw_40%2Fformat%2Cwebp"}/>
                        {currentUser.username}
                    </Link>
                </li>
            </ul>
        )

    } else { //未登录
        return (
            <ul className="nav navbar-nav pull-xs-right">
                <li className="nav-item">
                    <Link to='/' className="nav-link">
                        主页
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to='/login' className="nav-link">
                        登录
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to='/register' className="nav-link">
                        注册
                    </Link></li>
            </ul>
        )
    }
})

export default HeaderMenu