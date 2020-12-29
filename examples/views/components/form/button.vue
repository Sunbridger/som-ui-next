<style lang="less">
.pg-component-button {
    background-color: #f7f8fa !important;
    .som-button {
        margin-bottom: 10px;
    }
    .som-button-group {
        .som-button {
            margin-top: 10px;
            margin-bottom: 10px;
        }
    }
}
</style>
<template>
    <div class="pg-component-button">
        <div class="container-wrapper">
            <p class="text-left-p">按钮主题样式类型：默认为primary</p>
            <som-button>主色</som-button>
            <som-button type="success">成功</som-button>
            <som-button type="warning">警告</som-button>
            <som-button type="link">文字链接</som-button>
            <som-button type="assist">辅助色</som-button>
            <p class="text-left-p">按钮风格类型：默认normal</p>
            <som-button>普通按钮</som-button>
            <som-button mode="plain"> 幽灵按钮，没有背景色</som-button>
            <som-button mode="border">边框按钮，有边框，没有背景色</som-button>
            <som-button mode="link">文字按钮</som-button>
            <p class="text-left">按钮圆角</p>
            <som-button inline class="mr8">半圆角</som-button>
            <som-button border="large" inline class="mr8">大圆角</som-button>
            <som-button border="medium" inline class="mr8">中圆角</som-button>
            <som-button border="small" inline class="mr8">小圆角</som-button>
            <som-button border="mini" inline class="mr8">超小圆角</som-button>
            <p class="text-left-p">inline</p>
            <som-button inline class="mr8">普通按钮</som-button>
            <som-button size="medium" inline class="mr8"> 中等按钮 </som-button>
            <som-button size="small" inline class="mr8"> 小按钮 </som-button>
            <p class="text-left-p">disabled</p>
            <som-button disabled>disabled button</som-button>
            <p class="text-left-p">按钮组合icon</p>
            <som-button loading>loading....</som-button>
            <!-- <som-button icon="loading">icon</som-button> -->
        </div>
        <div>
            <p class="text-left-p">按钮组 1:1</p>
            <som-button-group>
                <som-button type="assist">左侧按钮</som-button>
                <som-button>右侧按钮</som-button>
            </som-button-group>
            <p class="text-left-p">按钮组 1:2</p>
            <som-button-group :flexRank="'two'">
                <som-button type="assist">辅助按钮</som-button>
                <som-button>主要按钮</som-button>
            </som-button-group>
            <p class="text-left-p">按钮组 1:3</p>
            <som-button-group :flexRank="'three'">
                <som-button type="assist">次要</som-button>
                <som-button>主要按钮</som-button>
            </som-button-group>
        </div>
        <div class="container-wrapper">
            <p class="text-left-p">按钮点击事件</p>
            <som-button @click="click">click</som-button>
            <p class="text-left-p">点击事件延时触发</p>
            <som-button :delayTime="4000" @click="click">4s内点击事件只触发一次</som-button>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    methods: {
        click() {
            this.$som.toast('我被点击了');
        },
    },
});
</script>
