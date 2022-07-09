import apiClient from "./apiClient";

const userRequest = {
    register: (email, username, password) => apiClient.post("/users", {user: {email, username, password}}),
    login: (email, password) => apiClient.post("/users/login", {user: {email, password}}),
    get: (username) => apiClient.get("/users/" + username),
    // get: () => apiClient.get("/users/"),
    update: (user) => apiClient.put("/users", {user}),
}
export default userRequest