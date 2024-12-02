<script setup lang="ts">
import { ref, reactive, watch, onMounted } from "vue";
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
const scrollElement = document.documentElement;
</script>

<template>
  <!-- 保证editorId相同 -->
  <div class="mt-20">
    <p class="text-center text-2xl">{{ articleInfo?.articleTitle }}</p>
    <div class="flex justify-center" v-show="!loading">
      <div class="flex items-center mr-4">
        <SvgIcon
          class="mr-1"
          name="star"
          color="#ccc"
          width="16px"
          height="16px"
        ></SvgIcon>
        <el-text>{{ articleInfo?.upvote }}</el-text>
      </div>
      <div class="flex items-center mr-4">
        <el-icon size="14" class="mr-1">
          <View />
        </el-icon>
        <el-text>{{ articleInfo?.browse }}</el-text>
      </div>
      <el-text type="small" class="mr-4">{{
        articleInfo?.categoryName
      }}</el-text>
      <el-text
        class="mr-1"
        v-for="(tag, index) in articleInfo?.tags"
        :key="index"
        >{{ "# " + tag.tagName }}</el-text
      >
    </div>
  </div>
  <div class="main my-0 mx-auto w-65 min-h-screen flex">
    <MdPreview
      class="bg-transparent w-50"
      showCodeRowNumber
      :theme="state.theme"
      :codeTheme="state.codeTheme"
      :previewTheme="state.previewTheme"
      :editorId="state.id"
      :modelValue="articleInfo?.articleContent"
    />
    <el-affix :offset="70" v-if="!loading">
      <el-text size="large">目录</el-text>
      <MdCatalog
        class="w-60 text-sm"
        :editorId="state.id"
        :scrollElement="scrollElement"
        :offsetTop="400"
        :scrollElementOffsetTop="100"
      />
    </el-affix>
  </div>
</template>

<style scoped>
:deep(.md-editor-catalog-link > span) {
  color: var(--menu-text-color);
}

:deep(.md-editor-catalog-link > span:hover) {
  color: var(--menu-text-active-color);
  font-weight: 800;
}
:deep(.md-editor-catalog-active > span) {
  color: var(--menu-text-active-color);
  font-weight: 800;
}
</style>
