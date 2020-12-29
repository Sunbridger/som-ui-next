<style lang="less">
@import '~@/styles/components/badge/var.less';

@block: som-badge;

.@{block} {
    position: relative;
    display: inline-block;
    color: unset;
    line-height: 1;
    font-family: 'Helvetica Neue';
    &__count {
        background: var(--badge-bg);
        font-size: var(--badge-fs);
        color: var(--badge-color);
        padding: 0 5px;
        text-align: center;
        display: inline-block;
        line-height: var(--badge-height);
        border: var(--badge-border-width) solid var(--badge-border-color);
        border-radius: calc(var(--badge-height) + var(--badge-border-width) * 2 / 2);
        background-clip: padding-box;
        vertical-align: middle;
        box-sizing: content-box;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(50%, -20%);
        transform-origin: 100% 0%;
        z-index: 10;
    }
    &.@{block}--not-a-wrapper {
        .@{block}__count {
            position: relative;
            top: auto;
        }
    }
    &--dot {
        padding: calc(var(--badge-dot-size) / 2);
        border-radius: 50%;
    }
    &--single {
        width: 18px;
        border-radius: 50%;
        padding: 0;
    }
}
</style>

<template>
    <span class="som-badge" :class="{'som-badge--not-a-wrapper': !$slots.default}">
        <slot></slot>
        <span class="som-badge__count" :class="badgeClass" :style="badgeStyle">
            {{text}}
        </span>
    </span>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
    name: 'SomBadge',
    props: {
        text: {
            type: [String, Number]
        },
        dot: {
            type: Boolean,
            default: false
        },
        badgeStyle: {
            type: Object
        }
    },
    setup(props) {
        const badgeClass = computed(() => ({
            'som-badge--dot': !!props.dot,
            'som-badge--single': typeof props.text !== 'undefined' && props.text.toString().length === 1
        }));

        return {
            badgeClass
        };
    }
});
</script>
