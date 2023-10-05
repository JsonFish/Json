import SvgIcon from './SvgIcon/index.vue';
import Love from './Animations/Love/index.vue'
import SpiderWeb from './Animations/SpiderWeb/index.vue'
import type { App, Component } from 'vue';

const components: { [name: string]: Component } = {
    SvgIcon,
    Love,
    SpiderWeb
};

// 注册components文件夹内部全部全局组件
export default {
    install(app: App) {
        Object.keys(components).forEach((key: string) => {
            app.component(key, components[key]);
        })
    }
}