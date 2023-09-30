import request from "@/utils/request";


enum API {
    LOGIN_URL = "/user/login",
}
// 登录
export const reqLogin = (data:any) =>
    request.post(API.LOGIN_URL, data);