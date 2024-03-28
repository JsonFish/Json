import request from "@/utils/request";
import type { BasicResponse, ArticleInfo, ArticleList } from "./type";
enum API {
    ArticleList = "/articleList",
    ArticleInfo = "/articleInfo"
}
export const getArticleList = (currentPage: number, pageSize: number) => {
    return request.get<any, BasicResponse<ArticleList>>(API.ArticleList + `?currentPage=${currentPage}&pageSize=${pageSize}`);
};
export const getArticleInfo = (id: number) => {
    return request.get<any, BasicResponse<ArticleInfo>>(API.ArticleInfo + `?id=${id}`);
};