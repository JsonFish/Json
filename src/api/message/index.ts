import request from "@/utils/request";
import type { BasicResponse } from "./type";
enum API {
    Message = "/messageList",
    addMessage = "/message"
}
export const getMessage = () => {
    return request.get<any, BasicResponse<any>>(API.Message);
};
export const addMessage = (data: any) => {
    return request.post<any, BasicResponse<any>>(API.addMessage, data);
};