export interface BasicResponse<T = any> {
    code: number
    data: T
    message: string
}

export interface LinksType {
    title: string
    url: string
}
export interface Information {
    blogAvatar: string
    blogName: string
    link: LinksType[]
}