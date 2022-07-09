import {getData} from "../utils/localStorage";

// 请求地址 restful
const baseURL = "http://localhost:8000/api/v1"

// 请求方式
const method = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE"
}

// 请求头 : 响应数据类型/Token
const contentType = {
    JSON: "application/json;charset=UTF-8",
    FORM: "application/x-www-form-urlencoded; charset=UTF-8"
};

const getHeaders = () => {
    const token = getData('token')
    const headers = {
        "Content-Type": contentType.JSON,
        "Authorization": `Token ${token}`
    }
    return headers
}

// const token = getData("token")
//
// const headers = {
//     "Content-Type": contentType.JSON,
//     "Authorization": `Token ${token}`
// }

// get
const getRequest = async (url) => {
    const response = await fetch(baseURL + url, {
        method: method.GET,
        headers: getHeaders()
    })
    return response.json()
}

// post
const postRequest = async (url, body) => {
    // let bodyParser = JSON.parse(JSON.stringify(body))
    // console.log(bodyParser, bodyParser.user)
    const response = await fetch(baseURL + url, {
        method: method.POST,
        headers: getHeaders(),
        body: JSON.stringify(body) // js Obj => string
        // body: JSON.parse(JSON.stringify(body)) // js Obj => string
    })
    return response.json()
}

// put
const putRequest = async (url, body) => {
    const response = await fetch(baseURL + url, {
        method: method.PUT,
        headers: getHeaders(),
        body: JSON.stringify(body) // js Obj => string
    })
    return response.json()
}

// delete
const deleteRequest = async (url) => {
    const response = await fetch(baseURL + url, {
        method: method.DELETE,
        headers: getHeaders(),
    })
    return response.json()
}

const apiClient = {
    get: getRequest,
    post: postRequest,
    put: putRequest,
    delete: deleteRequest
}

export default apiClient