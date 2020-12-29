<style lang="less">
@import '~@/styles/components/modal/var.less';

@block: som-modal;

.@{block} {
    border-radius: var(--modal-border-radius);
    &__wrapper {
        width: var(--modal-width);
        padding: var(--modal-pd-top) 0 var(--modal-pd-bottom);
        text-align: center;
        .@{block}__title {
            padding-left: 24px;
            padding-right: 24px;
            line-height: 26px;
            font-size: var(--modal-title-fs);
            font-weight: var(--modal-title-fw);
            color: var(--modal-title-color);
            margin-bottom: var(--modal-pd-title-content);
        }
        .@{block}__content {
            font-size: var(--modal-content-fs);
            font-weight: var(--modal-content-fw);
            color: var(--modal-content-color);
            max-height: var(--modal-max-height);
            overflow-y: scroll;
            line-height: 22px;
            padding-left: 24px;
            padding-right: 24px;
        }
        .@{block}__ft {
            height: var(--modal-action-height);
            padding-left: 20px;
            padding-right: 20px;
            margin-top: var(--modal-pd-content-action);
            &__btn-group {
                padding: 0;
            }
            .som-button .som-button--content {
                padding: 0 18px;
            }
        }
    }
}
</style>

<template>
    <som-popup
        class="som-modal"
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
        <div class="som-modal__wrapper relative">
            <div
                class="som-modal__title"
                v-if="$slots.title || title"
            >
                <slot name="title">
                    <div
                        v-if="title"
                        v-html="title"
                    ></div>
                </slot>
            </div>
            <div
                class="som-modal__content"
                v-if="$slots.default || content"
            >
                <slot>
                    <div
                        v-if="content"
                        v-html="content"
                    ></div>
                </slot>
            </div>
            <div class="som-modal__ft">
                <slot name="footer">
                    <som-button-group class="som-modal__ft__btn-group">
                        <som-button
                            type="assist"
                            v-if="isConfirm"
                            :style="cancelStyle"
                            :loading="loading.cancel"
                            @click="onCancelMethod"
                        >
                            <span v-html="cancelText || '取消'"></span>
                        </som-button>
                        <som-button
                            type="warning"
                            :style="confirmStyle"
                            :loading="loading.confirm"
                            @click="onConfirmMethod"
                        >
                            <span v-html="confirmText || '确定'"></span>
                        </som-button>
                    </som-button-group>
                </slot>
            </div>
        </div>
    </som-popup>
</template>

<script lang="ts">
import { computed, CSSProperties, defineComponent, reactive, toRefs } from 'vue';
import { isPromise } from '@/common/utils';
import { useShowPopupMinixState } from '@/common/composition/show';
import { ModalProp } from './modalType';
import { SomPopup } from '../popup';
import { SomButton, SomButtonGroup } from '../button';

// 按钮类型
type actionType = 'confirm' | 'cancel';

export default defineComponent({
    name: 'SomModal',
    components: {
        SomPopup,
        SomButton,
        SomButtonGroup,
    },
    props: ModalProp,
    emits: ['update:show', 'click-mask', 'show', 'hide', 'cancel', 'confirm'],
    setup(props, { emit }) {
        // composition封装逻辑块
        // 获得操作popup的minix
        const { state, closeDialog, clickMask } = useShowPopupMinixState(props, emit);

        // data数据块
        const data = reactive({
            loading: {
                confirm: false,
                cancel: false,
            },
        });
        // computed计算属性块
        const styles = computed(() => {
            let customStyles: CSSProperties = {
                zIndex: +props.maskZIndex + 1,
            };
            customStyles = Object.assign({}, customStyles, props.customStyle || {});
            return customStyles;
        });

        // methods方法块
        // 按钮操作事件
        const handleAction = (action: actionType) => {
            if (!props.show) {
                return;
            }
            let emitEvent: 'cancel' | 'confirm';
            let propsKey: 'onCancel' | 'onConfirm';
            if (action === 'confirm') {
                emitEvent = 'confirm';
                propsKey = 'onConfirm';
            } else {
                emitEvent = 'cancel';
                propsKey = 'onCancel';
            }

            // 触发emit事件
            emit(emitEvent);
            const actionMethodsProps = props[propsKey];
            // 如果有监听事件（confirm、cancel）
            if (actionMethodsProps) {
                const actionRes = actionMethodsProps(closeDialog);
                // 如果是promise，则等待promise完成之后在关闭loading
                if (isPromise(actionRes)) {
                    // 显示loading图标
                    if (props.confirmLoading) {
                        data.loading[action] = true;
                    }
                    actionRes
                        .then(() => {
                            closeDialog();
                        })
                        .finally(() => {
                            data.loading[action] = false;
                        });
                }
            } else {
                closeDialog();
            }
        };

        // 取消按钮
        const onCancelMethod = () => {
            handleAction('cancel');
        };
        // 确认按钮
        const onConfirmMethod = () => {
            handleAction('confirm');
        };

        return {
            ...toRefs(data),
            state,
            styles,
            closeDialog,
            clickMask,
            onCancelMethod,
            onConfirmMethod,
        };
    },
});
</script>
