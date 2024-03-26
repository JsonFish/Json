// 创建用户相关的仓库
import { defineStore } from "pinia";
import { reqLogin, reqRefreshToken } from "@/api/user";

// 封装的本地储存方法
import { setToken, removeToken } from "@/utils/token";
import { LoginParmars } from "@/api/user/type";
const useUserStore = defineStore("User", {
    state: () => {
        return {
            username: '',
            avatar: ''
        };
    },
    // 异步/逻辑的地方
    actions: {
        // 用户登录的方法
        async userLogin(data: LoginParmars) {
            await reqLogin(data).then(response => {
                if (response.code == 200) {
                    this.username = response.data.username
                    this.avatar = response.data.avatar
                    // token 本地存储
                    setToken(response.data);
                } else {
                    return Promise.reject(new Error(response.message));
                }
            })
        },
        // 刷新token
        async handRefreshToken() {
            return new Promise<any>((resolve, reject) => {
                reqRefreshToken()
                    .then(response => {
                        // 刷新成功
                        if (response.code == 200) {
                            // 存储token
                            setToken({
                                accessToken: response.data.accessToken,
                                refreshToken: response.data.refreshToken
                            } as any);
                            resolve(response);
                        } else {
                            reject(response);
                        }
                    })
                    .catch(error => {
                        throw error;
                    });
            });
        },
        // 退出登录
        logOut() {
            this.username = ""
            this.avatar = ""
            removeToken()
        }
    }
})

export default useUserStore;