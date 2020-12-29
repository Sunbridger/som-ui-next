<style lang="less">
@import '~@/styles/components/tag/var.less';

.som-tag {
    height: var(--tag-normal-height);
    // line-height: var(--tag-normal-height);
    font-size: var(--tag-normal-fs);
    padding: 0 var(--tag-normal-padding);
    color: var(--tag-primary-color);
    border: 1px solid transparent;
    border-radius: var(--border-radius-small);
    // overflow: hidden;
    white-space: nowrap;
    &--filled {
        background: var(--tag-primary-bg);
    }
    &--selected {
        background: var(--tag-selected-bg);
        color: var(--tag-selected-color);
        border: 1px solid var(--tag-selected-border-color);
    }
    &--disable {
        background: var(--tag-disable-bg);
        color: var(--tag-disable-color);
        border: 1px solid transparent;
    }
    .tagSizeVar() {
        // normal: var(--tag-normal-height) var(--tag-normal-fs) var(--tag-normal-padding) var(--border-radius-small);
        medium: var(--tag-medium-height) var(--tag-medium-fs) var(--tag-medium-padding) var(--border-radius-small);
        small: var(--tag-small-height) var(--tag-small-fs) var(--tag-small-padding) var(--border-radius-mini);
        mini: var(--tag-mini-height) var(--tag-mini-fs) var(--tag-mini-padding) var(--border-radius-mini);
        smini: var(--tag-smini-height) var(--tag-smini-fs) var(--tag-smini-padding) var(--border-radius-mini);
    }
    each(.tagSizeVar(), .(@v,@k) {
        &--@{k} {
            height: extract(@v, 1);
            // line-height: extract(@v, 1);
            font-size: extract(@v, 2);
            padding: 0 extract(@v, 3);
            border-radius: extract(@v, 4);
        }
    })
    &--half-radius {
        border-radius: var(--border-radius-half) !important;
    }
    &__text {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
    }
}
</style>

<template>
    <span
        class="som-tag flex flex-align-center"
        :class="tagClass"
        :style="tagStyles"
    >
        <slot name="icon"></slot>
        <span class="som-tag__text flex flex-justify-center flex-align-center"><slot></slot></span>
        <slot name="close">
             <div class="som-tag__close flex flex-justify-center ml4" @click="handleClose" v-if="closeable">
                <som-icon department="base" :size="closeIconSize" type="close-s" color="#8D8E99"></som-icon>
            </div>
        </slot>
    </span>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { cleanStyle } from '@/common/utils';
import { SomIcon } from '../icon';

export default defineComponent({
    name: 'SomTag',
    props: {
        type: {
            type: String,
            default: 'primary',
        },
        size: {
            type: String,
            default: 'normal',
        },
        filled: {
            type: Boolean,
            default: true,
        },
        bgColor: {
            type: String,
        },
        color: {
            type: String,
        },
        borderColor: {
            type: String,
        },
        halfRadius: {
            type: Boolean,
            default: false,
        },
        closeable: {
            type: Boolean,
            default: false,
        },
        closeIconSize: {
            type: [Number, String],
            default: 12
        }
    },
    components: { SomIcon },
    emits: ['on-close'],
    setup(props, { emit }) {
        const tagClass = computed(() => ({
            [`som-tag--${props.type}`]: !!props.type,
            [`som-tag--${props.size}`]: !!props.size,
            'som-tag--half-radius': props.halfRadius,
            'som-tag--filled': props.filled,
        }));
        const tagStyles = computed(() =>
            cleanStyle({
                background: props.bgColor,
                color: props.color,
                borderColor: props.borderColor,
            }),
        );
        const handleClose = () => {
            emit('on-close');
        };
        return {
            tagClass,
            tagStyles,
            handleClose,
        };
    },
});
</script>
