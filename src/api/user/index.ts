import request from "@/utils/request";

enum API {
    // 登录
    LOGIN_URL = "/user/login",
    // 注册
    SIGNIN_URL = "/register/save",
    // 邮箱验证码
    GET_CODE = "/register/sendMsg"
}
// 登录
export const reqLogin = (data: any) =>
    request.post(API.LOGIN_URL, data);
// 发送邮箱验证码
export const reqGetCode = (data:any)=>
    request.post(API.GET_CODE,data)
// 注册
export const reqSignIn = (data: any) =>
    request.post(API.SIGNIN_URL, data)
