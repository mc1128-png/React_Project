import apiClient from "./apiClient";

const profileRequest = {
    get: (username) => apiClient.get('/follow/' + username),
    follow: (username) => apiClient.post('/follow/' + username),
    unfollow: (username) => apiClient.delete('/follow/' + username),
}
export default profileRequest