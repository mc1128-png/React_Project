import {Component} from "react";
import {Link} from "react-router-dom"
import HeaderMenu from './Menu'

class Header extends Component {
    render() {
        const {currentUser} = this.props
        return (
            <nav className="navbar navbar-light">
                <div className="container">
                    {/* 左侧 */}
                    <Link to='/' className='navbar-brand'>BLOG-V1</Link>
                    {/* 右侧 */}
                    <HeaderMenu currentUser={currentUser}/>
                </div>
            </nav>
        )
    }
}

export default Header