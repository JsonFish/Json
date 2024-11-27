import request from "@/utils/request";
import type { BasicResponse, LinkInfo } from "./type";
enum API {
    Link = "/linkList"
}
export const getLink = () => {
    return request.get<any, BasicResponse<LinkInfo[]>>(API.Link);
};

export const applyLink = () => {
    return request.post<any, BasicResponse<LinkInfo[]>>(API.Link);
};