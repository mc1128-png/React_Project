import {connect} from "react-redux"
import {PureComponent} from 'react'
import * as action from '../../store/actions/user'

class SettingForm extends PureComponent {

    changeUserEmail = (e) => {
        this.props.onEmailChange('email', e.target.value)
    }

    changeUserName = e => {
        this.props.onUsernameChange('username', e.target.value)
    }
    changeAvatar = e => {
        this.props.onAvatarChange('avatar', e.target.value)
    }

    changeBio = e => {
        this.props.onBioChange('bio', e.target.value)
    }

    changePassword = e => {
        this.props.onPasswordChange('password', e.target.value)
    }

    // state 是在组件里
    onSubmitForm = (email, username, avatar, bio, password) => (e) => {
        e.preventDefault()
        let user = {email, username, password, avatar, bio}
        if (!user.password) {
            delete user.password // 没修改 不要提交
        }
        this.props.onUpdateUser(user)
    }

    render() {
        const {email, avatar, username, bio, password} = this.props
        return (
            <form onSubmit={this.onSubmitForm(email, username, avatar, bio, password)}>
                <fieldset className='form-group'>
                    <input
                        className='form-control form-control-lg'
                        type="text"
                        placeholder='用户邮箱'
                        value={email || ""}
                        onChange={this.changeUserEmail}
                    />
                </fieldset>
                <fieldset className='form-group'>
                    <input
                        className='form-control form-control-lg'
                        type="text"
                        placeholder='用户头像'
                        value={avatar || ""}
                        onChange={this.changeAvatar}
                    />
                </fieldset>
                <fieldset className='form-group'>
                    <input
                        className='form-control form-control-lg'
                        type="text"
                        placeholder='用户名称'
                        value={username}
                        onChange={this.changeUserName}
                    />
                </fieldset>
                <fieldset className='form-group'>
            <textarea
                className='form-control form-control-lg'
                rows='4'
                placeholder='用户简介'
                value={bio}
                onChange={this.changeBio}
            />
                </fieldset>
                <fieldset className='form-group'>
                    <input
                        className='form-control form-control-lg'
                        type="password"
                        placeholder='用户密码'
                        value={password}
                        onChange={this.changePassword}
                    />
                </fieldset>
                <button
                    className='btn btn-lg btn-primary pull-xs-right'
                    type='submit'
                >更新设置
                </button>
            </form>
        )
    }
}

// 动态值 直接映射，
const mapState = state => ({
    ...state.user
})

const mapDispatch = dispatch => {
    return {
        onEmailChange: (key, value) => dispatch(action.userFieldUpdate(key, value)),
        onUsernameChange: (key, value) => dispatch(action.userFieldUpdate(key, value)),
        onPasswordChange: (key, value) => dispatch(action.userFieldUpdate(key, value)),
        onAvatarChange: (key, value) => dispatch(action.userFieldUpdate(key, value)),
        onBioChange: (key, value) => dispatch(action.userFieldUpdate(key, value)),
        onUpdateUser: (user) => dispatch(action.updateSubmit(user)),
        onUnload: () => dispatch(action.unload()),
        onClickLogout: () => dispatch(action.logout())
    }
}

export default connect(mapState, mapDispatch)(SettingForm)