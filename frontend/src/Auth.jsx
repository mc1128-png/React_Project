import * as React from "react";
import {Redirect} from "react-router-dom";

// Auth ：对子组件进行了保护 只有登录才能访问
const Auth = props => {
    const {children, currentUser} = props
    // const path = props.location.pathname

    if (currentUser) { //已登录 =>已授权=>访问子组件
        return children // 显示子组件内容
    }

    // 未登录 ： 没有权限访问 直接重新向 登录页面 刷新一下导致username丢失
    return <Redirect to="/login"/>
}

export default Auth