import request from "@/utils/request";
import { BasicResponse } from "./type";
enum API {
    ArticleList = "/articleList",
    ArticleInfo = "/articleInfo"
}
export const getArticle = (currentPage: number, pageSize: number) => {
    return request.get<any, BasicResponse<any>>(API.ArticleList + `?currentPage=${currentPage}&pageSize=${pageSize}`);
};
export const getArticleInfo = (id: number) => {
    return request.get<any, BasicResponse<any>>(API.ArticleInfo + `?id=${id}`);
};