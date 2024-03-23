<template>
    <div class="home">
        <div class="top">
            <div class="title">
                <div class="name">
                    <p>Json Blog</p>
                </div>
                <TypeWriter class="type-writer" :typeList="saying" size="16px" color="white"></TypeWriter>
            </div>
        </div>
        <div class="main">
            <div class="svg">
                <SvgIcon name="down" width="1.5rem" height="1.5rem"></SvgIcon>
            </div>
            <div class="center">
                <Article></Article>
                <Introduce></Introduce>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script setup lang='ts'>
import Footer from "@/components/Footer/index.vue";
import TypeWriter from "@/components/typeWriter/index.vue"
const saying = ["斯人若彩虹,遇上方知有", "书山有路勤为径, 学海无涯苦作舟"];
import Introduce from "./introduce/index.vue"
import Article from "./articleList/index.vue"
defineOptions({
    name: "Home"
});
</script>

<style lang="scss" scoped>
.home {
    .top {
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;

        .title {
            margin-bottom: 100px;

            .name {
                width: 100%;
                font-size: 50px;
                font-weight: 600;
                color: white;
                margin-bottom: 20px;
            }
        }
    }

    .main {
        width: 100%;
        // height: 100vh;
        background: var(--home-background-color);
        position: relative;
        border: 1px solid transparent;

        .svg {
            width: 100%;
            height: 50px;
            position: absolute;
            display: flex;
            justify-content: space-around;
            align-items: center;
            animation-name: move;
            animation-duration: 2s;
            animation-iteration-count: infinite;
            animation-timing-function: ease;
        }

        .center {
            width: 70rem;
            height: 100%;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            // background-color: pink;
        }
    }
}

@keyframes move {
    0% {
        top: -5vh;
    }

    50% {
        top: -10vh;
    }

    100% {
        top: -5vh;
    }
}
</style>