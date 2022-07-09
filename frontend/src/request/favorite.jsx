import apiClient from "./apiClient";

const favoriteRequest = {
    addFavorite: (slug) => apiClient.post('/favorite/' + slug),
    removeFavorite: (slug) => apiClient.delete('/favorite/' + slug),
}
export default favoriteRequest