import {PureComponent} from 'react'
import {connect} from 'react-redux';
import * as action from '../../store/actions/article'
import Errors from '../../components/Errors'

// 编辑未做标签更新

class ArticleEdit extends PureComponent {

    changeTitle = (e) => {
        this.props.changeTitle('title', e.target.value)
    }

    changeDesc = e => {
        this.props.changeDesc('description', e.target.value)
    }

    changeBody = e => {
        this.props.changeBody('body', e.target.value)
    }

    // state 是在组件里
    onSubmitForm = (article) => (e) => {
        e.preventDefault()
        // 网络接口请求 ： 注册
        this.props.updateArticle(article)
    }

    render() {
        const {title, slug, description, body, tags, errors} = this.props
        return (
            <div className='editor-page'>
                <div className='container page'>
                    <div className='row'>
                        <div className='col-md-10 offset-md-1 col-xs-12'>
                            <h1>编辑文章</h1>
                            {/* 错误信息 */}
                            <Errors errors={errors}/>
                            {/* 编辑文章 */}
                            <form>
                                <fieldset className='form-group'>
                                    <input
                                        className='form-control form-control-lg'
                                        type="text"
                                        placeholder='文章标题'
                                        value={title || ""}
                                        onChange={this.changeTitle}
                                    />
                                </fieldset>
                                <fieldset className='form-group'>
                                    <input
                                        className='form-control form-control-lg'
                                        type="text"
                                        placeholder='文章描述'
                                        value={description || ""}
                                        onChange={this.changeDesc}
                                    />
                                </fieldset>
                                <fieldset className='form-group'>
                            <textarea
                                className='form-control form-control-lg'
                                rows={4}
                                placeholder='用markdown编辑文章'
                                value={body || ""}
                                onChange={this.changeBody}
                            />
                                </fieldset>
                                <button
                                    className='btn btn-primary pull-xs-right'
                                    type='button'
                                    onClick={this.onSubmitForm({title, slug, description, body, tags})}
                                >
                                    更新文章
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.props.getArticleBySlug(this.props.match.params.slug)
    }

    componentWillUnmount() {
        // 清理仓库数据
        this.props.onUnload()
    }
}

const mapState = state => ({...state.article})

const mapDispatch = dispatch => {
    return {
        changeTitle: (key, value) => dispatch(action.articleFieldUpdate(key, value)),
        changeDesc: (key, value) => dispatch(action.articleFieldUpdate(key, value)),
        changeBody: (key, value) => dispatch(action.articleFieldUpdate(key, value)),
        updateArticle: (article) => dispatch(action.updateArticle(article)),
        getArticleBySlug: (slug) => dispatch(action.getArticleBySlug(slug)),
        onUnload: () => dispatch(action.unload()),
    }
}

export default connect(mapState, mapDispatch)(ArticleEdit)