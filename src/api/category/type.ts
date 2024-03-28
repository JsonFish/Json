export interface BasicResponse<T = any> {
    code: number
    data: T
    message: string
}

export interface CategoryInfo {
    id: number
    categoryName: string
    categoryImage: string
}