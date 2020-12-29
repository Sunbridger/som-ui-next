<template>
    <div class="pg-component-overlay">
        <som-overlay :show="isShowMask" :class="['som-popup-mask']" :z-index="500" @click="clickMask"></som-overlay>
        <div class="container-wrapper">
            <p class="text-left-p">基础用法</p>
            <som-button mode="border" @click="showMask"> 显示遮罩层 </som-button>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    setup() {
        const isShowMask = ref(false);
        const clickMask = (): void => {
            isShowMask.value = !isShowMask.value;
            return;
        };
        const showMask = (): void => {
            isShowMask.value = !isShowMask.value;
            return;
        };
        return {
            isShowMask,
            clickMask,
            showMask,
        };
    },
});
</script>
