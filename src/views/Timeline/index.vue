<template>
    <!-- 保证editorId相同 -->
    <div class="article">
        <div class="top">
            <span>vue-routerj进阶知识</span>
        </div>
        <div class="bottom">
            <div class="main">
                <el-card class="card-preview" shadow="always" body-style="padding:0">
                    <div class="information">
                        <div class="infor-top">
                            <span class="icon">
                                <el-icon size="16">
                                    <Timer />
                                </el-icon>
                                <span>发布时间:</span>
                                <span>2024-03-10 23:55:09</span>
                            </span>
                        </div>
                        <div class="middle">
                            <div class="icon">

                                <el-icon size="16">
                                    <Menu />
                                </el-icon>
                                <span>分类:</span>
                                <span>前端</span>
                            </div>
                            <span class="icon">
                                <el-icon size="16">
                                    <PriceTag />
                                </el-icon>
                                :
                                <span style="margin-right: 5px;">vue</span>
                                <span>前端</span>
                                <span>axios</span>

                            </span>
                            <div class="icon">
                                <el-icon size="16">
                                    <Star />
                                </el-icon>
                                <span>点赞量:</span>
                                <span>99</span>
                            </div>
                            <div class="icon">
                                <el-icon size="16">
                                    <View />
                                </el-icon>
                                <span>浏览量:</span>
                                <span>999</span>
                            </div>
                        </div>
                        <div class="infor-bottom">
                            <el-dropdown @command="handlePreviewTheme" trigger="click">
                                <span>
                                    <el-button class="btn">文章主题 {{ state.previewTheme }}</el-button>
                                </span>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item command="default">default</el-dropdown-item>
                                        <el-dropdown-item command="github">github</el-dropdown-item>
                                        <el-dropdown-item command="vuepress">vuepress</el-dropdown-item>
                                        <el-dropdown-item command="mk-cute">mk-cute</el-dropdown-item>
                                        <el-dropdown-item command="smart-blue">smart-blue</el-dropdown-item>
                                        <el-dropdown-item command="cyanosis">cyanosis</el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                            <el-dropdown @command="handleCodeTheme" trigger="click">
                                <span>
                                    <el-button class="btn">代码主题 {{ state.codeTheme }}</el-button>
                                </span>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item command="atom">atom</el-dropdown-item>
                                        <el-dropdown-item command="a11y">a11y</el-dropdown-item>
                                        <el-dropdown-item command="gradient">gradient</el-dropdown-item>
                                        <el-dropdown-item command="kimbie">kimbie</el-dropdown-item>
                                        <el-dropdown-item command="paraiso">paraiso</el-dropdown-item>
                                        <el-dropdown-item command="qtcreator">qtcreator</el-dropdown-item>
                                        <el-dropdown-item command="stackoverflow">stackoverflow</el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </div>
                    </div>
                    <MdPreview class="mdPreview" showCodeRowNumber :theme="state.theme" :codeTheme="state.codeTheme"
                        :previewTheme="state.previewTheme" :editorId="state.id" :modelValue="text" />
                </el-card>

                <el-affix :offset="40">
                    <el-card header="目录" class="catalog" shadow="always" body-style="padding:0">
                        <MdCatalog :editorId="state.id" :scrollElement="scrollElement" />
                    </el-card>
                </el-affix>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import { reactive, watch } from "vue";
