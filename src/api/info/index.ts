import request from "@/utils/request";
import type { BasicResponse, Information } from "./type";
enum API {
    Infor = "/bloggerInfo"
}
export const blogInfor = () => {
    return request.get<any, BasicResponse<Information>>(API.Infor);
};