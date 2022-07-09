import apiClient from "./apiClient";

const tagRequest = {
    getAll: () => apiClient.get('/tag'),
    createTag: () => apiClient.get('/tag'),
    deleteTag: (slug) => apiClient.get('/tag' + slug),
};

export default tagRequest