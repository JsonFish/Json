export interface BasicResponse<T = any> {
    code: number
    data: T
    message: string
}

export interface ArticleList {
    articleList: ArticleInfo[]
    total: number
}
export interface ArticleInfo {
    articleContent: string;
    articleCover: string;
    articleSummary: string;
    articleTitle: string;
    author: string;
    browse?: number;
    categoryId: number;
    categoryName?: string;
    create_time?: string;
    id: number;
    isTop: number;
    order: number;
    originUrl: string;
    status: number;
    tagIds: number[];
    tags?: Tag[];
    type: number;
    update_time?: string;
    upvote?: number;
}

export interface Tag {
    tagName: string;
}
