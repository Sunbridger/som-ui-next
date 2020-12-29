<style lang="less">
@import '~@/styles/components/popup/var.less';
@import '~@/styles/transition/index.less';

@block: som-popup;

.@{block} {
    position: fixed;
    background: var(--popup-bg);
    z-index: 502;
    max-height: 100%;
    overflow-y: auto;
    opacity: 1;
    transition: all 0.4s;
    -webkit-overflow-scrolling: touch;
    &.@{block}--bottom {
        width: auto;
        height: 100%;
        bottom: 0;
        right: 0;
        left: 0;
        top: auto;
        border-top-left-radius: var(--popup-border-radius);
        border-top-right-radius: var(--popup-border-radius);
    }
    &.@{block}--left {
        width: auto;
        height: 100%;
        top: 0;
        right: auto;
        bottom: auto;
        left: 0;
    }
    &.@{block}--right {
        width: auto;
        height: 100%;
        top: 0;
        right: 0;
        bottom: auto;
        left: auto;
    }
    &.@{block}--top {
        width: 100%;
        top: 0;
        right: auto;
        bottom: auto;
        left: 0;
        border-bottom-left-radius: var(--popup-border-radius);
        border-bottom-right-radius: var(--popup-border-radius);
    }
    &.@{block}--center {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(1);
    }
}
</style>

<template>
    <som-overlay
        v-show="isShowMask"
        :class="['som-popup-mask', maskClass]"
        :z-index="maskZIndex"
        :mask-transition="maskTransition"
        :is-transparent="isTransparent"
        :lock-scroll="lockScroll"
        @click="clickMask"
    ></som-overlay>
    <transition
        v-bind="$attrs"
        :name="!!transition ? transition : `som-popup-animate-${position}`"
    >
        <div
            v-show="state.showPopup"
            :class="[
                'som-popup',
                `som-popup--${position}`,
                {
                    'som-popup--hidden': !state.showPopup,
                },
            ]"
            :style="styles"
        >
            <slot></slot>
        </div>
    </transition>
</template>

<script lang="ts">
import { computed, CSSProperties, defineComponent } from 'vue';
import { useShowPopupMinixState } from '@/common/composition/show';
import { SomOverlay } from '../overlay/index';
import { PopupProp } from './popupType';

// 圆角的js对象key值
const positionBorderRadius = {
    center: ['border-radius'],
    left: ['border-top-right-radius', 'border-bottom-right-radius'],
    right: ['border-top-left-radius', 'border-bottom-left-radius'],
    top: ['border-bottom-left-radius', 'border-bottom-right-radius'],
    bottom: ['border-top-left-radius', 'border-top-right-radius'],
};

export default defineComponent({
    name: 'SomPopup',
    emits: ['update:show', 'click-mask', 'hide', 'show', 'close', 'first-show'],
    components: {
        SomOverlay,
    },
    props: PopupProp,
    setup(props, { emit }) {
        let hasFirstShow = false;

        // composition封装逻辑块
        const { state, closeDialog, clickMask } = useShowPopupMinixState(props, emit, (show: boolean) => {
            // 触发打开弹窗逻辑
            emit('update:show', show);
            if (show && !hasFirstShow) {
                // 第一次打开时触发first-show emit
                emit('first-show');
                emit('show');
                hasFirstShow = true;
            } else if (show) {
                emit('show');
            } else {
                emit('hide');
            }
        });

        // computed计算属性块
        // 是否显示蒙层
        const isShowMask = computed(() => props.show && props.showMask);

        // 设置style
        // 居中状态的popup支持设置宽高，而上下位置的只允许设置高度，同理左右的只能设置宽度
        const styles = computed(() => {
            let customStyles: CSSProperties = {};
            if (props.position === 'center') {
                // 中间位置弹窗宽高都可设置
                customStyles.width = props.width;
                customStyles.height = props.height;
            } else if (!props.position || props.position === 'bottom' || props.position === 'top') {
                // y轴方向设置height
                customStyles.height = props.height;
            } else {
                // x轴方向设置width
                customStyles.width = props.width;
            }

            // 最大高度
            if (props.maxHeight) {
                customStyles['max-height'] = props.maxHeight;
            }

            // 层级，高过蒙层1
            if (props.maskZIndex) {
                customStyles['z-index'] = +props.maskZIndex + 1;
            }

            // 根据position判断出要加的radius属性
            // 给对应圆角的js key附上具体的radius值
            const positionRdaius = positionBorderRadius[props.position];
            if (positionRdaius && props.borderRadius) {
                positionRdaius.forEach(item => {
                    customStyles[item] = props.borderRadius;
                });
            }

            customStyles = Object.assign({}, customStyles, props.customStyle || {});
            return customStyles;
        });

        return {
            state,
            isShowMask,
            styles,
            closeDialog,
            clickMask,
        };
    },
});
</script>
