<style lang="less">
@button: som-button;

.som-button-group {
    display: flex;
    background-color: #fff;
    align-items: center;
    padding: 0 16px;
    .@{button} + .@{button} {
        margin-left: 12px;
        margin-top: 0;
    }
    &--two {
        .@{button}:first-child {
            flex-grow: 1;
            flex-basis: 1px;
        }
        .@{button}:last-child {
            flex-grow: 2.1;
            flex-basis: 2.1px;
        }
    }
    &--three {
        .@{button}:first-child {
            flex-grow: 1;
            flex-basis: 1px;
        }
        .@{button}:last-child {
            flex-grow: 3;
            flex-basis: 3px;
        }
    }
}
</style>

<template>
    <div :class="classes">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';

export default defineComponent({
    name: 'SomButtonGroup',
    props: {
        flexRank: {
            type: String as PropType<'two' | 'three'>,
        },
    },
    setup(props) {
        // computed计算属性块
        const classes = computed(() => ({
            'som-button-group': true,
            [`som-button-group--${props.flexRank}`]: !!props.flexRank,
        }));

        return {
            classes,
        };
    },
});
</script>
