<style lang="less">
@import '~@/styles/components/tabs/var.less';

@block: som-tabs;
@item: som-tab-item;

.@{block} {
    &.@{block}--is-scroll {
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
        &::-webkit-scrollbar {
            display: none;
        }
    }
    display: flex;
    position: relative;
    justify-content: center;
    height: 52px;
    background: #fff;

    &.@{block}--same-away {
        padding: 0 4px;
        white-space: nowrap;
        display: inline-block;
    }

    &::after {
        content: ' ';
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        height: 1px;
        border-bottom: 1px solid #ededf0;
        color: #ededf0;
        transform-origin: 0 100%;
        transform: scaleY(0.5);
    }
    &__line {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 1;
        width: 40px;
        height: 3px;
        background-color: var(--tab-selected-line-color);
        border-radius: 3px;
    }

    &.@{block}--vertical {
        height: auto;
        display: inline-block;

        .@{item} {
            padding: 10px 12px;
            line-height: 24px;
            height: auto;
            width: auto;
        }

        .@{block}__line {
            display: flex;
            top: 0;
            bottom: unset;
            left: auto;
            right: 0;
            align-items: center;
        }

        &.@{block}--no-animate {
            .@{item} {
                padding-right: 0;
                &__label {
                    padding-right: 12px;
                    width: 100%;
                }
            }
        }
    }
}
</style>
<template>
    <div
        :class="currentClass"
        :style="currentStyle"
        ref="navRef"
    >
        <slot></slot>
        <div
            class="som-tabs__line"
            :style="state.lineStyle"
        ></div>
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, nextTick, watch, computed, CSSProperties, ref } from 'vue';
import { useChildren } from '@/common/composition/useRelation';
import { scrollLeftTo } from '@/common/utils/scroll';

export default defineComponent({
    name: 'SomTabs',
    emits: ['on-index-change', 'on-before-index-change', 'on-item-click', 'update:modelValue'],
    props: {
        modelValue: {
            type: Number,
            default: 0,
        },
        vertical: {
            type: Boolean,
            default: false,
        },
        activeColor: {
            type: String,
            default: '#8d8e99',
        },
        defaultColor: {
            type: String,
            default: '#8d8e99',
        },
        disabledColor: {
            type: String,
            default: '#c8c9cc',
        },
        lineColor: String,
        hasLine: {
            type: Boolean,
            default: true,
        },
        scrollspy: {
            type: Boolean,
            default: false,
        },
        isSameAway: {
            type: Boolean,
            default: false,
        },
        animate: {
            type: Boolean,
            default: true,
        },
        preventDefault: {
            type: Boolean,
            default: false,
        },
        customBarWidth: {
            type: Function,
        },
    },
    setup(props, { emit }) {
        // data数据
        const navRef = ref<HTMLElement>();
        const state = reactive({
            inited: false,
            currentIndex: 0,
            lineStyle: {},
        });

        // 父子组件传递的数据
        const { children, linkChildren } = useChildren('somTabs');

        // computed计算属性
        const currentClass = computed(() => ({
            'som-tabs': true,
            'som-tabs--no-animate': !props.animate,
            'som-tabs--vertical': props.vertical,
            'som-tabs--same-away': props.isSameAway,
            'som-tabs--is-scroll': props.scrollspy,
        }));

        const currentStyle = computed(() => {
            let width: string | undefined = undefined;
            if (!props.scrollspy) {
                width = undefined;
            } else if (props.vertical) {
                width = 'auto';
            } else {
                width = '100%';
            }
            return (
                width && {
                    width,
                }
            );
        });

        // watch状态监听
        watch(
            () => state.currentIndex,
            (newIndex, oldIndex) => {
                // setLine();
                emit('update:modelValue', newIndex);
                emit('on-index-change', newIndex, oldIndex);
            },
        );
        watch(
            () => props.modelValue,
            (newIndex) => {
                state.currentIndex = newIndex;
            },
        );

        // methods方法
        const setCurrentIndex = (val: number) => {
            state.currentIndex = val;
        };
        // scroll active tab into view
        const scrollIntoView = (immediate, tabEl) => {
            const nav = navRef.value || document.body;
            const to = tabEl.offsetLeft - (nav.offsetWidth - tabEl.offsetWidth) / 2;
            scrollLeftTo(nav, to, immediate ? 0 : 300);
        };
        // update nav bar style
        const setLine = (lineWidth) => {
            if (!props.hasLine && !lineWidth) {
                return;
            }
            // 是否需要动画
            const shouldAnimate = state.inited && props.animate;

            nextTick(() => {
                // 拿到位置
                const target = children[state.currentIndex].$el;
                const left = target.offsetLeft + target.offsetWidth / 2;
                const top = target.offsetTop + target.offsetHeight / 2;
                let lineStyle: CSSProperties = {};

                const lineSize = (props.customBarWidth && props.customBarWidth(state.currentIndex)) || `${lineWidth}px`;
                if (props.vertical) {
                    lineStyle = {
                        width: '3px',
                        height: lineSize,
                        transform: `translateY(${top}px) translateY(-50%)`,
                    };
                } else {
                    // 微调 tabs的滚动状态，移动到可视区域
                    shouldAnimate && scrollIntoView(false, target);
                    lineStyle = {
                        width: lineSize,
                        transform: `translateX(${left}px) translateX(-50%)`,
                    };
                }
                lineStyle.backgroundColor = `${props.lineColor}`;
                lineStyle.transitionDuration = shouldAnimate ? '.5s' : undefined;

                state.lineStyle = lineStyle;
            });
        };

        // lifecycle生命周期
        linkChildren({
            props,
            state,
            setCurrentIndex,
            setLine,
        });
        onMounted(() => {
            nextTick(() => {
                state.inited = true;
            });
            // state.inited = true;
        });

        return {
            state,
            navRef,
            currentClass,
            currentStyle,
        };
    },
});
</script>