<template>
    <div class="introduce">
        <el-card class="info" body-style="padding:0">
            <el-image :src="blogInforForm.avatarBg" fit="cover" :lazy="true" class="bgImg" />
            <div class="blogger">
                <el-avatar class="avatar" :size="70" :src="blogInforForm.blogAvatar" fit="cover"
                    :lazy="true"></el-avatar>
                <p class="name">{{ blogInforForm.blogName }}</p>
            </div>
            <p class="personalSay">{{ blogInforForm.personalSay }}</p>
            <div class="icon">
                <SvgIcon color="skyblue" name="bilibili" width="1.5rem" height="1.5rem"></SvgIcon>
                <SvgIcon name="github" width="1.5rem" height="1.5rem"></SvgIcon>
                <SvgIcon name="wechat" width="1.5rem" height="1.5rem"></SvgIcon>
                <SvgIcon color="pink" name="qq" width="1.5rem" height="1.5rem"></SvgIcon>
            </div>

        </el-card>
        <el-card class="announcement">
            <template #header>
                <div class="header">
                    <el-icon size="18">
                        <ChatLineSquare />
                    </el-icon>
                    <span>公告</span>
                </div>
            </template>
            <p>{{ blogInforForm.blogNotice }}</p>
        </el-card>
        <el-card class="website">
            <template #header>
                <span>网站信息</span>
            </template>
            <span>暂空</span>
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
    width: 18rem;

    .info {
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
                top: -50px;
                left: 10px;
            }

            .name {
                margin-top: 10px;
                margin-left: 90px;
                color: var(--text-color);
            }
        }

        .personalSay {
            font-size: 14px;
            margin: 30px 0 0 20px;
            color: var(--text-color);
        }

        .icon {
            display: flex;
            justify-content: space-between;
            margin: 20px;
            padding: 0 30px;
        }


    }

    .announcement {
        color: var(--text-color);
        height: 10rem;
        background: var(--el-card--background-color);
        border-radius: 10px;
        border: 0;
        margin-bottom: 1rem;

        .header {
            display: flex;
        }
    }

    .website {
        color: var(--text-color);
        border-radius: 10px;
        border: 0;
        background: var(--el-card--background-color);
    }
}
</style>