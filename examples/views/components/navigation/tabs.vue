<style lang="less">
.img-active {
    position: absolute;
    left: calc(100% + 7.5px);
    top: 3px;
}
.big-active .som-tab-label {
    font-size: 18px;
    font-weight: var(--font-weight-medium);
}
</style>
<template>
    <div class="pg-component-tabs">
        <div class="container-wrapper">
            <p class="text-left-p">基础用法</p>
            <som-tabs>
                <som-tab-item>已发货</som-tab-item>
                <som-tab-item>未发货</som-tab-item>
            </som-tabs>
            <som-tabs>
                <som-tab-item>已发货</som-tab-item>
                <som-tab-item>未发货</som-tab-item>
                <som-tab-item>全部订单</som-tab-item>
            </som-tabs>
            <som-tabs>
                <som-tab-item>已发货</som-tab-item>
                <som-tab-item>未发货</som-tab-item>
                <som-tab-item>全部订单</som-tab-item>
                <som-tab-item>未收到</som-tab-item>
            </som-tabs>
            <som-tabs>
                <som-tab-item>已发货</som-tab-item>
                <som-tab-item>未发货</som-tab-item>
                <som-tab-item>未收到</som-tab-item>
                <som-tab-item>待评价</som-tab-item>
                <som-tab-item>全部订单</som-tab-item>
            </som-tabs>
            <p class="text-left-p">可滑动选项</p>
            <som-tabs isSameAway scrollspy>
                <som-tab-item>已发货</som-tab-item>
                <som-tab-item>未发货</som-tab-item>
                <som-tab-item>全部订单</som-tab-item>
                <som-tab-item disabled>不可点击</som-tab-item>
                <som-tab-item>还是未收到</som-tab-item>
                <som-tab-item>真的未收到</som-tab-item>
            </som-tabs>
            <p class="text-left-p">特殊型</p>
            <som-tabs :hasLine="true">
                <som-tab-item active-class="big-active">已发货</som-tab-item>
                <som-tab-item active-class="big-active">未发货</som-tab-item>
                <som-tab-item active-class="big-active">已退货</som-tab-item>
            </som-tabs>
            <p class="text-left-p">垂直型</p>
            <som-tabs vertical :hasLine="true">
                <som-tab-item>已发货</som-tab-item>
                <som-tab-item>未发货</som-tab-item>
                <som-tab-item>全部订单</som-tab-item>
                <som-tab-item>已退货</som-tab-item>
            </som-tabs>
            <p class="text-left-p">垂直型，自定义icon</p>
            <som-tabs vertical :hasLine="false">
                <som-tab-item>
                    已发货
                    <template #extend="props">
                        <img src="//img.souche.com/f2e/3d5b428179582eb758ea584a458b017c.png" v-if="props.isActive" class="img-active" />
                    </template>
                </som-tab-item>
                <som-tab-item>
                    未发货
                    <template #extend="props">
                        <img src="//img.souche.com/f2e/3d5b428179582eb758ea584a458b017c.png" v-if="props.isActive" class="img-active" />
                    </template>
                </som-tab-item>
                <som-tab-item>
                    全部订单
                    <template #extend="props">
                        <img src="//img.souche.com/f2e/3d5b428179582eb758ea584a458b017c.png" v-if="props.isActive" class="img-active" />
                    </template>
                </som-tab-item>
                <som-tab-item disabled>未收到</som-tab-item>
                <som-tab-item>
                    已退货
                    <template #extend="props">
                        <img src="//img.souche.com/f2e/3d5b428179582eb758ea584a458b017c.png" v-if="props.isActive" class="img-active" />
                    </template>
                </som-tab-item>
            </som-tabs>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    setup(props, ctx) {
        return {
            activeClass: 'slot-icon',
        };
    },
});
</script>
