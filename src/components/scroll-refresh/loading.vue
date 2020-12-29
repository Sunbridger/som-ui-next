<style lang="less">
@import '~@/styles/components/scroll-refresh/var.less';

@block: som-scroll-refresh__spinner;

.@{block} {
    vertical-align: middle;
    &__icon {
        margin-bottom: unset;
        &.is-loading .@{block}__loading-circular {
            animation: van-circular-rotate 1.5s linear infinite;
        }
    }
    &__icon,
    &__text {
        line-height: 1;
        vertical-align: middle;
    }
    &__text {
        font-size: var(--scroll-refresh-down-font-size);
    }
    &__loading-circular {
        width: var(--scroll-refresh-down-icon-size);
        height: var(--scroll-refresh-down-icon-size);
    }

    &-vertical {
        display: flex;
        flex-flow: column;
        justify-content: center;
        height: 72px;
        line-height: 1;
        .@{block}__icon {
            margin-bottom: 8px;
            margin-right: unset;
        }
        .@{block}__text {
            font-size: var(--scroll-refresh-font-size);
        }
        .@{block}__icon,
        .@{block}__text {
            vertical-align: unset;
        }
        .@{block}__loading-circular {
            width: var(--scroll-refresh-icon-size);
            height: var(--scroll-refresh-icon-size);
        }
    }
    &__icon {
        margin-bottom: unset;
        margin-right: 12px;
    }
    &__text {
        color: #969799;
    }

    @keyframes van-circular-rotate {
        0% {
            transform: rotate(0deg);
        }

        50% {
            transform: rotate(180deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }
}
</style>

<template>
    <div
        class="som-scroll-refresh__spinner"
        :class="{'som-scroll-refresh__spinner-vertical': vertical}"
    >
        <span
            class="som-scroll-refresh__spinner__icon"
            :class="{
			'is-loading': !!animation
		}"
        >
            <slot name="icon">
                <svg
                    class="som-scroll-refresh__spinner__loading-circular"
                    viewBox="0 0 1024 1024"
                    width="32"
                    height="32"
                >
                    <path
                        fill="currentColor"
                        d="M512 907c-24.852 0-45-20.148-45-45s20.148-45 45-45c168.446 0 305-136.554 305-305S680.446 207 512 207 207 343.554 207 512c0 24.852-20.148 45-45 45S117 536.852 117 512c0-218.152 176.848-395 395-395S907 293.848 907 512 730.152 907 512 907z"
                    ></path>
                </svg>
            </slot>
        </span>
        <span class="som-scroll-refresh__spinner__text">
            <slot></slot>
        </span>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        animation: {
            type: Boolean,
            default: true,
        },
        vertical: Boolean,
    },
});
</script>