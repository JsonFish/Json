<template>
  <div class="sort">
    <div class="top">
      <p>分类</p>
    </div>
    <div class="main">
      <div class="center">
        <el-row>
          <el-col v-if="loading" v-for="i in 4" :span="12" :key="i">
            <div class="category">
              <el-skeleton-item variant="image" style="
                      background: var(--skeleton-background-color);
                      width: 100%;
                      height: 100%;
                      border-radius: 10px;
                    " />
            </div>
          </el-col>
          <el-col v-else v-for="category in categoryList" :key="category.id" :span="12">
            <div class="category">
              <div class="name">
                <p>{{ category.categoryName }}</p>
                <!-- <p>文章数{{ 2 }}</p> -->
              </div>
              <img class="img" :src="category.categoryImage" fit="cover" :lazy="true" />
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Footer from "@/components/Footer/index.vue"
import { getCategory } from '@/api/category';
const categoryList = ref<any>();
const loading = ref<boolean>(false);
onMounted(() => {
  getCategoryList()
});
const getCategoryList = () => {
  loading.value = true;
  getCategory().then(response => {
    categoryList.value = response.data.categoryList;
    loading.value = false;
  })
}
</script>

<style scoped lang="scss">
.sort {
  width: 100%;

  .top {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--page-title-color);
    font-size: 50px;
    width: 100%;
    height: 30vh;
  }

  .main {
    width: 100%;
    background: var(--home-background-color);

    .center {
      width: 60rem;
      min-height: 70vh;
      background-color: var(--el-card--background-color);
      margin: 0 auto;
      overflow: hidden;

      .category {
        height: 280px;
        // background-color: skyblue;
        margin: 1rem;
        border-radius: 10px;
        overflow: hidden;
        position: relative;

        .name {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: var(--category-name-color);
          z-index: 1;
          font-size: 30px;
          transition: font-size .8s ease;
        }

        .name:hover {
          font-size: 40px;
          color: skyblue;
        }

        .img {
          width: 100%;
          transition: transform 0.5s ease;
          filter: var(--image-filter);
        }

        .img:hover {
          transform: scale(1.1);

        }
      }
    }
  }

}
</style>
