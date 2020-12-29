<style lang="less">
.pg-component-badge {
    font-family: 'Helvetica Neue';
    padding: 16px 10px 10px 10px;
    .test-block {
        width: 42px;
        height: 42px;
        border-radius: 4px;
        background: #eee;
        display: inline-block;
        vertical-align: middle;
    }
}
</style>
<template>
    <div class="pg-component-badge">
        <p class="fs16 mb12 f-pg-text-color">常规用法</p>
        <som-badge dot></som-badge>
        <som-badge text="hot" :badgeStyle="badgeStyle"></som-badge>
        <p class="mt20"></p>
        <som-badge dot><div class="test-block"></div></som-badge>
        <som-badge class="ml20" text="999+">
            <div class="test-block"></div>
        </som-badge>
        <som-badge class="ml20" text="9"><div class="test-block"></div></som-badge>
        <som-badge class="ml20" text="new"><div class="test-block"></div></som-badge>
    </div>
</template>
<script>
export default {
    data() {
        return {
            badgeStyle: {
                background: 'rgb(255, 198, 26)'
            }
        };
    }
};
</script>
