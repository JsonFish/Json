// 进行axios二次封装 使用请求与响应拦截器
import axios from "axios";
import { ElMessage } from "element-plus";
// 引入用户相关仓库
import useUserStore from "@/store/modules/user";
// 引入路由
import router from '@/router';
// 第一步:利用axios对象的create方法,去创建axios实例(其他的配置:基础路径、超时的时间)
const request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API, // 基础路径上会携带/api
    timeout: 5000, // 设置超时的时间
});
// 第二步：request 实例添加请求与响应拦截器
request.interceptors.request.use((config) => {
    // 获取用户相关的小仓库，获取token，登录成功以后携带给服务器
    const userStore = useUserStore();
    if (userStore.token) {
        config.headers.authorization = userStore.token;
    }
    //config配置对象,headers属性请求头,经常给服务器端携带公共参数
    // 返回配置对象
    return config;
});
//第三步:响应拦截器
request.interceptors.response.use(
    (response) => {
        // 成功回调
        // 简化数据
        return response.data;
    },
    (error) => {
        //失败回调:处理http网络错误的
        //定义一个变量:存储网络错误信息
        let msg = "";
        //http状态码
        const status = error.response.status;
        // 路由实例
        const userStore = useUserStore();
        switch (status) {
            case 401:
                msg = "token已过期,请重新登录";
                userStore.userLogOut();
                router.push('/');
                break;
            case 403:
                msg = "无权访问";
                break;
            case 404:
                msg = "请求地址错误";
                break;
            case 500:
                msg = "服务器出现问题";
                break;
            default:
                msg = "无网络";
        }
        // 提示错误信息
        ElMessage({
            type: "error",
            message: msg,
        });
        return Promise.reject(error);
    },
);
export default request;
