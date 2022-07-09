import {memo} from 'react'
import {connect} from 'react-redux'
import {syncTag, getTabArticles, syncPage} from '../../store/actions/articles'

const Tags = memo((props) => {
    const {tags} = props
    if (tags) {
        return (
            <div className='tag-list'>
                {
                    tags.map(tag => {
                        return (
                            <button
                                type='button'
                                className='tag-default tag-pill'
                                key={tag}
                                onClick={
                                    () => {
                                        props.syncTag(tag)
                                        props.syncPage(1)
                                        props.onTabClick()
                                    }
                                }
                            >
                                {tag}
                            </button>
                        )
                    })
                }
            </div>
        )
    } else {
        return (
            <div>加载标签...</div>
        )
    }
})

const mapDispatch = dispatch => ({
    syncTag:(tag)=>dispatch(syncTag(tag)),
    syncPage:(page)=>dispatch(syncPage(page)),
    onTabClick: () => dispatch(getTabArticles())
})

export default connect(null, mapDispatch)(Tags)