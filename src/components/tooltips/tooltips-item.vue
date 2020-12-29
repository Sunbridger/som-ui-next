<style lang="less">
.som-tips-item {
    display: flex;
    font-size: 14px;
    line-height: 44px;
    position: relative;
    min-width: 98px;
    box-sizing: border-box;
    overflow: hidden;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    & + &::before {
        content: ' ';
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        height: 1px;
        border-top: 1px solid var(--stroke);
        color: var(--stroke);
        transform-origin: 0 0;
        transform: scaleY(0.5);
    }
}
</style>

<template>
    <div
        class="som-tips-item"
        @click="onClick"
    >
        <slot></slot>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'SomTooltipsItem',
    emits: ['item-click'],
    setup(props, { emit }) {
        // methods方法块
        const onClick = () => {
            emit('item-click');
        };
        return {
            onClick,
        };
    },
});
</script>
