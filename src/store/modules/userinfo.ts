// 创建用户相关的仓库
import { defineStore } from "pinia";
import { reqGetInfo  } from "@/api/userinfo";
const useUserinfoStore = defineStore("Userinfo", {
    state: () => {
        return {
        };
    },
    // 异步/逻辑的地方
    actions: {
        async getUserinfo (id:number){
           const result:any = await reqGetInfo(id)
           if(result.code == 200){
            return result.data
           }
        }
    }  
})
// 对外暴露
export default useUserinfoStore;