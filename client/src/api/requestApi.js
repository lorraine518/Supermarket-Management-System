//引入request
import request from "../utils/request"

//个人中心请求用户数据
export const getCurrentUserInfo=() => request.get("/login/currentaccount")

//请求导航列表
export const getUserMenu=(params) => request.get("/login/getusermenu",params)

