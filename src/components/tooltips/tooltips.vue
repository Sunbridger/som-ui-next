<style lang="less">
@import '~@/styles/components/tooltips/var.less';
@import '~@/styles/components/tooltips/arrow.less';

@block: som-tooltips;

.@{block} {
    position: absolute;
    left: 0;
    top: 0;
    border-radius: var(--tooltips-border-radius);
    z-index: 500;
    box-shadow: var(--box-shadow-bottom);
    border: 1px solid;

    &__content {
        display: flex;
        text-align: left;
        max-width: calc(var(--tooltips-max-width) - 2px);
        font-size: var(--tooltips-content-fs);
        line-height: 20px;
        font-weight: var(--tooltips-content-fw);
        padding: 11px 15px;
        &.has-title {
            font-size: 13px;
            line-height: 16px;
            padding-bottom: 18px;
            padding-top: 11px;
        }
        &-wrapper {
            .@{block}__title {
                line-height: 21px;
                font-size: var(--tooltips-title-fs);
                font-weight: var(--tooltips-title-fw);
                margin-bottom: 8px;
            }
        }
        .@{block}__close {
            flex-shrink: 0;
            width: var(--tooltips-close-size);
            height: var(--tooltips-close-size);
            line-height: calc(var(--tooltips-line-height) + (var(--tooltips-line-height) - var(--tooltips-content-fs)) / 2);
            margin-left: 15px;
            .@{block}__svg-icon {
                width: 100%;
                height: 100%;
                margin-top: 3px;
            }
        }
    }
    &__light {
        color: var(--tooltips-light-color);
        background-color: var(--tooltips-light-bg);
        border-color: var(--tooltips-light-border-color);
        .@{block}__close {
            fill: var(--tooltips-light-color);
        }
    }
    &__dark {
        color: var(--tooltips-dark-color);
        background-color: var(--tooltips-dark-bg);
        border-color: var(--tooltips-dark-border-color);
        .@{block}__close {
            fill: var(--tooltips-dark-color);
        }
    }
    &__active {
        color: var(--tooltips-active-color);
        background-color: var(--tooltips-active-bg);
        border-color: var(--tooltips-active-border-color);
        .@{block}__close {
            fill: var(--tooltips-active-color);
        }
    }
}
</style>

<template>
    <span 
        ref="triggerRef"  
        @click="toggleBySlot">
        <slot></slot>
    </span>
    <teleport to="body">
        <div
            v-show="show"
            v-click-outside="onClickedOutside"
            v-bind="$attrs"
            :class="['som-tooltips', tipsClass, {
                ['som-tooltips__'.concat(this.effect)]: !!this.effect,
            }]"
            ref="tipsRef"
            :style="tipsStyle"
        >
            <div :class="arrowClass"></div>
            <div
                @click="$emit('click-content')"
                class="som-tooltips__content"
                :class="{'has-title': $slots.title || title}"
            >
                <div class="som-tooltips__content-wrapper">
                    <div
                        class="som-tooltips__title"
                        v-if="$slots.title || title"
                    >
                        <slot name="title">
                            <div v-html="title"></div>
                        </slot>
                    </div>

                    <slot name="content">
                        <div v-html="content"></div>
                    </slot>
                </div>
                <div
                    v-if="closable"
                    class="som-icon-close som-tooltips__close"
                    @click="handleClose"
                >
                    <som-icon
                        class="som-tooltips__svg-icon"
                        department="base"
                        type="close-s"
                        color="#fff"
                        size="13px"
                    ></som-icon>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, reactive, ref } from 'vue';
import { changePxToVw } from '@/common/utils';
import { useGlobalConfig } from '@/config';
import ClickOutside from './directive';
import TooltipsProps from './tooltipsPropType';
import { arrowIconClass, calcPosition } from './utils';
import { SomIcon } from '../icon';

interface ITipsStyle {
    position?: string;
    top?: string;
    left?: string;
    display?: 'block' | 'none';
}

export default defineComponent({
    name: 'SomTooltips',
    directives: {
        ClickOutside,
    },
    components: {
        SomIcon,
    },
    props: TooltipsProps,
    emits: ['show', 'hide', 'update:show', 'click-content'],
    setup(props, ctx) {
        // composition封装逻辑块
        const { needChangeToVw } = useGlobalConfig().config;
        // 获取小箭头的class
        const arrowClass = arrowIconClass(props);

        // data数据块
        const { emit } = ctx;
        // 样式
        const tipsStyle = reactive<ITipsStyle>({});
        // 两个部分的ref
        const triggerRef = ref({} as HTMLElement);
        const tipsRef = ref({} as HTMLElement);

        // methods方法块
        // 关闭操作
        const handleClose = () => {
            emit('update:show', false);
            emit('hide');
        };

        // 点击外部是否关闭tips
        const onClickedOutside = () => {
            props.show && props.hideOnBlur && handleClose();
        };

        // 点击触发元素时是否操作tips
        const toggleBySlot = () => {
            if (props.isTrigger) {
                emit('update:show', !props.show);
                emit(`${!props.show === true ? 'show' : 'hide'}` as 'show' | 'hide');
            }
        };

        // lifecycle生命周期块
        onMounted(() => {
            nextTick(() => {
                const trigger = triggerRef.value.children[0] as HTMLElement;
                if (!trigger) {
                    // 如果不存在目标元素，则设置tips
                    tipsStyle.position = 'absolute';
                } else {
                    // 暂时设置display为‘’，拿tips的宽高等属性
                    tipsRef.value.style.display = '';
                    // 计算拿到tips的位置
                    const position = calcPosition(props.placement, props.gutter, trigger, tipsRef.value);
                    // 设置tips样式
                    tipsStyle.display = props.show ? 'block' : 'none';
                    tipsStyle.top = `${position.value.top}px`;
                    tipsStyle.left = `${position.value.left}px`;
                    // 判断是否需要格式化为vw单位
                    if (needChangeToVw) {
                        tipsStyle.top = changePxToVw(tipsStyle.top);
                        tipsStyle.left = changePxToVw(tipsStyle.left);
                    }
                }
            });
        });

        return {
            triggerRef,
            tipsRef,
            tipsStyle,
            arrowClass,
            onClickedOutside,
            toggleBySlot,
            handleClose,
        };
    },
});
</script>
