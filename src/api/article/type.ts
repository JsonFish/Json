export interface BasicResponse<T = any> {
    code: number
    data: T
    message: string
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
    id: number | string;
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