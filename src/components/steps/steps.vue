<style lang="less">
@import '~@/styles/components/steps/var.less';

@block: som-steps;
@item: som-step;

.@{block} {
    &::-webkit-scrollbar {
        display: none;
    }
    display: inline-block;
    position: relative;
    background-color: var(--white);
    color: var(--step-inactive-content-color);
    font-size: var(--step-content-size);
    font-weight: var(--step-inactive-content-fw);
    overflow-x: scroll;
    width: 100%;

    &__bd {
        display: inline-flex;
        padding: 16px 20px;
        box-sizing: border-box;
    }
    &.@{block}--flexable {
        .@{block}__bd {
            display: flex;
        }
        width: 100%;
        .som-step {
            flex: 1;
            min-height: 0 !important;
            min-width: 0 !important;
        }
    }
    &.@{block}--vertical {
        width: auto;
        // height: 100%;
        overflow-y: scroll;
        .@{block}__bd {
            padding: 20px 16px;
            height: 100%;
            flex-direction: column;
        }

        .@{item} {
            flex-direction: row;
            min-height: 60px;
            align-items: start;

            &:last-child {
                flex: inherit;
                height: 18px;
                min-height: 0;
            }
            &__title {
                margin: 0 8px;
            }
            &__line {
                width: 4px;
                height: calc(100% - var(--step-icon-size) + 4px);
                top: calc(var(--step-icon-size) - 2px);
                left: calc(var(--step-icon-size) / 2 - 2px);
            }
        }
    }
}
</style>
<template>
    <div :class="clsList">
        <div class="som-steps__bd">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useChildren } from '@/common/composition/useRelation';
import { StepsProps } from './propType';

export default defineComponent({
    name: 'SomSteps',
    props: StepsProps,
    emits: ['click-step'],
    setup(props, { emit }) {
        // data数据

        // 父子组件传递的数据
        const { linkChildren } = useChildren('som-steps');
        linkChildren({ emit, props });

        // computed计算属性
        const clsList = computed(() => ({
            'som-steps': true,
            'som-steps--flexable': props.flexable,
            'som-steps--vertical': props.direction === 'vertical',
        }));

        // watch状态监听

        // methods方法

        // lifecycle生命周期

        return {
            clsList,
        };
    },
});
</script>




