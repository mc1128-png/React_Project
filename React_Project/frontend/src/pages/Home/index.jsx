import {PureComponent} from 'react'
import {connect} from 'react-redux'
import {getTags} from '../../store/actions/articles'
import Banner from './Banner'
import Main from './Main'
import Tags from './Tags'

class Home extends PureComponent {
    render() {
        // console.log(this.props.currentUser)
        return (
            <div className="home-page">
                {/*上:广告:bannber*/}
                <Banner/>

                {/*下: {左:选项卡,文章列表  右侧:标签}*/}
                <div className="container page">
                    <div className="row">
                        <Main/>

                        {/* 标签 */}
                        <div className="col-md-3">
                            <div className="sidebar">
                                <p>热门标签</p>
                                <Tags tags={this.props.tags}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.props.getTags()
    }
}

const mapState = state => ({
    ...state.articles,
    ...state.user
})

const mapDispatch = dispatch => ({
    getTags: () => dispatch(getTags()),
})

export default connect(mapState, mapDispatch)(Home)