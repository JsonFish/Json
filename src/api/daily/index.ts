import request from "@/utils/request";
import { DynamicData, BasicResponse } from "./type";
enum API {
    Daily = "/dynamic"
}
export const getDaily = () => {
    return request.get<any, BasicResponse<DynamicData>>(API.Daily);
};