export interface UrlInfo {
  url: string;
}
export interface FileData {
  data: UrlInfo;
}
export interface BasicResponse<T = any> {
    code: number
    data: T
    message: string
}