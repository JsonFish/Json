export interface BasicResponse<T = any> {
    code: number
    data: T
    message: string
}
export interface LinkInfo {
    id?: number
    siteAvatar: any
    siteDesc: string
    siteName: string
    siteUrl: string
}