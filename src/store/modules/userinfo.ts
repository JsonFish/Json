// 用户信息处理相关仓库
import { defineStore } from "pinia";
import { reqGetInfo  } from "@/api/userinfo";
const useUserinfoStore = defineStore("Userinfo", {
    state: () => {
        return {
        };
    },
    // 异步/逻辑的地方
    actions: {
        async getUserinfo (){
           const result:any = await reqGetInfo()
           console.log(result);
           if(result.code == 200){
            return result.data
           }
        }
    }  
})
// 对外暴露
export default useUserinfoStore;