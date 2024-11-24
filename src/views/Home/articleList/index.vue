<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getArticleList } from "@/api/article/index.ts";
import type { ArticleInfo } from "@/api/article/type";
import { useRouter } from "vue-router";
defineOptions({
  name: "ArticleList",
});
const router = useRouter();
const articleList = ref<ArticleInfo[]>([]);
const currentPage = ref<number>(1);
const pageSize = ref<number>(5);
const total = ref<number>(0);
const loading = ref<boolean>(false);
onMounted(() => {
  getArticle();
});
const getArticle = () => {
  loading.value = true;
  getArticleList(currentPage.value, pageSize.value).then((response) => {
    articleList.value = response.data.articleList;
    total.value = response.data.total;
    loading.value = false;
  });
};
const toArticle = (id: number) => {
  router.push({ path: "/article", query: { id } });
};
</script>

<template>
  <el-row class="w-45">
    <el-col v-for="(item, index) in articleList" :span="24" :key="item.id">
      <div
        class="flex h-32 mb-14 hover:bg-articleCard rounded overflow-hidden opacity-0 translate-x-1/4"
        :class="'an' + (index + 1)"
      >
        <div v-if="index % 2 == 0" class="overflow-hidden w-64">
          <el-image
            class="h-full duration-500 hover:scale-110"
            fit="cover"
            :src="item.articleCover"
          />
        </div>
        <div class="w-full px-4 py-2">
          <div @click="toArticle(item.id)">
            <span class="text-xl font-bold line-clamp-1 hover:cursor-pointer">{{
              item.articleTitle
            }}</span>
          </div>
          <div class="mt-2 h-14" @click="toArticle(item.id)">
            <el-text class="line-clamp-2 hover:cursor-pointer">{{
              item.articleSummary
            }}</el-text>
          </div>
          <div class="flex justify-between">
            <div class="flex hover:cursor-pointer">
              <div class="flex items-center mr-2">
                <el-icon size="14" class="mr-1">
                  <View />
                </el-icon>
                <span class="text-xs">{{ item.browse }}</span>
              </div>
              <div class="flex items-center mr-2">
                <SvgIcon
                  class="mr-1"
                  name="star"
                  color="#ccc"
                  width="16px"
                  height="16px"
                ></SvgIcon>
                <span class="text-xs">{{ item.upvote }}</span>
              </div>
              <div class="flex items-center">
                <span
                  class="text-xs mr-1"
                  v-for="(tag, index) in item.tags"
                  :key="index"
                >
                  {{ "# " + tag.tagName }}
                </span>
              </div>
            </div>
            <div>
              <el-text size="small">发布于: {{ item.create_time }}</el-text>
            </div>
          </div>
        </div>
        <div v-if="index % 2 != 0" class="overflow-hidden w-64">
          <el-image
            class="h-full duration-500 hover:scale-110"
            fit="cover"
            :src="item.articleCover"
          />
        </div>
      </div>
    </el-col>
    <div v-show="total > 0" class="my-0 mx-auto">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        background
        layout="prev, pager, next"
        @size-change="getArticle"
        @current-change="getArticle"
      />
    </div>
  </el-row>
</template>
