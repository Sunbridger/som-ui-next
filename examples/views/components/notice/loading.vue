<!--
 * @Author: your name
 * @Date: 2020-11-23 16:56:43
 * @LastEditTime: 2020-11-27 13:44:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /som-ui-next/examples/views/components/notice/loading.vue
-->
<template>
    <div class="pg-component-loading padding16">
        <p class="mb12">常规类型：</p>
        <som-button class="mb12" @click="showType">show loading 2s后 hide</som-button>
        <som-button class="mb12" @click="showLoading">show loading without close</som-button>
        <p class="mb12">全屏类型：</p>
        <som-button class="mb12" @click="showWhiteType">白色背景 show loading 2s后 hide</som-button>
        <som-button class="mb12" @click="showWhiteLoading">show white loading without close</som-button>

    </div>
</template>
<script>
export default {
    methods: {
        showType () {
            this.$som.loading.show({
                text: '加载中...'
            });
            setTimeout(() => {
                this.$som.loading.hide();
            }, 2000);
        },
        showWhiteType () {
            this.$som.loading.show({
                type: 'white',
                text: '加载中...'
            });
            setTimeout(() => {
                this.$som.loading.hide();
            }, 2000);
        },
        showLoading () {
            this.$som.loading.show();
        },
        showWhiteLoading () {
            this.$som.loading.show({
                type: 'white',
                text: '加载中...'
            });
        }
    }
};
</script>

<style lang="less">
    .whiteMask {
        background-color: #fff;
        // opacity: .9;
    }
    .wrapperClass {
        background-color: #fff;
        border: none;
        .som-toast__content {
            color: red!important;
        }
    }
</style>
