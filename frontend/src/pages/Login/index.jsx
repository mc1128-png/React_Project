import {PureComponent} from "react";
import {store} from "../../store";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {push} from "connected-react-router";
import Errors from "../../components/Errors";
import *as action from '../../store/actions/user'

class Login extends PureComponent {
    state = {
        email: "",
        password: ''
    }

    changeUserEmail = e => {
        this.props.onEmailChange("email", e.target.value)
    }

    changePassword = e => {
        this.props.onPasswordChange("password", e.target.value)
    }

    submitForm = (email, password) => (e) => {
        e.preventDefault()
        this.props.onSubmit(email, password)
    }

    componentDidUpdate(prevProps) {
        if (this.props.redirect && this.props.redirect !== prevProps.redirect) {
            store.dispatch(push(this.props.redirect))
        }
    }

    componentWillUnmount() {
        // this.props.onUnload()
    }

    render() {
        const {email, password, errors} = this.props
        // console.log(errors)
        // console.log("email", email, "password", password)
        return (
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1>登录</h1>
                        {/*跳转到登陆*/}
                        <p className="text-xs-center">
                            <Link to="/register">
                                没有账号直接注册？
                            </Link>
                        </p>
                        {/*错误显示页面*/}
                        <Errors errors={errors}/>
                        {/*表单数据*/}
                        <form onSubmit={this.submitForm(email, password)}>
                            <fieldset className="form-group">
                                <input className="form-control form-control-lg" type="text" placeholder="用户邮箱"
                                       value={email}
                                       onChange={this.changeUserEmail}/>
                            </fieldset>
                            <fieldset className="form-group">
                                <input className="form-control form-control-lg" type="text" placeholder="用户密码"
                                       value={password}
                                       onChange={this.changePassword}/>
                            </fieldset>
                            <button className="btn btn-lg btn-primary pull-xs-right" type="submit">登录</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state.user
})

const mapDispatchToProp = dispatch => {
    return {
        onEmailChange: (key, value) => dispatch(action.userFieldUpdate(key, value)),
        onPasswordChange: (key, value) => dispatch(action.userFieldUpdate(key, value)),
        onSubmit: (email, password) => dispatch(action.loginSubmit(email, password)),
        onUnload: () => dispatch(action.unload())
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(Login)