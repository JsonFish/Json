<!-- 侧边栏 -->
<template>
    <div>
        <!-- 头部 -->
        <div class="header-container">
            <ul>
                <li>HelloWorld</li>
                <li>
                    <SvgIcon name="jd" width="20px" height="20px"></SvgIcon>首页
                </li>
                <li>
                    <SvgIcon name="bbt" width="20px" height="20px"></SvgIcon>文章
                </li>
                <li>
                    <SvgIcon name="bbt" width="20px" height="20px"></SvgIcon>娱乐
                </li>
                <li>
                    <SvgIcon name="bbt" width="20px" height="20px"></SvgIcon>友链
                </li>
                <li>
                    <SvgIcon name="bbt" width="20px" height="20px"></SvgIcon>留言板
                </li>
                <li>
                    <SvgIcon name="bbt" width="20px" height="20px"></SvgIcon>关于
                </li>
            </ul>
        </div>
    </div>
</template>
<script setup lang="ts">

</script>

<style scoped lang="scss">
.header-container {
    width: 100%;
    height: 50px;
    background-color: #2f3132;
    color: #fff;

    ul {
        width: 45%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 100%;

        li {
            cursor: pointer;
            list-style: none;
            display: flex;

            SvgIcon {
                display: flex;
                // align-items: center;
            }
        }
    }

    // 第一个li
    ul li:first-child {
        font-size: 20px;
        margin-left: 0vw;
    }
}
</style>