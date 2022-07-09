import React, {Component} from "react";
// import ButtonInfo from "./ButtonInfo";
import *as action from '../../store/actions/profile'
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Articles from '../Article';
import {getArticlesByAuthor, getArticlesByFavorite,} from "../../store/actions/articles";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.match.params.username,
            tab: 1,
        }
    }

    handleClick = (e) => {
        e.preventDefault()
        window.location.reload() // 关注之后页面发生变化，使用强制刷新页面
        if (this.props.profile.following) {
            this.props.onUnFollow(this.props.profile.username)
        } else {
            this.props.onFollow(this.props.profile.username)
        }
    }

    render() {
        const {profile, currentUser} = this.props
        const isCurrentUser = currentUser && currentUser.username === profile.username
        return (
            <div className="profile-page">
                {/*用户信息*/}
                <div className="user-info">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-md-10 offset-md-1">
                                {/*1.1 用户基本信息：头像 用户名 简介*/}
                                <img
                                    src={profile.avatar || "https://assets.leetcode-cn.com/aliyun-lc-upload/users/kan-chuan/avatar_1629884682.png?x-oss-process=image%2Fresize%2Ch_40%2Cw_40%2Fformat%2Cwebp"}
                                    alt={profile.username}/>
                                <h4>{profile.username}</h4>
                                <p>{profile.bio}</p>
                                {/*1.2 用户行为：自己页面：编辑设置； 不是自己页面：关注/取消关注*/}
                                {/*登录用户(A)和查看页面的用户(B) A||B:按钮显示*/}
                                {/*<ButtonInfo*/}
                                {/*    isCurrentUser={isCurrentUser}*/}
                                {/*    profile={profile}*/}
                                {/*/>*/}
                                {/*路由跳转一个页面，如果这个页面里面还有页面会造成props丢失*/}
                                {
                                    isCurrentUser ?
                                        <Link to="/setting" className="btn btn-sm btn-outline-secondary action-btn"><i
                                            className=""></i>编辑设置</Link>
                                        : <button
                                            // className="btn btn-sm  action-btn" // ?
                                            className={profile.following ? 'btn-secondary' : 'btn-outline-secondary'}
                                            onClick={this.handleClick}
                                        ><i className="fa fa-user-plus"></i>{' '}{profile.following ? "取消关注" : "添加关注"}
                                        </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {/*用户文章*/}
                <div className='container'>
                    <div className="row">
                        <div className="col-xs-12 col-md-10 offset-md-1">
                            {/* 选项卡 */}
                            <div className='aticles-toggle'>
                                <ul className="nav nav-pills outline-active">
                                    <li className='nav-item'>
                                        <button
                                            className={this.state.tab === 1 ? "nav-link active" : "nav-link"}
                                            onClick={
                                                () => {
                                                    this.setState({
                                                        tab: 1
                                                    })
                                                    this.props.getArticlesByAuthor(this.state.username)
                                                }
                                            }
                                        >我的文章
                                        </button>
                                    </li>
                                    <li className='nav-item'>
                                        <button
                                            className={this.state.tab === 2 ? "nav-link active" : "nav-link"}
                                            onClick={
                                                () => {
                                                    this.setState({
                                                        tab: 2
                                                    })
                                                    this.props.getArticlesByFavorite(this.state.username)
                                                }
                                            }
                                        >喜欢文章
                                        </button>
                                    </li>
                                </ul>
                            </div>
                            {/* 文章列表 */}
                            <Articles
                                articles={this.props.articleReducer.articles}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    /*    shouldComponentUpdate(nextProps, nextState, nextContext) {
            // const urlPropsUsername = nextProps.match.params.username
            if (this.props.profile.username !== nextProps.match.params.username) { // machao3 mc5
                return true
            }
            if (this.props.profile.username === nextProps.profile.username) {
                return false
            }
            return true
        }*/

    /*    componentDidUpdate(prevProps, prevState, snapshot) {
            const urlPropsUsername = this.props.match.params.username
            // console.log("urlPropsUsername", urlPropsUsername) // machao3 mc5 用新数据去请求，更新界面
            this.props.getProfile(urlPropsUsername)
        }*/

    componentDidMount() {
        // 获取profile
        this.props.getProfile(this.state.username)
        this.props.getArticlesByAuthor(this.state.username)
    }

    /*    componentWillUnmount() {
            // 数据清除
            this.props.onUnload()
        }*/
}

const mapState = state => ({
    currentUser: state.user.currentUser,
    profile: state.profile,
    articleReducer: state.articles // index里面的reducer
})
const mapDispatch = dispatch => ({
    getProfile: username => dispatch(action.getProfile(username)),
    onUnload: () => dispatch(action.profileUnload()),
    onFollow: username => dispatch(action.addFollow(username)),
    onUnFollow: username => dispatch(action.unFollow(username)),
    getArticlesByAuthor: username => dispatch(getArticlesByAuthor(username, 1)), // 未作分页
    getArticlesByFavorite: username => dispatch(getArticlesByFavorite(username, 1)),
})

export default connect(mapState, mapDispatch)(Profile)