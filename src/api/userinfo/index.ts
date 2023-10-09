import request from "@/utils/request";
enum API {
    GETINFO_URL = "/userinfo/get/",
}
export const reqGetInfo = (id: number) => {
   return request.get(API.GETINFO_URL + id);
}