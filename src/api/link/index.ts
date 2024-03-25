import request from "@/utils/request";
import type { BasicResponse } from "./type";
enum API {
    Link = "/linkList"
}
export const getLink = () => {
    return request.get<any, BasicResponse<any>>(API.Link);
};