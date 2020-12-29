<style lang="less">
@import '~@/styles/components/dialog/var.less';
@import '~@/styles/transition/index.less';

@block: som-dialog;

.@{block} {
    background: transparent;
    display: flex;
    flex-flow: column;
    &__outside-close {
        font-size: 0;
        .@{block}__close-svg {
            float: right;
            margin-bottom: var(--dialog-close-button-outside-padding);
        }
    }
    &__inside-close {
        z-index: 2;
        font-size: 0;
        position: absolute;
        top: var(--dialog-close-button-inside-padding);
        right: var(--dialog-close-button-inside-padding);
    }
    &__content {
        height: 100%;
        background: var(--dialog-bg);
        border-radius: var(--dialog-border-radius);
    }
    &_close-svg {
        width: var(--dialog-close-button-width);
        height: var(--dialog-close-button-width);
    }
}
</style>

<template>
    <som-popup
        class="som-dialog"
        v-model:show="state.showPopup"
        :mask-z-index="maskZIndex"
        :mask-transition="maskTransition"
        :transition="transition"
        :hide-on-blur="hideOnBlur"
        :lockScroll="lockScroll"
        position="center"
        :style="styles"
        @click-mask="clickMask"
    >
        <div
            v-if="isCancel && closeBtnPosition === 'outside'"
            class="som-dialog__outside-close"
        >
            <som-icon
                department="base"
                type="circle-close"
                class="som-dialog__close-svg"
                color="#c4c4cc"
                @click="clickClose"
            ></som-icon>
        </div>
        <div
            class="som-dialog__content relative"
            :style="{ height: height }"
        >
            <div
                v-if="isCancel && closeBtnPosition === 'inside'"
                class="som-dialog__inside-close"
            >
                <som-icon
                    department="base"
                    type="circle-close"
                    class="som-dialog__close-svg"
                    color="#c4c4cc"
                    @click="clickClose"
                ></som-icon>
            </div>
            <slot></slot>
        </div>
    </som-popup>
</template>

<script lang="ts">
import { computed, CSSProperties, defineComponent } from 'vue';
import { useShowPopupMinixState } from '@/common/composition/show';
import { SomPopup } from '../popup';
import DialogProp from './dialogType';
import { SomIcon } from '../icon';

export default defineComponent({
    name: 'SomDialog',
    emits: ['update:show', 'click-mask', 'show', 'hide', 'close'],
    components: {
        SomPopup,
        SomIcon,
    },
    props: DialogProp,
    setup(props, { emit }) {
        // composition封装逻辑
        // 封装好的一层minix，封装了打开关闭Popup的逻辑，返回state和method
        const { state, closeDialog, clickMask, clickClose } = useShowPopupMinixState(props, emit);

        // computed计算属性
        // 获得style
        const styles = computed(() => {
            const customStyles: CSSProperties = {};
            props.width && (customStyles.width = props.width);
            customStyles.zIndex = +props.maskZIndex + 1;
            Object.assign(customStyles, props.customStyle || {});
            return customStyles;
        });

        return {
            state,
            styles,
            closeDialog,
            clickMask,
            clickClose,
        };
    },
});
</script>
