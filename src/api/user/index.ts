import request from "@/utils/request";
import type { LoginParmars, BasicResponse, Refresh, imageCaptcha, LoginData, signInParmars } from "./type"
enum API {
    Login = "/login",
    Register = "/register",
    Email = "/email",
    Refresh = "/refreshToken"
}

/** 获取图片验证码 */
export const getCaptcha = () => {
    return request.get<any, BasicResponse<imageCaptcha>>("/imageCaptcha");
};

// 登录
export const reqLogin = (data: LoginParmars) =>
    request.post<LoginParmars, BasicResponse<LoginData>>(API.Login, data);

// 发送邮箱验证码
export const GetEmailCode = (eamil: {email:string}) =>
    request.post<any, BasicResponse<any>>(API.Email, eamil)

// 注册
export const reqRegister = (data: signInParmars) =>
    request.post<any, BasicResponse<any>>(API.Register, data)

/** 刷新token */
export const reqRefreshToken = () => {
    return request.get<null, BasicResponse<Refresh>>(API.Refresh);
};