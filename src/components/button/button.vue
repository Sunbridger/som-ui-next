<style lang="less">
@import '~@/styles/components/button/var.less';
@import '~@/styles/transition/index.less';

@block: som-button;

.@{block} {
    // 背景色, 文字色
    @primary-list: var(--primary), var(--text-anti);
    @success-list: var(--success), var(--text-anti);
    @warning-list: var(--warning), var(--text-anti);
    @link-list: var(--link), var(--text-anti);
    @assist-list: var(--button-assist-bg), var(--button-assist-color);

    width: 100%;
    outline: 0;
    border: 0;
    text-align: center;
    text-decoration: none;
    box-sizing: border-box;
    overflow: hidden;
    padding: 0;
    font-size: var(--button-normal-fs);
    font-weight: var(--button-font-weight);
    background-color: var(--primary);
    color: var(--text-anti);

    .som-icon {
        margin-right: 6px;
        // width: 24px;
        font-size: 24px;
    }

    .buttonType() {
        success: @success-list;
        assist: @assist-list;
        primary: @primary-list;
        warning: @warning-list;
        link: @link-list;
    }

    each(.buttonType(), .(@v, @k) {
        &--@{k} {
            border: 0;
            background-color: extract(@v, 1);
            color: extract(@v, 2);
            // &:active {
            //     // background-color: darken(extract(@v, 1), 5);
            //     color: extract(@v, 2);
            // }
        }

        // normal
        &--@{k}&--mode-normal {
            border: 0;
            background-color: extract(@v, 1);
            color: extract(@v, 2);
        }
        // border
        &--@{k}&--mode-border {
            border: var(--button-border-width) solid extract(@v, 1);
            background-color: var(--button-border-mode-bg);
            color: extract(@v, 1);
            // &:active {
            //     background-color: lighten(extract(@v, 1), 35);
            // }
        }

        // link
        &--@{k}&--mode-link {
            border: 0;
            background-color: inherit;
            color: extract(@v, 1);
            // &:active {
            //     color: lighten(extract(@v, 1), 15);
            // }
        }
        // plain
         &--@{k}&--mode-plain {
            border: var(--button-border-width) solid extract(@v, 1);
            background-color: transparent;
            color: extract(@v, 1);
            // &:active {
            //     background-color: rgba(#fff,0);
            // }
        }
    })

    .buttonSizeVar() {
        normal: var(--button-normal-height) var(--button-normal-fs) var(--button-normal-mini-padding) var(--button-normal-mini-width);
        medium: var(--button-medium-height) var(--button-medium-fs) var(--button-medium-mini-padding) var(--button-medium-mini-width);
        small: var(--button-small-height) var(--button-small-fs) var(--button-small-mini-padding) var(--button-small-mini-width);
    }

    each(.buttonSizeVar(), .(@v, @k) {
        &--@{k} {
            height: extract(@v, 1);
            font-size: extract(@v, 2);
            min-width: extract(@v, 4);
            .@{block}__content {
                padding: 0 extract(@v, 3);

                // android medium 按钮 字体偏上
                line-height: normal;
            }
            .@{block}__icon {
                width: calc(extract(@v, 2) + 4px);
                height: calc(extract(@v, 2) + 4px);
            }
        }
    })


    &--inline {
        width: auto;
    }

    .buttonBorderVar() {
        half: var(--border-radius-half);
        large: var(--border-radius-large);
        medium: var(--border-radius-medium);
        small: var(--border-radius-small);
        mini: var(--border-radius-mini);
    }

    each(.buttonBorderVar(), .(@v, @k) {
        &--border-@{k} {
            border-radius: extract(@v, 1);
        }
    });

    &--disabled {
        opacity: var(--button-disabled-opacity);
    }

    // .som-button-loading-icon {
    //     font-size: 24px;
    //     margin-right: 6px;
    //     animation-duration: 2s;
    // }
    &__icon {
        display: inline-block;
        vertical-align: middle;
        margin-right: 6px;
        &.@{block}__loading-icon {
            circle {
                animation: loading-easy-animation 1.5s ease-in-out infinite;
                stroke: currentColor;
                stroke-width: 3;
                stroke-linecap: round;
            }
        }
    }
}
</style>

<template>
    <button
        :class="buttonClass"
        :disabled="disabled || loading"
        :type="actionType"
        :style="buttonStyle"
        @click="onClick"
    >
        <div class="som-button__content">
            <!-- icon -->
            <!-- <img v-if="loading" src="./loading.svg" class="som-icon"/> -->
            <!-- TODO only a test -->
            <svg
                v-if="loading"
                class="som-button__icon som-button__loading-icon"
                viewBox="25 25 50 50"
            >
                <circle
                    cx="50"
                    cy="50"
                    r="20"
                    fill="none"
                />
            </svg>
            <div
                v-else-if="icon"
                class="som-button__icon"
            >
                <!-- icon {{ icon }} -->
            </div>
            <!-- text -->
            <slot></slot>
        </div>
    </button>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { throttle } from 'throttle-debounce';
import { inBrowser } from '@/common/utils';
import { injectParent } from '@/common/composition/communicate';
import { ButtonActionType, ButtonBorderType, ButtonMode, ButtonSize, ButtonType } from 'types/components/button';
import { FormMethods, FormName } from '../form/form-types';

export default defineComponent({
    name: 'SomButton',
    props: {
        type: {
            type: String as PropType<ButtonType>,
            default: 'primary',
        },
        size: {
            type: String as PropType<ButtonSize>,
            default: 'normal',
        },
        border: {
            type: String as PropType<ButtonBorderType>,
            default: 'half',
        },
        mode: {
            type: String as PropType<ButtonMode>,
            default: 'normal',
        },
        inline: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        icon: String,
        loading: {
            type: Boolean,
            default: false,
        },
        delayTime: Number,
        actionType: {
            type: String as PropType<ButtonActionType>,
            default: 'button',
        },
    },
    emits: ['click'],
    setup(props, { emit }) {
        // 父子组件传递的数据
        const { publicParent: formPub } = injectParent<FormMethods>(FormName);

        // data数据块
        let clickThrottle: undefined | Function = undefined; // 点击时延

        // computed计算属性块
        // 按钮class
        const buttonClass = computed(() => ({
            'som-button': true,
            'som-button--inline': props.inline,
            'som-button--disabled': props.disabled,
            [`som-button--${props.type}`]: !!props.type,
            [`som-button--${props.size}`]: !!props.size,
            [`som-button--mode-${props.mode}`]: !!props.mode,
            [`som-button--border-${props.border}`]: ['half', 'large', 'medium', 'small', 'mini'].includes(props.border) && !!props.border,
        }));
        // button style computed
        // 按钮的圆角，不是默认的类型则当作具体指出来
        const buttonStyle = computed(() => ({
            borderRadius: !['half', 'large', 'medium', 'small', 'mini'].includes(props.border),
        }));

        // methods方法块
        // 点击事件
        const onClick = (e?: Event): void => {
            // 如果是submit, 触发表单的提交
            if (props.actionType === 'submit' && formPub) {
                formPub.submit();
            }
            if (clickThrottle) {
                // 点击延时
                clickThrottle(e);
            } else {
                emit('click', e);
            }
        };

        // lifecycle生命周期
        props.delayTime &&
            inBrowser &&
            (clickThrottle = throttle(props.delayTime, true, (e?: Event) => {
                emit('click', e);
            }));

        return {
            buttonClass,
            buttonStyle,
            onClick,
        };
    },
});
</script>
