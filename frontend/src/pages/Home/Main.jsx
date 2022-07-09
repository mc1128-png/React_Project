import {PureComponent} from 'react'
import {memo} from "react";
import {connect} from "react-redux";
import Articles from '../Article'
import {getTabArticles, syncPage, syncTab} from "../../store/actions/articles";

// 选项卡 : 关注 / 所有 / 标签（过滤）

// 1 当前登录用户关注的作者的文章
const YourTab = memo((props) => {
    if (!props.currentUser) {
        return null
    } else {
        const handleClick = e => {
            e.preventDefault()
            props.onTabClick("follows", 1)
        }
        return (
            <li className='nav-item'>
                <button
                    type='button'
                    className={props.tab === 'follows' ? 'nav-link active' : 'nav-link'}
                    onClick={handleClick}
                >关注
                </button>
            </li>
        )
    }
})

// 2 全局文章
const GlobalTab = memo((props) => {
    const handleClick = e => {
        e.preventDefault()
        props.onTabClick("all", 1)
    }
    if (props.currentUser) {
        return null
    } else {
        return (
            <li className='nav-item'>
                <button
                    type='button'
                    className={props.tab === 'all' ? 'nav-link active' : 'nav-link'}
                    onClick={handleClick}
                >全部
                </button>
            </li>
        )
    }
})


// 3 定义标签选项卡
const TagTab = memo((props) => {
    // 获取标签
    const {tag} = props
    // 没有标签
    if (!tag) {
        return null
    }
    // 有标签
    return (
        <li className='nav-item'>
            <button
                type='button'
                className='nav-link active'
            >
                <i className="fa fa-bookmark"></i> {tag}
            </button>
        </li>
    )
})


class Main extends PureComponent {
    componentDidMount() {
        if (this.props.currentUser) { // 登录请求关注作者文章
            this.props.syncTab('follows')
            this.props.syncPage(1)
            this.props.onTabClick()
        } else { // 未登录 请求全局文章
            this.props.syncTab('all')
            this.props.syncPage(1)
            this.props.onTabClick()
        }
    }

    handleTabChange = (tab, page) => {
        this.props.syncTab(tab)
        this.props.syncPage(page)
        this.props.onTabClick()
    }

    render() {
        // console.log("this.props.currentUser", this.props.currentUser)
        return (
            <div className="col-md-9">
                {/* 选项卡 */}
                <div className='feed-toggle'>
                    <ul className='nav nav-pills outline-active'>
                        <YourTab tab={this.props.tab} onTabClick={this.handleTabChange}
                                 currentUser={this.props.currentUser}/>
                        <GlobalTab tab={this.props.tab} onTabClick={this.handleTabChange}
                                   currentUser={this.props.currentUser}/>
                        <TagTab tag={this.props.tag}/>
                    </ul>
                </div>

                {/*文章列表 : 分页*/}
                <Articles
                    articles={this.props.articles}
                    articlesCount={this.props.count}
                    currentPage={this.props.currentPage}
                    onPageClick={(page) => {
                        // console.log('pagenum',page)
                        // 同步页面
                        this.props.syncPage(page)
                        // 请求页面数据
                        this.props.onTabClick()
                    }}
                />
            </div>
        )
    }
}

const mapState = state => ({
    ...state.user, // {currentUser} => props
    ...state.articles
})

const mapDispatch = dispatch => ({
    syncTab: (tab) => dispatch(syncTab(tab)),
    syncPage: (page) => dispatch(syncPage(page)),
    onTabClick: () => dispatch(getTabArticles())
})

export default connect(mapState, mapDispatch)(Main)
