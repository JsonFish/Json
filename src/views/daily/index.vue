<template>
    <div class="daily">
        <div class="top">
            <img src="@/assets/img/002.jpg" fit="cover" />
        </div>
        <div class="main">
            <el-row>
                <el-col v-for="item in dailyList" :span="8" :key="item.id">
                    <el-card shadow="always" body-style="padding:5px" class="card">
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
                        <Upload @getFileList="getFileList" :fileList="item.images" :hiddenDelete="true" />
                        <template #footer>
                            <p class="time">发布于 {{ item.create_time }}</p>
                        </template>
                    </el-card>
                </el-col>
            </el-row>
            <el-pagination background layout="prev, pager, next" :total="1000" />
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from "vue"
import Upload from "@/components/Upload/index.vue"
import { DynamicInfo } from "@/api/daily/type"
import { getDaily } from "@/api/daily"
const dailyList = ref<DynamicInfo[]>([])
const avatar = ref<string>()
const name = ref<string>()
onMounted(() => {
    getDailyList()
});
const getDailyList = async () => {
    await getDaily().then(response => {
        dailyList.value = response.data.dynamicList;
        avatar.value = response.data.avatar;
        name.value = response.data.username;
    })
}
</script>

<style scoped>
.daily {
    width: 100%;
    height: 100vh;
    background: var(--home-background-color);

    .top {
        width: 100%;
        height: 300px;
        overflow: hidden;

        /* background-color: var(--dialog-background-color); */
        img {
            width: 100%;
            filter: var(--image-filter);
        }
    }

    .main {
        width: 1000px;
        margin: 0 auto;
        /* background-color: skyblue; */

        .card {
            margin: 5px;
            backdrop-filter: blur(16px) saturate(180%);
            -webkit-backdrop-filter: blur(16px) saturate(180%);
            background: var(--home-background-color);
            border-radius: 12px;
            border: 1px solid rgba(209, 213, 219, 0.3);

            .name {
                color: var(--text-color);
                margin-left: 10px
            }

            .text {
                width: 100%;
                height: 40px;
                color: var(--text-color);
                word-wrap: break-word
            }

            .time {
                color: var(--text-color);
                font-size: 12px;
            }
        }
    }
}
</style>