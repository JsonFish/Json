export interface BasicResponse<T = any> {
    code: number
    data: T
    message: string
}