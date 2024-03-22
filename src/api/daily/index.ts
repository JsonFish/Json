import request from "@/utils/request";
import { DynamicData, BasicResponse } from "./type";
enum API {
    Daily = "/dailyList"
}
export const getDaily = (currentPage: number, pageSize: number) => {
    return request.get<any, BasicResponse<DynamicData>>(API.Daily + `?currentPage=${currentPage}&pageSize=${pageSize}`);
};