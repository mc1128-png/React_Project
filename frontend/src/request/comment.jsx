import apiClient from "./apiClient";

// comment业务请求封装
const commentRequest = {
    create: (comment, slug) => apiClient.post(`/comment/${slug}`, {comment}),
    get: (slug) => apiClient.get(`/comment/${slug}`),
    delete: (slug, id) => apiClient.delete(`/comment/${slug}/${id}`),
}

export default commentRequest