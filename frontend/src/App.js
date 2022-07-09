import React, {Fragment, PureComponent, Suspense} from "react";
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import *as action from './store/actions/user'
import Auth from "./Auth";
import {getData} from "./utils/localStorage";
import Header from './components/Header'
import Home from "./pages/Home";

// 首屏加载慢：代码分割 => 动态加载 => 懒加载
// 页面无关组件 => 拆分成新的bundle => 无关组件被加载时才会下载到本地
// import Login from "./pages/Login";
// import Register from "./pages/Register";
const Login = React.lazy(() => import('./pages/Login'))
const Register = React.lazy(() => import('./pages/Register'))
const Setting = React.lazy(() => import('./pages/Setting'))
const Profile = React.lazy(() => import('./pages/Profile'))
const ArticleNew = React.lazy(() => import('./pages/ArticleNew'))
const ArticleEdit = React.lazy(() => import('./pages/ArticelEdit'))
const ArticleSingle = React.lazy(() => import('./pages/ArticleSingle'))


class App extends PureComponent {
    componentDidMount() {
        // 本地获取用户信息
        const currentUser = getData("currentUser")
        if (currentUser) {
            // 同步到store
            this.props.syncUser(currentUser)
        }
    }

    render() {
        const {currentUser} = this.props
        return (
            <Fragment>
                {/*Header*/}
                <Header currentUser={currentUser}/>
                {/*主体页面*/}
                <Suspense fallback={<p>Loading...</p>}>
                    <Switch>
                        <Route path="/" component={Home} exact/>
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>
                        <Auth currentUser={currentUser}>
                            <Switch>
                                <Route path="/article/new" component={ArticleNew}/>
                                <Route path="/article/edit/:slug" component={ArticleEdit}/>
                                <Route path="/article/:slug" component={ArticleSingle}/>
                                <Route path="/setting" component={Setting}/>
                                <Route path="/profile/:username" component={Profile}/>
                            </Switch>
                        </Auth>
                    </Switch>
                </Suspense>
            </Fragment>
        )
    }
}

const mapState = state => ({currentUser: state.user.currentUser})
// 同步本地用户信息
const mapDispatch = dispatch => ({
    syncUser: (user) => dispatch(action.userSyncResult(user))
})
export default connect(mapState, mapDispatch)(App);
