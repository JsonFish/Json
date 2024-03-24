<!-- 底部 -->
<template>
    <div class="footer">
        <div class="text">
            <p class="name">&copy 小余的学习日志</p>
            <p class="number">豫ICP备202466666号</p>
        </div>
    </div>
</template>

<script setup lang='ts'>

</script>

<style scoped lang="scss">
.footer {
    width: 100%;
    height: 60px;
    background: var(--footer-background-color);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .text {
        color: gray;

        .name {
            font-size: 14px;
        }

        .number {
            font-size: 12px;
            margin-top: 5px;
        }
    }
}
</style>