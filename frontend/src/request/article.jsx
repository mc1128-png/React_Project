import apiClient from "./apiClient";
import {PAGE_LIMIT} from "../constant";

// 限制条数  页数  偏移量
const LIMIT = PAGE_LIMIT
const OFFSET = (page) => {
    return (page - 1) * LIMIT
}

// article业务请求封装
const articleRequest = {
    // 一个文章
    create: article => apiClient.post('/article', {article}),
    get: slug => apiClient.get(`/article/${slug}`),
    update: article => apiClient.put('/article/' + article.slug, {article}),
    delete: slug => apiClient.delete('/article/' + slug),

    // 文章列表
    // page =>  limit 限制数量 5，offset : (page-1)*limit = offset
    getAuthor: (author, page) => apiClient.get(`/article?author=${author}&limit=${6}&offset=${OFFSET(page)}`),
    getFavorite: (author, page) => apiClient.get(`/article?favorite=${author}&limit=${LIMIT}&offset=${OFFSET(page)}`),
    all: page => apiClient.get(`/article?limit=${LIMIT}&offset=${OFFSET(page)}`),
    byTag: (tag, page) => apiClient.get(`/article?tag=${tag}&limit=${LIMIT}&offset=${OFFSET(page)}`),
    followArticles: (page) => apiClient.get(`/article/follow?limit=${LIMIT}&offset=${OFFSET(page)}`),
}

export default articleRequest