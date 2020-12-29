<template>
    <router-view></router-view>
</template>

<script>
export default {
    name: 'app',
};
</script>

<style lang="less">
a {
    color: unset;
}
.container-wrapper {
    margin: 0 16px;
}
.text-left-p:nth-of-type(1) {
    margin-top: 16px;
}
.text-left-p {
    margin: 32px 0 12px 16px;
    text-align: left;
    font-size: 16px;
    color: #8d8e99;
}
.container-wrapper {
    .text-left-p {
        margin-left: 0;
    }
    .som-button {
        margin: 5px 0;
    }
    .no-margin {
        margin-bottom: 0;
    }
}
</style>
