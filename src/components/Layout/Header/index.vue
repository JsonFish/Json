<template>
    <div class="header-container">
        <el-menu mode="horizontal " class="menu" text-color="#aaa" router>
            <el-menu-item index="/">
                <SvgIcon name="home"></SvgIcon>首页
            </el-menu-item>
            <el-menu-item index="/timeline">
                <SvgIcon name="time"></SvgIcon>时间轴
            </el-menu-item>
            <el-menu-item index="/sort">
                <SvgIcon name="jd"></SvgIcon>分类
            </el-menu-item>
            <el-menu-item index="5">
                <SvgIcon name="bbt"></SvgIcon>相册
            </el-menu-item>
            <el-menu-item index="6">
                <SvgIcon name="jd"></SvgIcon>留言板
            </el-menu-item>
            <el-menu-item index="3">
                <SvgIcon name="jd"></SvgIcon>资源导航
            </el-menu-item>
            <el-menu-item index="7">
                <SvgIcon name="bbt"></SvgIcon>友链
            </el-menu-item>
            <el-menu-item index="8" style="margin-left: 100px;">
                <SvgIcon name="jd"></SvgIcon>登录
            </el-menu-item>
        </el-menu>
    </div>
</template>
    
<script setup lang='ts'>

</script>
    
<style lang="scss" scoped>
.header-container {
    width: 80%;

    .menu {
        height: 50px;
    }
}
</style>