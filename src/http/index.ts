import request from "./request";
const http = new request({
    baseURL: 'http://localhost:8089',
    timeout: 1000000
})
export default http
