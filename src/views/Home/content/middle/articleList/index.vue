<template>
    <div class="articleList">
        <el-card class="card" body-class="el-card-body" shadow="never">
            <img style="height: 100%;" src="@/assets/img/001.jpg" alt="">
        </el-card>
        <el-card class="card" shadow="hover">文章</el-card>
        <el-card class="card" shadow="hover">文章</el-card>
    </div>
</template>

<script setup lang='ts'>

</script>

<style scoped lang="scss">
.articleList {
    margin-top: 3rem;
    width: 74%;


    .el-card-body {
        background-color: pink;
        height: 100%;
        padding: 0;
        border: none;
    }

    // background-color: pink;
    .card {
        height: 18rem;
        margin-bottom: 1rem;
        // background-color: transparent;
    }
}
</style>