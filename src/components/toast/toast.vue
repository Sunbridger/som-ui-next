<style lang="less">
@import '~@/styles/components/toast/var.less';
@import '~@/styles/transition/index.less';

@block: som-toast;

.@{block} {
    font-size: var(--toast-font-size);
    line-height: var(--toast-line-height);
    font-weight: var(--toast-font-weight);
    color: var(--toast-font-color);

    border-radius: var(--toast-border-radius);

    background-color: var(--toast-bg-color);
    opacity: var(--toast-bg-opacity);

    &.has-icon {
        border-radius: var(--toast-icon-border-radius);
    }

    &.has-icon &__wrap {
        min-width: var(--toast-icon-type-min-size);
        min-height: var(--toast-icon-type-min-size);
        padding: var(--toast-icon-content-padding-top) var(--toast-content-padding-lr) var(--toast-icon-content-padding-bottom);
        .@{block}__content {
            font-size: var(--toast-icon-font-size);
        }
    }

    &__wrap {
        max-width: var(--toast-max-width);
        padding: var(--toast-content-padding-bt) var(--toast-content-padding-lr);
        text-align: center;
        border-radius: var(--toast-border-radius);

        .@{block}__icon {
            display: inline-block;
            width: var(--toast-icon-size);
            height: var(--toast-icon-size);
            margin-bottom: var(--toast-icon-content-padding-center);
        }
        .@{block}__content {
            word-break: break-all;
        }
    }
    &.@{block}--top {
        top: 10px;
        transform: translateX(-50%);
    }
    &.@{block}--bottom {
        top: auto;
        bottom: 10px;
        transform: translateX(-50%);
    }
    &.@{block}--custom-position {
        transform: translateX(-50%);
    }
}
</style>

<template>
    <som-popup
        v-model:show="state.showPopup"
        :class="['som-toast', className ? className : '', icon ? 'has-icon' : '', ...customCls]"
        :show-mask="showMask"
        :mask-z-index="maskZIndex"
        :mask-transition="maskTransition"
        :mask-class="maskClass"
        :transition="currentTransition"
        :is-transparent="isTransparent"
        :hide-on-blur="hideOnBlur"
        :lockScroll="lockScroll"
        position="center"
        :style="[{ top: top ? top : '' }, { width: 'fit-content' }]"
        @click-mask="clickMask"
    >
        <div class="som-toast__wrap">
            <div class="som-toast__icon" v-if="icon">
                <template v-if="typeof icon === 'function'">{{icon()}}</template>
                <som-icon v-else-if="typeof icon === 'string'" department="base" :type="icon"></som-icon>
                <som-icon v-else-if="typeof icon === 'object'" v-bind="icon"></som-icon>
            </div>
            <div
                class="som-toast__content"
                v-if="typeof text === 'function'"
            >
                {{ text() }}
            </div>
            <div
                class="som-toast__content"
                v-html="text"
                v-else
            ></div>
        </div>
    </som-popup>
</template>

<script lang="ts">
import { useShowPopupMinixState } from '@/common/composition/show';
import { computed, defineComponent } from 'vue';
import { SomPopup } from '../popup';
import { ToastProp } from './toastType';
import { SomIcon } from '../icon';

export default defineComponent({
    name: 'SomToast',
    props: ToastProp,
    emits: ['update:show', 'click-mask', 'show', 'hide'],
    components: {
        SomPopup,
        SomIcon,
    },
    setup(props, { emit }) {
        let timer: number | undefined;

        const { state, clickMask } = useShowPopupMinixState(props, emit, (show: boolean) => {
            if (show && props.time > 0) {
                clearTimeout(timer);
                // 开启延时关闭
                timer = setTimeout(() => {
                    emit('update:show', false);
                }, props.time);
            } else {
                emit('hide');
            }
        });

        // 计算距离顶部的距离
        const top = computed(() => {
            const isType = ['default', 'top', 'middle', 'bottom'].includes(props.position);
            if (!isType) {
                return props.position;
            } else {
                return undefined;
            }
        });

        // 根据position 加上对应的class
        const customCls = computed(() => {
            const cls: string[] = [];
            const isType = ['default', 'top', 'middle', 'bottom'].includes(props.position);
            if (isType) {
                cls.push(`som-toast--${props.position}`);
            } else {
                cls.push('som-toast--custom-position');
            }
            return cls;
        });

        // 根据position 加上对应的动画
        const currentTransition = computed(() => {
            if (props.transition) {
                return props.transition;
            }
            if (props.position === 'top') {
                return 'som-slide-from-top';
            }
            if (props.position === 'bottom') {
                return 'som-slide-from-bottom';
            }
            return 'som-fade';
        });

        return {
            state,
            clickMask,
            top,
            currentTransition,
            customCls,
        };
    },
});
</script>
