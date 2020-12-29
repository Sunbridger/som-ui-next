<style lang="less">
.co-common-wrapper {
    // background: #fff;
}
</style>

<template>
    <div class="co-common-wrapper">
        <div class="padding-x-16 pt32 pb12 bg-page fs16 lh22 text-caption">{{title}}</div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        title: String
    }
};
</script>
