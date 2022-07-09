import {PureComponent} from "react";
import {connect} from "react-redux";
import *as action from '../../store/actions/user'
import SettingForm from "./SettingForm";
import Errors from "../../components/Errors";
import {store} from "../../store";
import {replace} from 'connected-react-router'

/*
* 用户设置
* 条件：登录
* 用户信息：从userState
* 01 获取用户信息
* 02 回显数据
* */

class Setting extends PureComponent {
    render() {
        return (
            <div className='container page'>
                <div className='row'>
                    <div className='col-md-6 offset-md-3 col-xs-12'>
                        <h1 className='text-xs-center'>设置</h1>

                        {/* 错误显示 */}
                        <Errors errors={this.props.errors}/>

                        {/* 设置form */}
                        <SettingForm/>

                        {/* 退出按钮 */}
                        <button className='btn btn-outline-danger' onClick={this.props.onClickLogout}>退出</button>
                    </div>
                </div>
            </div>
        )
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.redirect && this.props.redirect !== prevProps.redirect) {
            store.dispatch(replace(this.props.redirect))
        }
    }
}


const mapState = state => ({
    ...state.user
})

const mapDispatch = dispatch => {
    return {
        onUnload: () => dispatch(action.unload()),
        onClickLogout: () => dispatch(action.logout()) // 退出
    }
}


export default connect(mapState, mapDispatch)(Setting)