import {memo} from 'react'
import {PAGE_LIMIT} from "../../constant";

const Pagination = props => {
    // props : 文章总条数 count / 当前第几页 current
    const {count, currentPage, onPageClick} = props

    // [条数<= PAGE_LIMIT 不需要做分页]
    if (count <= PAGE_LIMIT) {
        return null
    }

    // [条数 >PAGE_LIMIT  需要做分页]
    // 1) 条数 =>页数
    const pageNums = []
    for (let page = 1; page <= Math.ceil(count / PAGE_LIMIT); page++) {
        pageNums.push(page)
    }

    // 2) 构建分页组件内容
    return (
        <nav>
            <ul>
                {
                    pageNums.map(pageNum => {
                        // 当前页
                        const isCurrentPage = pageNum === currentPage
                        // 页码
                        return (
                            <li key={pageNum} className={isCurrentPage ? 'page-item active' : 'page-item'}>
                                <button
                                    type="button"
                                    className="page-link"
                                    onClick={
                                        () => {
                                            onPageClick(pageNum)
                                        }
                                    }
                                >{pageNum}
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}

export default memo(Pagination)