<template>
  <el-row style="width: 45rem">
    <el-col v-for="(item, index) in articleList" :span="24" :key="item.id">
      <div class="card" body-style="padding:0" shadow="hover">
        <div class="imgbox" v-if="index % 2 == 0">
          <el-image class="img" fit="cover" :src="item.articleCover" />
        </div>
        <div class="text p-2.5">
          <div class="top" @click="toArticle(item.id)">
            <span class="title hover:cursor-pointer">{{
              item.articleTitle
            }}</span>
          </div>
          <div class="middle pt-2.5" @click="toArticle(item.id)">
            <el-text class="abstract hover:cursor-pointer">{{
              item.articleSummary
            }}</el-text>
          </div>
          <div class="bottom mb-2.5">
            <div class="flex mb-1">
              <el-icon size="13" class="pt-1">
                <PriceTag />
              </el-icon>
              <el-tag
                type="primary"
                effect="plain"
                size="small"
                v-for="(tag, index) in item.tags"
                :key="index"
                class="mx-1 p-1"
                >{{ tag.tagName }}</el-tag
              >
            </div>

            <div class="infor">
              <span class="icon">
                <el-icon size="14" class="pt-0.5">
                  <Menu />
                </el-icon>
                <el-text size="small" class="pl-1">{{
                  item.categoryName
                }}</el-text>
              </span>

              <div class="icon">
                <SvgIcon name="star" color="#606266" width="16px"></SvgIcon>
                <el-text size="small" class="pl-1">{{ item.upvote }}</el-text>
              </div>

              <div class="icon">
                <el-icon size="14" class="pt-1">
                  <View />
                </el-icon>
                <el-text size="small" class="pl-1">{{ item.browse }}</el-text>
              </div>
            </div>
            <div>
              <el-text size="small">发布于: </el-text>
              <el-text size="small">{{ item.create_time }}</el-text>
            </div>
          </div>
        </div>
        <div class="imgbox" v-if="index % 2 != 0">
          <el-image class="img" fit="cover" :src="item.articleCover" />
        </div>
      </div>
    </el-col>
    <div style="margin: 0 auto">
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

<style scoped lang="scss">
.card {
  border-radius: 12px;
  height: 13rem;
  margin-bottom: 1.5rem;
  border: 0;
  background-color: var(--el-card--background-color);
  display: flex;
  transition: transform 0.5s ease;

  .imgbox {
    width: 20rem;
    border-radius: 12px 0 0 12px;
    overflow: hidden;

    .img {
      height: 15rem;
      transition: transform 0.5s ease;
    }

    .img:hover {
      transform: scale(1.1);
    }
  }

  .text {
    width: 25rem;
    color: var(--text-color);
    position: relative;

    .top {
      height: 25px;
      .title {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        font-size: 25px;
        font-weight: 700;
      }
    }

    .middle {
      .abstract {
        line-height: 1.5rem;
        text-indent: 1.5em;
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

      .infor {
        display: flex;

        .icon {
          margin-right: 10px;
          display: flex;
          // color: var(--text-color);
          // font-size: 14px;
        }
      }
    }
  }
}

.card:hover {
  transform: translateY(-3px);
}
</style>
