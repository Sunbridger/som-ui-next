<style lang="less">
.co-header {
    height: 50px;
    line-height: 50px;
    text-align: center;
    position: relative;
    background: #fff;
    flex-shrink: 0;
    color: #000;
    // box-shadow: 0 0 2px #ccc;
    .back-icon {
        width: 10px;
        height: 20px;
        // position: absolute;
        // top: 14px;
        // left: 16px;
        color: #000;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .router-link-active {
        float: left;
        margin-left: 10px;
        color: #555;
    }
    .text-bold {
        font-weight: 600;
    }
}
</style>

<template>
    <div class="co-header">
        <router-link to="/" v-if="ifBack">
        <div class="back-icon">
            <img src="https://assets.souche.com/assets/sccimg/dafengche/test/back-arrow.png" alt="">
        </div>
            <!-- <ArrowLeftOutlined /> -->
        </router-link>
        <span class="fs18 text-bold">{{title}}</span>
    </div>
</template>

<script>
// import ArrowLeftOutlined from '@ant-design/icons-vue/ArrowLeftOutlined';

export default {
    components: {
        // ArrowLeftOutlined
    },
    props: {
        title: String,
        ifBack: Boolean
    }
};
</script>
