import request from "@/utils/request";
import { BasicResponse } from "./type";
enum API {
    ArticleList = "/articleList"
}
export const getArticle = (currentPage: number, pageSize: number) => {
    return request.get<any, BasicResponse<any>>(API.ArticleList + `?currentPage=${currentPage}&pageSize=${pageSize}`);
};