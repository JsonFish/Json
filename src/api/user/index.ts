import request from "@/utils/request";

enum API {
    LOGIN_URL = "/user/login",
    SIGNIN_URL = "/user/signin"
}
// 登录
export const reqLogin = (data:any) =>
    request.post(API.LOGIN_URL, data);
// 注册
export const reqSignIn = (data:any)=>
    request.post(API.SIGNIN_URL,data)
