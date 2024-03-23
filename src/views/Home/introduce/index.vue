<template>
    <div class="introduce">
        <el-card class="info" body-style="padding:0">
            <img :src="blogInforForm.avatarBg" fit="cover" :lazy="true" class="bgImg" />
            <div class="blogger">
                <el-avatar class="avatar" :size="70" :src="blogInforForm.blogAvatar" fit="cover"
                    :lazy="true"></el-avatar>
                <span class="name">{{ blogInforForm.blogName }}</span>
            </div>
            <div class="icon">
                <SvgIcon color="skyblue" name="bilibili" width="1.5rem" height="1.5rem"></SvgIcon>
                <SvgIcon name="github" width="1.5rem" height="1.5rem"></SvgIcon>
                <SvgIcon name="wechat" width="1.5rem" height="1.5rem"></SvgIcon>
                <SvgIcon color="skyblue" name="qq" width="1.5rem" height="1.5rem"></SvgIcon>
            </div>
            <el-text class="personalSay">{{ blogInforForm.personalSay }}</el-text>
        </el-card>
        <el-card class="announcement">
            公告
        </el-card>
    </div>
</template>

<script setup lang='ts'>
import { onMounted, reactive } from "vue";
import { blogInfor } from "@/api/info";
import type { Information } from "@/api/info/type"
defineOptions({
    name: "Information"
});
const blogInforForm = reactive<Information>({
    blogName: "", // 博客名
    blogAvatar: "", // 博客头像
    personalSay: "", // 个签
    avatarBg: "", // 头像背景
    blogNotice: "", // 公告
    githubLink: "", // GitHub
    giteeLink: "", // 码云
    bilibiliLink: "", // B站
    weChatGroup: "", // 微信群
    qqLink: "", // qq
    qqGroup: "", // qq群
    weChatLink: "", // 微信
    aliPay: "", //  支付宝收款码
    weChatPay: "" // 微信收款
})
onMounted(() => {
    getBlogInfor()
})
const getBlogInfor = () => {
    blogInfor().then(response => {
        Object.assign(blogInforForm, response.data);
    })
}
</script>

<style scoped lang="scss">
.introduce {
    margin: 1rem;
    width: 18rem;

    .info {

        height: 25rem;
        background: var(--el-card--background-color);
        border: 0;
        margin-bottom: 1rem;
        border-radius: 10px;


        .bgImg {
            width: 100%;
            height: 150px;
        }

        .blogger {
            position: relative;

            .avatar {
                position: absolute;
                top: -40px;
                left: 10px;
            }

            .name {
                margin-left: 80px;
                color: var(--text-color);
            }
        }

        .icon {
            display: flex;
            justify-content: space-around;
            margin-top: 20px;
            padding: 0 30px;
        }

        .personalSay {
            margin-top: 40px;
            color: var(--text-color);
        }
    }

    .announcement {
        color: var(--text-color);
        height: 15rem;
        background: var(--el-card--background-color);
        border-radius: 10px;
        border: 0;
    }
}
</style>