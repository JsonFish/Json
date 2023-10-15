// pinia持久化
import { PiniaPluginContext } from "pinia";
// 初始化的时候函数persistedstate会执行一次,有几个store模块执行几次
export function persistedstate(context: PiniaPluginContext) {
    // 根据模块名，拿到对应的locaStora
    const currentState = JSON.parse(localStorage.getItem(context.store.$id) || "{}")
    // 将获取的数据放到pinia对应模块里面
    context.store.$patch(currentState)
    // 每次state变化的时候都要讲state保存在localStorage当中
    // $subscribe 监听state变化
    context.store.$subscribe((_store, state) => {
        // 两个参数
        // 第一个是当前修改store的详细信息
        // 第二个是当前修改的状态
        localStorage.setItem(_store.storeId, JSON.stringify(state))

    }, {
        // 每次初始化都会触发，组件卸载依赖还在
        detached: true,
    })
}