//存储token
export function setToken(token: string) {
    return sessionStorage.setItem("token", token)
}
export function getToken() {
    return sessionStorage.getItem("token")
}
//存储用户id
export function setUserId(userId: string) {
    return sessionStorage.setItem("userId", userId)
}
export function getUserId() {
    return sessionStorage.getItem("userId")
}
export function removeUserId() {
    return sessionStorage.remove("userId")
}
//清空
export function clearSession() {
    return sessionStorage.clear()
}