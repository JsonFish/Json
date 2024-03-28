import request from "@/utils/request";
import type { BasicResponse, MessageInfo } from "./type";
enum API {
    Message = "/messageList",
    AddMessage = "/message"
}
export const getMessage = () => {
    return request.get<any, BasicResponse<MessageInfo[]>>(API.Message);
};
export const addMessage = (data: { text: string }) => {
    return request.post<any, BasicResponse<any>>(API.AddMessage, data);
};