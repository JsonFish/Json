import request from "@/utils/request";
enum API {
    Infor = "/config"
}
export const blogInfor = () => {
    return request.get<any, any>(API.Infor);
};