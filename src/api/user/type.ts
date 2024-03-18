export interface BasicResponse<T = any> {
    code: number
    data: T
    message: string
}

export interface imageCaptcha {
    imageBase64: string
}

export interface LoginData {
    username: string
    avatar: string
    accessToken: string
    refreshToken: string
}
export type Refresh = {
    accessToken: string;
    refreshToken: string;
};