import { MdPreview, MdCatalog } from "md-editor-v3";
import useThemeStore from '@/store/modules/theme.ts'
const themeStore = useThemeStore()
const state = reactive({
    theme: "dark",
    previewTheme: "default",
    codeTheme: "atom",
    id: "editor"
});
// 监听主题变换
watch(() => themeStore.lightOrDark, (newValue) => {
    if (newValue) {
        state.theme = 'dark'
    } else {
        state.theme = 'light'
    }
})
const handlePreviewTheme = (command: string) => {
    state.previewTheme = command
}
const handleCodeTheme = (command: string) => {
    state.codeTheme = command
}
const text =
    '\n## Object.assign()\n`Object.assign()` 是 JavaScript 中的一个方法，用于复制一个或多个源对象的所有可枚举属性到目标对象。这个方法主要用于对象的合并和复制。\n\n以下是 `Object.assign()` 的基本用法：\n\n```js\n\tlet target = { a: 1, b: 2 };  \n\tlet source1 = { b: 3, c: 4 };  \n\tlet source2 = { d: 5 };  \n\tObject.assign(target, source1, source2);  \n\tconsole.log(target); // { a: 1, b: 3, c: 4, d: 5 }\n```\n\n在上述例子中，`source1` 和 `source2` 的可枚举属性都被复制到了 `target` 对象中。如果 `target` 已经存在相同的属性，那么 `source` 的属性会覆盖 `target` 的同名属性。\n\n值得注意的是，`Object.assign()` 是浅拷贝，也就是说，如果源对象的值是对象，那么只进行引用复制，而不进行深度复制。所以如果你需要深度复制，可能需要使用其他库（如 lodash）或者手动实现。\n## trim()\n在JavaScript中，`trim()`是一个字符串方法，用于删除字符串两侧的空白字符（包括空格、制表符、换行符等）。这个方法不会影响原始字符串，而是返回一个新的字符串。\n\n这是`trim()`的基本用法：\n\n```js\njavascript复制代码\n\tlet str = "   Hello World!   ";  \n\tlet trimmedStr = str.trim();  \n\tconsole.log(trimmedStr); // 输出 "Hello World!"\n```\n\n在上述例子中，`trim()`删除了字符串两侧的空白字符，只留下了"Hello World!"。\n\n另外，需要注意的是，`trim()`只删除前导和尾随的空白字符，不会删除字符串中间的空白字符。如果你需要删除字符串中间的空白字符，可以使用其他方法，比如使用正则表达式或多次调用`trim()`。\n## splice()\n`splice()` 是 JavaScript 中的数组方法，用于在任何位置添加/删除项目，然后返回被删除的项目。\n\n它的语法是：\n\n```js\njavascript复制代码\n\tarray.splice(index, deleteCount, item1, ..., itemX)\n```\n\n参数说明：\n\n-   `index`：必需。一个整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。\n-   `deleteCount`：必需。要删除的项目数量。如果设置为 0，则不会删除项目，而是把 `item1` 到 `itemX` 添加到 `array` 中。\n-   `item1, ..., itemX`：可选。向 `array` 添加的新项目。\n\n返回值：\n\n-   被删除的元素数组。\n\n下面是一个简单的例子：\n\n```js\njavascript复制代码\n\tlet array = ["apple", "banana", "cherry"];  \n\tconsole.log(array); // 输出: ["apple", "banana", "cherry"]  \n\tlet removed = array.splice(1, 2, "mango", "orange"); // 在索引1的位置删除2个元素，并添加"mango"和"orange"  \n\tconsole.log(array); // 输出: ["apple", "mango", "orange"]  \n\tconsole.log(removed); // 输出: ["banana","cherry"]\n```\n\n在这个例子中，我们首先创建了一个包含三个元素的数组。然后我们调用 `splice()` 方法，在索引1的位置删除2个元素（即 "banana"），并添加 "mango" 和 "orange"。最后，我们打印出新的数组以及被删除的元素数组。\n## el-button 强制失去焦点\n```js\n\u003cel-button @click=“a($event)”/\u003e\n\na(evt){\n\nconst target = evt.target\nif (target.nodeName === \'SPAN\') {\n  target.parentNode.blur()\n}\ntarget.blur()\n\n}\n```\n\n## JSON.parse和JSON.stringify的用法\n`JSON.parse()`方法将JSON格式字符串转换为js对象(属性名没有双引号)\u003cbr\u003e\n`JSON.stringify()`先将js对象转换为JSON字符串\n## 深度选择器\n\n![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6e410706736646ce8b079e877c72c6fa~tplv-k3u1fbpfcp-watermark.image?)、\n## Token解读\n![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0630379453c240a48c3f966e8b23e6a4~tplv-k3u1fbpfcp-watermark.image?)\n-   **iat (Issued At)** : 表示 JWT 的签发时间，即令牌生成的时间戳。在验证令牌时，可以用于判断令牌是否在一定时间内签发，有助于检测令牌的新鲜度。\n-   **exp (Expiration Time)** : 表示 JWT 的过期时间，即令牌有效的时间戳。在验证令牌时，可以用于判断令牌是否过期，从而保证令牌的有效性。\n## sql\n将查询的数据按照创建时间倒序排列 \n```sql\nSELECT * FROM your_table_name ORDER BY create_time DESC;\n```\n将查询的数据按照创建时间正序排列\n```sql\nSELECT * FROM your_table_name ORDER BY create_time ASC;\n```';

const scrollElement = document.documentElement;

</script>
<style lang="scss" scoped>
.article {
    width: 100%;

    .top {
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--text-color);
        font-size: 30px;
        width: 100%;
        height: 200px;
    }

    .bottom {
        background: var(--home-background-color);

        .main {
            margin: 0 auto;
            width: 70rem;
            display: flex;
            justify-content: space-between;
            // background-color: pink;

            .card-preview {
                border: 0;
                border-radius: 10px;
                width: 50rem;
                background-color: var(--el-card--background-color);
                margin: 1rem 0;

                .information {
                    padding: 20px 20px 0;

                    background: var(--home-background-color);

                    .infor-top {
                        display: flex;
                    }



                    .icon {
                        display: flex;
                        color: var(--text-color);
                        // padding: 5px;
                        margin-right: 20px;
                    }

                    .icon:hover {
                        color: skyblue
                    }

                    .middle {
                        display: flex;
                        margin-top: 10px;
                    }

                    .infor-bottom {
                        margin-top: 10px;

                        .btn {
                            background-color: transparent;
                            margin-right: 10px;
                            color: var(--text-color);
                        }
                    }

                }

                .mdPreview {
                    background-color: transparent;
                }
            }

            .catalog {
                width: 18rem;
                border: 0;
                margin: 1rem 0;
                color: var(--text-color);
                background-color: var(--el-card--background-color);
            }
        }
    }
}
</style>