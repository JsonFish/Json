import request from "@/utils/request";
enum API {
    GETINFO = "/userinfo/",
}
export const reqGetInfo = () => {
    return request.get(API.GETINFO);
}