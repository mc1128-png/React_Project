import {PureComponent} from "react";
import {connect} from "react-redux";
import *as action from '../../store/actions/user'
import {Link} from "react-router-dom";
import Errors from "../../components/Errors";

class Register extends PureComponent {
    state = {
        email: "",
        username: '',
        password: ''
    }

    changeUserEmail = e => {
        this.props.onEmailChange("email", e.target.value)
    }

    changeUserName = e => {
        this.props.onUsernameChange("username", e.target.value)
    }

    changePassword = e => {
        this.props.onPasswordChange("password", e.target.value)
    }

    submitForm = (email, username, password) => (e) => {
        e.preventDefault()
        this.props.onSubmit({email, username, password})
    }

    componentWillUnmount() {
        this.props.onUnload()
    }

    render() {
        const {email, username, password, errors} = this.props
        // console.log(errors)
        // console.log("email", email, "username", username, "password", password)
        return (
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1>注册</h1>
                        {/*跳转到登陆*/}
                        <p className="text-xs-center">
                            <Link to="/login">
                                有账号直接登录？
                            </Link>
                        </p>
                        {/*错误显示页面*/}
                        <Errors errors={errors}/>
                        {/*表单数据*/}
                        <form onSubmit={this.submitForm(email, username, password)}>
                            <fieldset className="form-group">
                                <input className="form-control form-control-lg" type="text" placeholder="用户名称"
                                       value={username}
                                       onChange={this.changeUserName}/>
                            </fieldset>
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
                            <button className="btn btn-lg btn-primary pull-xs-right" type="submit">注册</button>
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
        onUsernameChange: (key, value) => dispatch(action.userFieldUpdate(key, value)),
        onPasswordChange: (key, value) => dispatch(action.userFieldUpdate(key, value)),
        onSubmit: (user) => dispatch(action.registerSubmit(user)),
        onUnload: () => dispatch(action.unload())
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(Register)