<template>
    <el-row style="width: 50rem;">
        <el-col v-for="item in articleList" :span="24" :key="item.id">
            <div @click="toArticle(item.id)" class="card" body-style="padding:0" shadow="hover">
                <el-image class="img" fit="cover" :src="item.articleCover" />
                <div class="text">
                    <div class="top">
                        <p class="title">{{ item.articleTitle }}</p>
                    </div>
                    <div class="middle">
                        <p class="abstract">{{ item.articleSummary }}</p>
                    </div>
                    <div class="bottom">
                        <el-icon size="16">
                            <PriceTag />
                        </el-icon>
                        <el-link v-for="(tag, index) in item.tags" :key="index" class="link" href="" :underline="false"
                            target="_blank">{{ tag.tagName }}</el-link>

                        <el-icon size="14">
                            <Menu />
                        </el-icon>
                        <el-link class="link" href="" :underline="false">{{ item.categoryName }}</el-link>


                        <SvgIcon color="gray" name="like" width="1rem" height="1rem"></SvgIcon>
                        <el-link class="link" :underline="false" href="" target="_blank">{{ item.upvote }}</el-link>
                        <el-icon>
                            <View />
                        </el-icon>
                        <el-link class="link" :underline="false" href="" target="_blank">{{ item.browse }}</el-link>
                        <div class="time">
                            <el-text type="info" size="small">发布于: </el-text>
                            <el-link href="" :underline="false" target="_blank">{{ item.create_time }}</el-link>
                        </div>
                    </div>

                </div>
            </div>
        </el-col>
        <div style="margin:0 auto">
            <el-pagination v-model:current-page=" currentPage" v-model:page-size="pageSize" hide-on-single-page
            :total="total" background layout="prev, pager, next" @size-change="getArticleList"
            @current-change="getArticleList" />
        </div>
    </el-row>
</template>

<script setup lang='ts'>
import { ref, onMounted } from "vue"
import { getArticle } from "@/api/article/index.ts"
import type { ArticleInfo } from "@/api/article/type"
import { useRouter } from "vue-router";
defineOptions({
    name: "ArticleList"
});
const router = useRouter()
const articleList = ref<ArticleInfo[]>([])
const currentPage = ref<number>(1);
const pageSize = ref<number>(5);
const total = ref<number>(0);
onMounted(() => {
    getArticleList()
});
const getArticleList = () => {
    getArticle(currentPage.value, pageSize.value).then(response => {
        articleList.value = response.data.articleList
        total.value = response.data.total
    })
}
const toArticle = (id:number)=>{
    router.push({ path: "/article", query: { id } });
}
</script>

<style scoped lang="scss">
.card {
    border-radius: 12px;
    height: 15rem;
    margin: 1rem 0;
    border: 0;
    background-color: var(--el-card--background-color);
    display: flex;

    .img {
        width: 20rem;
        border-radius: 12px 0 0 12px;
    }

    .text {
        width: 30rem;
        height: 15rem;
        color: var(--text-color);
        position: relative;

        .top {
            height: 25px;
            margin: 20px 20px;

            .title {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 25px;
                font-weight: 700;
            }
        }

        .middle {
            padding: 0 10px;

            .abstract {
                line-height: 25px;
                text-indent: 2em;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }

        .bottom {
            position: absolute;
            bottom: 0;
            padding: 10px;

            .link {
                margin: 0 5px;
            }

            .time {
                margin-top: 20px;
            }
        }
    }
}
</style>