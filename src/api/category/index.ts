import request from "@/utils/request";
import { BasicResponse, CategoryInfo } from "./type";
enum API {
    CategoryList = "/categoryList"
}
export const getCategory = () => {
    return request.get<any, BasicResponse<CategoryInfo[]>>(API.CategoryList);
};