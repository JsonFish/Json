<template>
  <!-- 保证editorId相同 -->
  <NoiseBg class="article">
    <div class="top">
      <span>{{ articleInfo?.articleTitle }}</span>
    </div>

    <div class="main">
      <div class="card-preview">
        <div v-if="loading">
          <el-skeleton class="skeleton" animated :rows="2"> </el-skeleton>
          <el-skeleton class="skeleton" animated :rows="1"> </el-skeleton>
          <el-skeleton class="skeleton" animated :rows="5"> </el-skeleton>
          <el-skeleton class="skeleton" animated :rows="5"> </el-skeleton>
          <el-skeleton class="skeleton" animated :rows="3"> </el-skeleton>
        </div>
        <div v-else>
          <div class="information">
            <div class="middle">
              <div class="icon">
                <el-icon size="14" class="pt-1.5">
                  <Menu />
                </el-icon>
                <el-text class="pl-1">{{ articleInfo?.categoryName }}</el-text>
              </div>
              <div class="icon">
                <el-icon size="14" class="pt-2">
                  <PriceTag />
                </el-icon>
                <el-text
                  class="pl-1"
                  v-for="(tag, index) in articleInfo?.tags"
                  :key="index"
                  >{{ tag.tagName }}</el-text
                >
              </div>
              <div class="icon">
                <SvgIcon
                  name="star"
                  color="#606266"
                  width="16px"
                  height="18px"
                  class="pt-0.5"
                ></SvgIcon>
                <el-text class="pl-1">{{ articleInfo?.upvote }}</el-text>
              </div>
              <div class="icon">
                <el-icon size="14" class="pt-2">
                  <View />
                </el-icon>
                <el-text class="pl-1">{{ articleInfo?.browse }}</el-text>
              </div>
              <span class="icon">
                <el-icon size="16" class="pt-1">
                  <Timer />
                </el-icon>
                <el-text class="pl-1">{{ articleInfo?.create_time }}</el-text>
              </span>
            </div>
            <div class="infor-top"></div>

            <div class="infor-bottom">
              <el-dropdown @command="handlePreviewTheme" trigger="click">
                <span>
                  <el-button class="btn" size="small"
                    >文章主题 {{ state.previewTheme }}</el-button
                  >
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      v-for="item in previewThemeList"
                      :key="item"
                      :command="item"
                      >{{ item }}</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              <el-dropdown @command="handleCodeTheme" trigger="click">
                <span>
                  <el-button class="btn" size="small"
                    >代码主题 {{ state.codeTheme }}</el-button
                  >
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      v-for="item in codeThemeList"
                      :key="item"
                      :command="item"
                      >{{ item }}</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
          <MdPreview
            class="mdPreview"
            showCodeRowNumber
            :theme="state.theme"
            :codeTheme="state.codeTheme"
            :previewTheme="state.previewTheme"
            :editorId="state.id"
            :modelValue="articleInfo?.articleContent"
          />
        </div>
      </div>
      <el-affix :offset="50">
        <div v-if="loading">
          <el-skeleton class="skeleton" animated :rows="2"> </el-skeleton>
          <el-skeleton class="skeleton" animated :rows="2"> </el-skeleton>
          <el-skeleton class="skeleton" animated :rows="5"> </el-skeleton>
        </div>
        <div v-else>
          <el-text size="large" class="">目录</el-text>
          <MdCatalog
            class="card_catalog"
            :editorId="state.id"
            :scrollElement="scrollElement"
            :offsetTop="700"
            :scrollElementOffsetTop="70"
          />
        </div>
      </el-affix>
    </div>

    <Footer></Footer>
  </NoiseBg>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from "vue";
import Footer from "@/components/Footer/index.vue";
import NoiseBg from "@/components/NoiseBg/index.vue";
import { useRoute } from "vue-router";
import { MdPreview, MdCatalog } from "md-editor-v3";
import useThemeStore from "@/store/modules/theme.ts";
import { getArticleInfo } from "@/api/article";
import type { ArticleInfo } from "@/api/article/type";
defineOptions({
  name: "article",
});
const themeStore = useThemeStore();
const route = useRoute();
const loading = ref<boolean>(true);
const state = reactive<any>({
  theme: "dark",
  previewTheme: "default",
  codeTheme: "atom",
  id: "editor",
});
const previewThemeList = ref<string[]>([
  "default",
  "github",
  "vuepress",
  "mk-cute",
  "smart-blue",
  "cyanosis",
]);
const codeThemeList = ref<string[]>([
  "atom",
  "a11y",
  "gradient",
  "kimbie",
  "paraiso",
  "qtcreator",
  "stackoverflow",
]);
const articleInfo = ref<ArticleInfo>();
onMounted(() => {
  loading.value = true;
  if (themeStore.darkTheme) {
    state.theme = "dark";
  } else {
    state.theme = "light";
  }
  getArticleInfo(route.query.id as unknown as number).then((response) => {
    articleInfo.value = response.data;
    loading.value = false;
  });
});
// 监听主题变换
watch(
  () => themeStore.darkTheme,
  (newValue) => {
    if (newValue) {
      state.theme = "dark";
    } else {
      state.theme = "light";
    }
  }
);
const handlePreviewTheme = (command: string) => {
  state.previewTheme = command;
};
const handleCodeTheme = (command: string) => {
  state.codeTheme = command;
};

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

  .main {
    margin: 0 auto;
    width: 70rem;
    min-height: 80vh;
    display: flex;
    justify-content: space-between;
    min-height: 80vh;

    .card-preview {
      width: 50rem;
      .skeleton {
        background: var(--skeleton-background-color);
      }

      .information {
        padding: 20px 20px 10px;

        .icon {
          display: flex;
          color: var(--text-color);
          margin-right: 20px;
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
            margin-right: 80px;
            color: var(--text-color);
          }
        }
      }

      .mdPreview {
        background-color: transparent;
        font-family: "openSans";
      }
    }
    .skeleton {
      background: var(--skeleton-background-color);
      min-height: 300px;
    }
    .card_catalog {
      font-size: 14px;
      width: 18rem;
      color: var(--text-color);
    }
  }
}
</style>
