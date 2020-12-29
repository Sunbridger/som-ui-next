<template>
    <div class="pg-component-notice-bar padding16">
        <p class="fs16 mb12 f-pg-text-color">常规用法</p>
        <som-notice-bar class="mt8">提示文案提示文案提示文案提示文案提示</som-notice-bar>
        <som-notice-bar class="mt8" :halfRadius="false">提示文案提示文案提示文案提示文案提示文案提示文案提示文案提示文案提示文案</som-notice-bar>
        <som-notice-bar class="mt8" closable>提示文案提示文案提示文案</som-notice-bar>

        <p class="fs16 mt32 mb12 f-pg-text-color">右侧操作栏</p>
        <som-notice-bar class="mt8" mode="link" :halfRadius="false">提示文案提示文案提示文案提示文案提示文案提示文案提示文案提示文案提示文案</som-notice-bar>
        <som-notice-bar class="mt8">
            提示文案提示文案提示文案提示文案提示
            <template #action>
                <som-button size="small" inline>按钮</som-button>
            </template>
        </som-notice-bar>
         <p class="fs16 mt32 mb12 f-pg-text-color">走马灯效果</p>
        <som-notice-bar
            class="mt8"
            type="info"
            :marquee="{ loop: true }">
            Notice: The arrival time of incomes and transfers of Yu &#39;E Bao will be delayed during National Day.
        </som-notice-bar>
    </div>
</template>
<script>
export default {
};
</script>
