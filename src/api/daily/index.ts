import request from "@/utils/request";
import { DynamicData, BasicResponse } from "./type";
enum API {
    Daily = "/daily"
}
export const getDaily = (currentPage: number, pageSize: number) => {
    return request.get<any, BasicResponse<DynamicData>>(API.Daily + `?currentPage=${currentPage}&pageSize=${pageSize}`);
};