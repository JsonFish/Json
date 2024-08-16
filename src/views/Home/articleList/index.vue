<template>
    <el-row style="width: 50rem;">
        <el-col v-if="loading" v-for="i in 3" class="card" :span="24" :key="i">
            <el-skeleton style="border-radius: 12px; display: flex; background: var(--skeleton-background-color)">
                <template #template>
                    <el-skeleton-item variant="image" style="width: 20rem; height: 15rem;border-radius: 12px;" />
                    <div style="margin: 20px;width: 30rem">
                        <el-skeleton-item variant="text" style="width: 15rem; height: 25px;" />
                        <el-skeleton-item variant="text" style="width: 25rem; height: 25px;margin-top: 20px" />
                        <el-skeleton-item variant="text" style="width: 25rem; height: 20px;margin-top: 80px" />
                        <el-skeleton-item variant="text" style="width: 15rem; height: 15px;margin-top: 20px" />
                    </div>
                </template>
            </el-skeleton>
        </el-col>
        <el-col v-else v-for=" item in articleList" :span="24" :key="item.id">
            <div @click="toArticle(item.id)" class="card" body-style="padding:0" shadow="hover">
                <div class="imgbox">
                    <el-image class="img" fit="cover" :src="item.articleCover" />
                </div>
                <div class="text">
                    <div class="top">
                        <span class="title">{{ item.articleTitle }}</span>
                    </div>
                    <div class="middle">
                        <span class="abstract">{{ item.articleSummary }}</span>
                    </div>
                    <div class="bottom">
                            <div class="flex mb-1">
                            <el-icon size="13" class="pt-1.5">
                                <PriceTag />
                            </el-icon>
                            <el-text size="small">标签:</el-text>
                            <el-tag type="primary" size="small" v-for="(tag, index) in item.tags" :key="index" class="mx-1">{{
                                tag.tagName }}</el-tag>
                        </div>

                        <div class="infor">
                            <!-- <p class="icon">
                                <el-icon size="14" class="pt-1">
                                    <PriceTag />
                                </el-icon>
                                <el-text size="small">标签:</el-text>
                                <el-text type="primary" size="small" v-for="(tag, index) in item.tags" :key="index" class="mr-3">{{
                                tag.tagName }}</el-text>
                            </p> -->
                            <span class="icon">
                                <el-icon size="14" class="pt-1">
                                    <Menu />
                                </el-icon>
                                <el-text size="small">分类: {{ item.categoryName }}</el-text>
                            </span>

                            <div class="icon">
                                <el-icon size="14" class="pt-1">
                                    <Star />
                                </el-icon>
                                <el-text size="small">点赞量: {{ item.upvote }}</el-text>
                            </div>

                            <div class="icon">
                                <el-icon size="14" class="pt-1">
                                    <View />
                                </el-icon>
                                <el-text size="small">浏览量: {{ item.browse }}</el-text>
                            </div>
                        </div>
                        <div>
                            <el-text size="small">发布于: </el-text>
                            <el-text size="small">{{ item.create_time }}</el-text>
                        </div>
                    </div>
                </div>
            </div>
        </el-col>
        <div style="margin:0 auto">
            <el-pagination  v-model:current-page="currentPage" v-model:page-size="pageSize"
                :total="total" background layout="prev, pager, next" @size-change="getArticleList"
                @current-change="getArticleList" />
        </div>
    </el-row>
</template>

<script setup lang='ts'>
import { ref, onMounted } from "vue"
import { getArticleList } from "@/api/article/index.ts"
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
const loading = ref<boolean>(false);
onMounted(() => {
    getArticle()
});
const getArticle = () => {
    loading.value = true
    getArticleList(currentPage.value, pageSize.value).then(response => {
        articleList.value = response.data.articleList;
        total.value = response.data.total
        loading.value = false
    })
}
const toArticle = (id: number) => {
    router.push({ path: "/article", query: { id } });
}
</script>

<style scoped lang="scss">
.card {
    border-radius: 12px;
    height: 15rem;
    margin-bottom: 1.5rem;
    border: 0;
    background-color: var(--el-card--background-color);
    display: flex;
    transition: transform 0.5s ease;

    .imgbox {
        width: 20rem;
        border-radius: 12px 0 0 12px;
        overflow: hidden;
    }

    .img {
        height: 15rem;
        transition: transform 0.5s ease;
    }

    .img:hover {
        transform: scale(1.1);
    }

    .text {
        width: 30rem;
        height: 15rem;
        color: var(--text-color);
        position: relative;
        cursor: pointer;

        .top {
            height: 25px;
            margin: 20px 20px;

            .title {
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                overflow: hidden;
                font-size: 25px;
                font-weight: 700;
            }

            .title:hover {
                color: rgb(0, 183, 255);
                // overflow: visible;
                // text-overflow: initial;
                // white-space: normal;
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

            .abstract:hover {
                color: rgb(0, 179, 255);
            }
        }

        .bottom {
            position: absolute;
            bottom: 0;
            padding: 5px 10px;

            .infor {
                display: flex;

                .icon {
                    margin-right: 8px;
                    display: flex;
                    color: var(--text-color);
                    font-size: 14px;
                }
            }
        }
    }
}

.card:hover {
    transform: translateY(-5px);
    // box-shadow: 0 4px 6px var(--el-card--background-color);
    /* 盒子阴影 */
}
</style>