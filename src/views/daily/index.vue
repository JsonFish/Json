<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Upload from '@/components/Upload/index.vue'
import { DynamicInfo } from '@/api/daily/type'
import { getDaily } from '@/api/daily'
defineOptions({
  name: 'daily',
})
const dailyList = ref<Array<DynamicInfo>>([])
const avatar = ref<string>('')
const name = ref<string>('')
const total = ref<number>(0)
const pageSize = ref<number>(6)
const currentPage = ref<number>(1)
onMounted(() => {
  getDailyList()
})
const getDailyList = () => {
  getDaily(currentPage.value, pageSize.value).then((response) => {
    dailyList.value = response.data.dynamicList
    avatar.value = response.data.avatar
    name.value = response.data.username
    total.value = response.data.total
  })
}
</script>

<template>
  <div class="min-h-screen">
    <div class="flex justify-center items-center text-4xl mb-2">
      <p>日常</p>
    </div>
    <div>
      <div class="mx-auto my-0 w-65">
        <el-row>
          <el-col v-for="(item, index) in dailyList" :span="8" :key="item.id">
            <el-card
              :class="'an' + (index + 1)"
              body-style="padding:10px"
              class="border-0 m-1 opacity-0 translate-x-1/4"
              shadow="never"
            >
              <template #header>
                <div class="flex items-center h-8">
                  <el-avatar
                    :size="50"
                    shape="square"
                    :src="avatar"
                    fit="fill"
                  />
                  <span class="ml-2">{{ name }}</span>
                </div>
              </template>
              <p class="mb-1">
                {{ item.content }}
              </p>
              <Upload :fileList="item.images" :hiddenDelete="true" />
              <template #footer>
                <span class="text-xs">发布于 {{ item.create_time }}</span>
              </template>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <el-row class="mt-5">
        <div class="mx-auto my-4">
          <el-pagination
            hide-on-single-page
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :total="total"
            background
            layout="->,prev, pager, next"
            @size-change="getDailyList"
            @current-change="getDailyList"
          />
        </div>
      </el-row>
    </div>
  </div>
</template>
