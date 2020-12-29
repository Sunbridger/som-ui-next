<style lang="less">
@import '~@/styles/components/loading/var.less';

@block: som-loading;

.@{block} {
    border-radius: var(--loading-border-radius);
    background-color: var(--loading-bg-color);
    opacity: var(--loading-bg-opacity);
    &__wrap {
        text-align: center;
        min-width: var(--loading-icon-type-min-size);
        min-height: var(--loading-icon-type-min-size);
        padding: var(--loading-icon-content-padding-top) var(--loading-content-padding-lr) var(--loading-icon-content-padding-bottom);
        .@{block}__icon {
            display: inline-block;
            width: var(--loading-icon-size);
            height: var(--loading-icon-size);
            background: transparent;
            margin-bottom: var(--loading-icon-content-padding-center);
            img {
                display: inline-block;
                width: inherit;
                height: auto;
            }
        }
        .@{block}__content {
            color: #fff;
            word-break: break-all;
            font-size: var(--loading-icon-font-size);
        }
    }
    .white-wrapper {
        background-color: #fff;
        .@{block}__content {
            color: var(--loading-icon-white-color);
        }
    }
    @keyframes som-loading-circle {
        0% {
            transform: rotateZ(0deg);
        }
        25% {
            transform: rotateZ(90deg);
        }
        50% {
            transform: rotateZ(180deg);
        }
        75% {
            transform: rotateZ(270deg);
        }
        100% {
            transform: rotateZ(360deg);
        }
    }
    &__icon-circle {
        animation: som-loading-circle 1s linear infinite;
        stroke: currentColor;
        stroke-width: 3;
        stroke-linecap: round;
    }
}
.white-mask {
    background-color: #fff;
}
</style>

<template>
    <som-popup
        v-model:show="showLoading"
        class='som-loading'
        :mask-transition="type === 'white' ? 'nonetranstion' : ''"
        :transition="type === 'white' ? 'nonetranstion' : ''"
        :maskClass="type === 'white' ? 'white-mask' : ''"
        :show-mask="showMask"
        :hide-on-blur="hideOnBlur"
        :lockScroll="lockScroll"
        position="center"
        :style="{'border-radius': type === 'white' ? 'inherit' : ''}"
    >
        <div :class="['som-loading__wrap', type === 'white' ? 'white-wrapper' : '']">
            <div class="som-loading__icon">
                <img
                    class="som-loading__icon-circle"
                    :src="svg"
                    alt=""
                >
            </div>
            <div
                class="som-loading__content"
                v-html="text"
            ></div>
        </div>
    </som-popup>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { SomPopup } from '../popup';

export default defineComponent({
    name: 'SomLoading',
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            default: '',
        },
        showMask: {
            type: Boolean,
            default: true,
        },
        text: {
            type: String,
            default: '加载中...',
        },
        svg: {
            type: String,
            default: 'https://img.souche.com/zd1uveu53twcmiy0jtnx0b29o8wzjx6k.svg',
        },
        fullScreen: {
            type: Boolean,
            default: true,
        },
    },
    emits: ['update:show', 'click-mask', 'show', 'hide'],
    components: {
        SomPopup,
    },
    setup(props, { emit }) {
        // data数据块
        const showLoading = ref(false);
        const hideOnBlur = ref(false);
        const lockScroll = ref(true);
        // watch状态监听块
        watch(showLoading, (val) => {
            if (val) {
                emit('show');
            } else {
                emit('hide');
            }
        });

        watch(
            () => props.show,
            (val) => {
                showLoading.value = val;
            },
        );

        return {
            lockScroll,
            hideOnBlur,
            showLoading,
        };
    },
});
</script>
