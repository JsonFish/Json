<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { blogInfor } from '@/api/info'
import TypeWriter from '@/components/typeWriter/index.vue'
const saying = ['破釜沉舟终有日, 卧薪尝胆可吞吴', '人有冲天之志, 非运不能自通']
import type { Information } from '@/api/info/type'
import useThemeStore from '@/store/modules/theme.ts'
const themeStore = useThemeStore()
defineOptions({
  name: 'Information',
})
const blogInforForm = reactive<Information>({
  blogName: '', // 博客名
  blogAvatar: '', // 博客头像
  personalSay: '', // 个签
  avatarBg: '', // 头像背景
  blogNotice: '', // 公告
  githubLink: '', // GitHub
  giteeLink: '', // 码云
  bilibiliLink: '', // B站
  weChatGroup: '', // 微信群
  qqLink: '', // qq
  qqGroup: '', // qq群
  weChatLink: '', // 微信
  aliPay: '', //  支付宝收款码
  weChatPay: '', // 微信收款
  webSiteBg: '', // 网站背景
  loginBg: '', // 登录背景
})
onMounted(() => {
  getBlogInfor()
})
const getBlogInfor = () => {
  blogInfor().then((response) => {
    Object.assign(blogInforForm, response.data)
  })
}
const toLink = (url: string) => {
  window.open(url, '_blank')
}
</script>

<template>
  <div class="introduce w-72">
    <el-card class="info border-0 mb-4" shadow="never" body-style="padding:0">
      <el-image
        loading="lazy"
        :lazy="true"
        :src="blogInforForm.avatarBg"
        fit="cover"
        class="w-full h-36"
      />
      <div class="relative">
        <el-avatar
          class="absolute -top-8 left-4"
          :size="60"
          :src="blogInforForm.blogAvatar"
          fit="cover"
          :lazy="true"
        ></el-avatar>
        <p class="ml-20 h-5">{{ blogInforForm.blogName }}</p>
      </div>
      <TypeWriter
        :typeList="saying"
        size="14px"
        class="personalSay mt-2 ml-3"
      ></TypeWriter>
      <!-- <p class="personalSay">{{ blogInforForm.personalSay }}</p> -->
      <div class="flex justify-evenly my-4 px-7">
        <SvgIcon
          class="hover:cursor-pointer"
          @click="toLink(blogInforForm.bilibiliLink)"
          color="skyblue"
          name="bilibili"
          width="1.5rem"
          height="1.5rem"
        ></SvgIcon>
        <SvgIcon
          :color="themeStore.darkTheme ? '#f2f5fc' : '#313131'"
          class="hover:cursor-pointer"
          @click="toLink(blogInforForm.githubLink)"
          name="github"
          width="1.5rem"
          height="1.5rem"
        ></SvgIcon>
      </div>
    </el-card>
    <el-card
      shadow="never"
      class="announcement border-none mb-4 h-60"
      header="公告"
    >
      <p class="text-sm">{{ blogInforForm.blogNotice }}</p>
    </el-card>
    <el-card shadow="never" class="border-none h-60" header="网站信息">
      <p class="text-sm">暂空</p>
    </el-card>
  </div>
</template>
