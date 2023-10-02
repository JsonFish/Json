// 创建用户相关的仓库
import { defineStore } from "pinia";
import { reqLogin, reqSignIn } from "@/api/user";
// 封装的本地储存方法
import { GET_TOKEN, SET_TOKEN } from "@/utils/token";
const useUserStore = defineStore("User", {
    state: () => {
        return {
            account: "",
            token: GET_TOKEN(), // 用户的唯一标识
        };
    },
    // 异步/逻辑的地方
    actions: {
        // 用户登录的方法
        async userLogin(data:any) {
            const result:any = await reqLogin(data);
            if (result.code == 200) {
                this.token = result.data.token as string;
                // 本地存储持久化
                SET_TOKEN(result.data.token as string);
                return "ok";
            } else {
                return Promise.reject(new Error(result.message));
            }
        },
        // 用户注册方法
        async userSignIn(data:any){
            const result: any = await reqSignIn(data);
            if(result.code !== 200){
                return Promise.reject(new Error(result.message));
            }
        }
    }
})
// 对外暴露
export default useUserStore;