import request from "@/utils/request";
import type { BasicResponse, Refresh, imageCaptcha, LoginData } from "./type"
enum API {
    Login = "/login",
    Register = "/register",
    EmailCode = "/register/sendMsg",
    Refresh = "/refreshToken"
}

/** 获取图片验证码 */
export const getCaptcha = () => {
    return request.get<any, BasicResponse<imageCaptcha>>("/imageCaptcha");
};

// 登录
export const reqLogin = (data: any) =>
    request.post<any, BasicResponse<LoginData>>(API.Login, data);

// 发送邮箱验证码
export const reqGetCode = (data: any) =>
    request.post(API.EmailCode, data)

// 注册
export const reqSignIn = (data: any) =>
    request.post(API.Register, data)

/** 刷新token */
export const reqRefreshToken = () => {
    return request.get<null, BasicResponse<Refresh>>(API.Refresh);
};