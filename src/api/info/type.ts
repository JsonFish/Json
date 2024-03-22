export interface BasicResponse<T = any> {
    code: number
    data: T
    message: string
}

export interface Information {
    aliPay: string;
    avatarBg: string;
    bilibiliLink: string;
    blogAvatar: string;
    blogName: string;
    blogNotice: string;
    giteeLink: string;
    githubLink: string;
    personalSay: string;
    qqGroup: string;
    qqLink: string;
    weChatGroup: string;
    weChatLink: string;
    weChatPay: string;
}