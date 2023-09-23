import SvgIcon from './SvgIcon/index.vue';
import Header from './Layout/Header/index.vue'
import Main from './Layout/Main/index.vue'
import Footer from './Layout/Footer/index.vue'
import Love from './Animations/Love/index.vue'
import SpiderWeb from './Animations/SpiderWeb/index.vue'
import type { App, Component } from 'vue';


const components: { [name: string]: Component } = {
    SvgIcon,
    Header,
    Main,
    Footer,
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