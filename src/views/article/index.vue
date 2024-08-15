<template>
    <!-- 保证editorId相同 -->
    <div class="article">
        <div class="top">
            <span>{{ articleInfo?.articleTitle }}</span>
        </div>
        <div class="bottom">
            <div class="main">
                <el-card class="card-preview" shadow="always" body-style="padding:0">
                    <div v-if="loading">
                        <el-skeleton class="skeleton" animated :rows="2">
                        </el-skeleton>
                        <el-skeleton class="skeleton" animated :rows="1">
                        </el-skeleton>
                        <el-skeleton class="skeleton" animated :rows="5">
                        </el-skeleton>
                        <el-skeleton class="skeleton" animated :rows="5">
                        </el-skeleton>
                        <el-skeleton class="skeleton" animated :rows="3">
                        </el-skeleton>
                    </div>
                    <div v-else>
                        <div class="information">
                            <div class="infor-top">
                                <span class="icon">
                                    <el-icon size="16">
                                        <Timer />
                                    </el-icon>
                                    <span>发布时间:</span>
                                    <span>{{ articleInfo?.create_time }}</span>
                                </span>
                            </div>
                            <div class="middle">
                                <div class="icon">
                                    <el-icon size="16">
                                        <Menu />
                                    </el-icon>
                                    <span>分类:</span>
                                    <span>{{ articleInfo?.categoryName }}</span>
                                </div>
                                <span class="icon">
                                    <el-icon size="16">
                                        <PriceTag />
                                    </el-icon>
                                    :
                                    <span v-for="(tag, index) in articleInfo?.tags" :key="index"
                                        style="margin-right: 5px;">{{ tag.tagName }}</span>

                                </span>
                                <div class="icon">
                                    <el-icon size="16">
                                        <Star />
                                    </el-icon>
                                    <span>点赞量:</span>
                                    <span>{{ articleInfo?.upvote }}</span>
                                </div>
                                <div class="icon">
                                    <el-icon size="16">
                                        <View />
                                    </el-icon>
                                    <span>浏览量:</span>
                                    <span>{{ articleInfo?.browse }}</span>
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
                            :previewTheme="state.previewTheme" :editorId="state.id"
                            :modelValue="articleInfo?.articleContent" />
                    </div>

                </el-card>

                <el-affix :offset="40">
                    <el-card header="目录" class="card_catalog" shadow="always" body-style="padding:0">
                        <div v-if="loading">
                            <el-skeleton class="skeleton" animated :rows="2">
                            </el-skeleton>
                            <el-skeleton class="skeleton" animated :rows="2">
                            </el-skeleton>
                            <el-skeleton class="skeleton" animated :rows="5">
                            </el-skeleton>
                        </div>
                        <div v-else>
                            <MdCatalog :editorId="state.id" :scrollElement="scrollElement" :offsetTop="700"
                                :scrollElementOffsetTop="70" />
                        </div>
                        <template #footer>
                        </template>
                    </el-card>
                </el-affix>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from "vue";
import Footer from "@/components/Footer/index.vue"
import { useRoute } from "vue-router";
import { MdPreview, MdCatalog } from "md-editor-v3";
import useThemeStore from '@/store/modules/theme.ts'
import { getArticleInfo } from "@/api/article"
import type { ArticleInfo } from "@/api/article/type"
defineOptions({
    name: "article"
});
const themeStore = useThemeStore()
const route = useRoute();
const loading = ref<boolean>(true)
const state = reactive<any>({
    theme: "dark",
    previewTheme: "default",
    codeTheme: "atom",
    id: "editor"
});
const articleInfo = ref<ArticleInfo>();
onMounted(() => {
    loading.value = true
    if (themeStore.darkTheme) {
        state.theme = 'dark'
    } else {
        state.theme = 'light'
    }
    getArticleInfo(route.query.id as unknown as number).then((response) => {
        articleInfo.value = response.data;
        loading.value = false;
    })

})
// 监听主题变换
watch(() => themeStore.darkTheme, (newValue) => {
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

const scrollElement = document.documentElement;

</script>
<style lang="scss" scoped>
.article {
    width: 100%;

    .top {
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--page-title-color);
        font-size: 30px;
        width: 100%;
        height: 20vh;
    }

    .bottom {
        background: var(--home-background-color);
        border-radius: 20px 20px 0 0;
        .main {
            margin: 0 auto;
            width: 70rem;
            min-height: 80vh;
            display: flex;
            justify-content: space-between;
            min-height: 80vh;

            .card-preview {
                border: 0;
                border-radius: 10px;
                width: 50rem;
                background: var(--el-card--background-color);
                margin: 1rem 0;

                .skeleton {
                    background: var(--skeleton-background-color)
                }

                .information {
                    padding: 20px 20px 10px;

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
                            border: 1px solid var(--text-color);
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

            .card_catalog {
                font-size: 14px;
                width: 18rem;
                border: 0;
                margin: 1rem 0;
                color: var(--text-color);
                background-color: var(--el-card--background-color);

                .skeleton {
                    background: var(--skeleton-background-color);
                    min-height: 300px;
                }
            }
        }
    }
}
</style>