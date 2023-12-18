// 创建用户相关的仓库
import { defineStore } from "pinia";
import { reqLogin } from "@/api/user";
// 封装的本地储存方法
import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from "@/utils/token";
const useUserStore = defineStore("User", {
    state: () => {
        return {
            userinfo: {
                username: '',
                user_pic: ''
            },
            token: GET_TOKEN(), // 用户的唯一标识
        };
    },
    // 异步/逻辑的地方
    actions: {
        // 用户登录的方法
        async userLogin(data: any) {
            console.log(data);
            const result: any = await reqLogin(data);
            console.log(result);
            if (result.code == 200) {
                this.userinfo = result.data.userinfo
                this.token = result.data.token as string;
                // 本地存储持久化
                SET_TOKEN(result.data.token as string);
                return
            } else {
                return Promise.reject(new Error(result.message));
            }
        },
        // 退出登录
        userLogOut() {
            this.userinfo = { username: '', user_pic: '' }
            this.token = ''
            REMOVE_TOKEN()
        }
    }
})
// 对外暴露
export default useUserStore;