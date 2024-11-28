import request from "@/utils/request";
import type { BasicResponse, LinkInfo } from "./type";
enum API {
    Link = "/linkList",
    ApplyLink = "/links",
}
export const getLink = () => {
    return request.get<any, BasicResponse<LinkInfo[]>>(API.Link);
};

export const applyLink = (data:LinkInfo) => {
    return request.post<any, BasicResponse<any>>(data,API.ApplyLink);
};