<template>
    <div class="introduce">
        <el-card class="info" body-style="padding:0">
            <img src="@/assets/img/bg.jpg" fit="cover" :lazy="true" class="bgImg" />
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
        </el-card>
        <el-card class="announcement">
            公告
        </el-card>
    </div>
</template>

<script setup lang='ts'>
import { onMounted, reactive } from "vue";
import { blogInfor } from "@/api/info";
const blogInforForm = reactive({
    avatarBg: ""
})
onMounted(() => {
    getBlogInfor()
})
const getBlogInfor = () => {
    blogInfor().then(response => {
        Object.assign(blogInforForm, response.data)
    })
}
</script>

<style scoped lang="scss">
.introduce {
    margin: 1rem;
    width: 20rem;

    .info {

        height: 30rem;
        background: var(--el-card--background-color);
        border: 0cap;
        margin-bottom: 1rem;


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
    }

    .announcement {
        height: 15rem;
    }
}
</style>