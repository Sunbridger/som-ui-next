<style lang="less">
@import '~@/styles/components/overlay/var.less';
@import '~@/styles/transition/index.less';
@import '~lemon/less/mixins/basic.less';

.som-mask {
    .mask(@opacity: var(--mask-opacity), @zIndex: 500);
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    transition: opacity var(--mask-time);
    &.is-transparent {
        background: transparent;
    }
}
</style>

<template>
    <transition :name="maskTransition">
        <div
            v-show="show"
            :style="maskCustomStyle"
            :class="maskTransparentClass"
            @touchmove="lockScroll ? preventTouchMove : () => {}"
        >
            <slot></slot>
        </div>
    </transition>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { preventDefault } from '@/common/utils/events';
import { OverlayProps } from './overlayType';

export default defineComponent({
    name: 'SomOverlay',
    props: OverlayProps,
    setup(props) {
        // computed计算属性块
        // 蒙层的class
        const maskTransparentClass = computed(() => ({
            'som-mask': true,
            'som-mask-show': !!props.show,
            'is-transparent': !!props.isTransparent,
        }));
        // 蒙层style
        const maskCustomStyle = computed(() => ({
            ...props.maskStyle,
            zIndex: props.maskZIndex,
        }));

        // methods方法块
        // 阻止默认事件
        const preventTouchMove = (event: TouchEvent): void => {
            preventDefault(event, true);
        };

        return {
            maskTransparentClass,
            maskCustomStyle,
            preventTouchMove,
        };
    },
});
</script>
