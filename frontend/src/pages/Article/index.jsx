import {memo} from "react"
import Item from './Item'
import Pagination from "../Pigination";

const Articles = props => {
    const {articles, articlesCount, currentPage, onPageClick} = props

    // 不存在
    if (!articles) {
        return <div className='article-preview'>加载中...</div>
    }

    // 存在 0
    if (articles && articles.length === 0) {
        return (
            <div className='article-preview'>
                这里还没有文章
            </div>
        )
    }

    // 有文章： 【非空】
    // 文章数据 / 【条数<=5 不做分页】
    // 文章数据 / 【条数 >5 做分页】

    return (
        <div>
            {/*文章数据*/}
            {
                articles.map(article => {
                    return <Item article={article} key={article.slug}/>
                })
            }
            {/*分页*/}
            <Pagination
                count={articlesCount}
                currentPage={currentPage}
                onPageClick={onPageClick}
            />
        </div>
    )
}

export default memo(Articles)