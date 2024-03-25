<template>
    <div class="daily">
        <div class="top">
            <p>日常</p>
        </div>
        <div class="bottom">
            <div class="main">
                <el-row v-if="loading">
                    <el-col v-for="i in 6" :span="8" :key="i">
                        <el-skeleton style="
                background: var(--el-card--background-color);
                overflow: hidden;
                border-radius: 12px;
                width: 325px;
                margin: 5px;
              " :loading="true" animated>
                            <template #template>
                                <div style="display: flex">
                                    <el-skeleton-item variant="image" style="
                      background: var(--skeleton-background-color);
                      width: 50px;
                      height: 50px;
                      margin: 20px 10px 20px 20px;
                    " />
                                    <el-skeleton-item variant="h3" style="
                      width: 40px;
                      margin-top: 35px;
                      background: var(--skeleton-background-color);
                    " />
                                </div>
                                <div>
                                    <el-skeleton-item variant="h3" style="
                      width: 50%;
                      margin: 0 0 20px 5px;
                      background: var(--skeleton-background-color);
                    " />
                                </div>
                                <div style="display: flex">
                                    <el-skeleton-item variant="image" style="
                      width: 146px;
                      height: 146px;
                      margin-left: 5px;
                      border-radius: 5px;
                      background: var(--skeleton-background-color);
                    " />
                                    <el-skeleton-item variant="image" style="
                      width: 146px;
                      height: 146px;
                      margin-left: 10px;
                      border-radius: 5px;
                      background: var(--skeleton-background-color);
                    " />
                                </div>

                                <div style="padding: 14px">
                                    <el-skeleton-item variant="text" style="
                      width: 200px;
                      margin-top: 25px;
                      margin-bottom: 5px;
                      background: var(--skeleton-background-color);
                    " />
                                </div>
                            </template>
                        </el-skeleton>
                    </el-col>
                </el-row>
                <el-row v-else>
                    <el-col v-for="item in dailyList" :span="8" :key="item.id">
                        <el-card shadow="hover" body-style="padding:5px" class="card">
                            <template #header>
                                <div style="display: flex; align-items: center">
                                    <el-avatar :size="50" shape="square" :src="avatar" fit="fill" />
                                    <span class="name">{{ name }}</span>
                                </div>
                            </template>
                            <div class="text">
                                <p>
                                    {{ item.content }}
                                </p>
                            </div>
                            <Upload :fileList="item.images" :hiddenDelete="true" />
                            <template #footer>
                                <span class="time">发布于 {{ item.create_time }}</span>
                                <!-- <el-button link type="info" icon="star" size="larger" /> -->
                            </template>
                        </el-card>
                    </el-col>
                    <div style="margin: 1rem auto">
                        <el-pagination hide-on-single-page v-model:current-page="currentPage"
                            v-model:page-size="pageSize" :total="total" background layout="->,prev, pager, next"
                            @size-change="getDailyList" @current-change="getDailyList" />
                    </div>
                </el-row>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Footer from "@/components/Footer/index.vue";
import Upload from "@/components/Upload/index.vue";
import { DynamicInfo } from "@/api/daily/type";
import { getDaily } from "@/api/daily";
const dailyList = ref<Array<DynamicInfo>>([]);
const avatar = ref<string>("");
const name = ref<string>("");
const total = ref<number>(0);
const pageSize = ref<number>(6);
const currentPage = ref<number>(1);
const loading = ref<Boolean>(true);
onMounted(() => {
    getDailyList();
});
const getDailyList = async () => {
    loading.value = true;
    await getDaily(currentPage.value, pageSize.value).then((response) => {
        dailyList.value = response.data.dynamicList;
        avatar.value = response.data.avatar;
        name.value = response.data.username;
        total.value = response.data.total;
        loading.value = false;
    });
};
</script>

<style scoped>
.daily {
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

    .bottom {
        min-height: 70vh;
        background: var(--home-background-color);

        .main {
            width: 1000px;
            margin: 0 auto;

            .card {
                margin: 5px;
                background: var(--el-card--background-color);
                border-radius: 12px;
                border: 0px solid transparent;

                .name {
                    color: var(--text-color);
                    margin-left: 10px;
                }

                .text {
                    width: 100%;
                    height: 40px;
                    color: var(--text-color);
                    word-wrap: break-word;
                }

                .time {
                    color: var(--text-color);
                    font-size: 12px;
                }
            }
        }
    }
}
</style>
