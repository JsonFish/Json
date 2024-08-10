<!-- 底部 -->
<template>
    <div class="footer">
        <div class="text-zinc-500">
            <p class="text-sm mt-1">&copy 小余的个人博客</p>
            <el-link class="text-xs mt-0" href="https://beian.miit.gov.cn">豫IP备2024057248号</el-link>
        </div>
        <div class="link">
            <a href="https://www.aliyun.com/?spm=5176.28055625.J_3207526240.1.6a27154aw7v5VK" target="_blank">
                <img src="https://img.shields.io/badge/%E9%98%BF%E9%87%8C%E4%BA%91-%E8%BD%BB%E9%87%8F%E6%9C%8D%E5%8A%A1%E5%99%A8-orange"
                    alt="" /></a>
            <a href="https://imzbf.github.io/md-editor-v3/docs/index" target="_blank">
                <img src="https://img.shields.io/badge/MdEditorV3-MD%E7%BC%96%E8%BE%91%E5%99%A8-159957" alt="" /></a>
            <a href="https://www.qiniu.com/" target="_blank">
                <img src="https://img.shields.io/badge/%E4%B8%83%E7%89%9B%E4%BA%91-%E5%AF%B9%E8%B1%A1%E5%AD%98%E5%82%A8-07beff"
                    alt="" />
            </a>
        </div>
    </div>
</template>

<script setup lang='ts'>

</script>

<style scoped lang="scss">
.footer {
    width: 100%;
    background: var(--footer-background-color);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .link {
        width: 400px;
        margin-top: 2px;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-evenly;
    }
}
</style>