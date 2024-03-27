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
                        <div class="infor">
                            <span class="icon">
                                <el-icon size="16">
                                    <PriceTag />
                                </el-icon>
                                <span>标签:</span>
                                <span v-for="(tag, index) in item.tags" :key="index" style="margin-right: 5px;">{{
                                    tag.tagName }}</span>
                            </span>

                            <span class="icon">
                                <el-icon size="16">
                                    <Menu />
                                </el-icon>
                                <span>分类:</span>
                                <span>{{ item.categoryName }}</span>
                            </span>

                            <div class="icon">
                                <el-icon size="16">
                                    <Star />
                                </el-icon>
                                <span>点赞量:</span>
                                <span>{{ item.upvote }}</span>
                            </div>

                            <div class="icon">
                                <el-icon size="16">
                                    <View />
                                </el-icon>
                                <span>浏览量:</span>
                                <span>{{ item.browse }}</span>
                            </div>
                        </div>
                        <div class="time">
                            <el-text size="small">发布于: </el-text>
                            <el-link href="" :underline="false" target="_blank">{{ item.create_time
                                }}</el-link>
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
const loading = ref<boolean>(false);
onMounted(() => {
    getArticleList()
});
const getArticleList = () => {
    loading.value = true
    getArticle(currentPage.value, pageSize.value).then(response => {
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
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 25px;
                font-weight: 700;
            }

            .title:hover {
                color: rgb(0, 183, 255);
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
            padding: 10px;

            // background-color: pink;
            .infor {
                display: flex;

                .icon {
                    margin-right: 5px;
                    display: flex;
                    color: var(--text-color);
                    font-size: 14px;
                }

                .icon:hover {
                    color: rgb(0, 183, 255)
                }
            }

            .time {
                margin-top: 20px;
            }
        }
    }
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 6px var(--el-card--background-color);
    /* 盒子阴影 */
}
</style>