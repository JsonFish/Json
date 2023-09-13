<template>
    <el-menu mode="horizontal " class="menu" router  >
        <el-menu-item index="/">
            <SvgIcon name="home" color="var(--el-color-primary)"/>
            <li class="item">首页</li>
        </el-menu-item>
        <el-menu-item index="/sort">
            <SvgIcon name="sort" width="15px" height="15px"/>
            <li class="item">分类</li>
        </el-menu-item>
        <el-menu-item index="/timeline">
            <SvgIcon name="timeline" />
            <li class="item">时间轴</li>
        </el-menu-item>
        <el-menu-item index="5">
            <SvgIcon name="photo" />
            <li class="item">相册</li>
        </el-menu-item>
        <el-menu-item index="6">
            <SvgIcon name="Messageboard" />
            <li class="item">留言板</li>
        </el-menu-item>
        <el-menu-item index="3">
            <SvgIcon name="profile" width="14px" height="14px" />
            <li class="item">资源导航</li>
        </el-menu-item>
        <el-menu-item index="7">
            <SvgIcon name="links" />
            <li class="item">友链</li>
        </el-menu-item>
        <el-menu-item index="8">
            <SvgIcon name="login" width="14px" height="14px" />
            <li class="item">登录</li>
        </el-menu-item>
    </el-menu>
</template>
    
<script setup lang='ts'>


</script>
    
<style scoped lang="scss">
.menu {
    margin-right: 20px;
    background: transparent;
    border-bottom:none;
    
    .item {
        margin-left: 5px;
        font-weight: 700;
    }

    ::v-deep() {
        .el-menu-item {
            padding: 10px;
        }

        .el-menu-item.is-active {
            border-bottom: 2px solid transparent;
        }
        
        .el-menu-item:not(.is-disabled):focus,  .el-menu-item:not(.is-disabled):hover{
            background-color: transparent;
        }

    }
}
</style>