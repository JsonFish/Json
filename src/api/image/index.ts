import request from "@/utils/request";
import { BasicResponse } from "./type";
enum API {
    HomeBackImg = "/homeBackImg",
    LoginImg = "/loginImg"
}
export const homeBackImg = () => {
    return request.get<any, BasicResponse<string>>(API.HomeBackImg);
};
export const loginImg = () => {
    return request.get<any, BasicResponse<string>>(API.LoginImg);
};