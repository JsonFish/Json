import request from "@/utils/request";
import { BasicResponse } from "./type";
enum API {
    CategoryList = "/categoryList"
}
export const getCategory = () => {
    return request.get<any, BasicResponse<any>>(API.CategoryList);
};