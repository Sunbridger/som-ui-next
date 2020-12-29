<style lang="less">
.som-scroll-refresh {
    overflow: hidden;
    user-select: none;

    &__track {
        position: relative;
        height: 100%;
        transition-property: transform;
    }

    &__head {
        position: absolute;
        left: 0;
        width: 100%;
        overflow: hidden;
        color: #969799;
        font-size: 14px;
        text-align: center;
        transform: translateY(-100%);
    }

    &__loading,
    &__finished-text,
    &__error-text {
        color: #969799;
        font-size: 14px;
        // height: 40px;
        // line-height: 40px;
        text-align: center;
    }

    &__finished-text {
        line-height: 40px;
    }

    &__placeholder {
        height: 0;
        pointer-events: none;
    }

    &__loading.bottom-loading {
        padding: 16px 0;
    }

    &__back-top-wrapper {
        position: fixed;
        right: 16px;
        bottom: 32px;
        width: 48px;
        height: 48px;
        background: url('//img.souche.com/f2e/08d7238734260f7ea683222fea2f795f.png');
        background-size: contain;
    }

    &__back-top-wrapper:active {
        background: url('//img.souche.com/f2e/21afaf640d55e2e5cbda9eaeee53ed8f.png');
        background-size: contain;
    }
}
</style>
<template>
    <div
        class="som-scroll-refresh"
        ref="root"
    >
        <!-- 下拉刷新部分 -->
        <div
            class="som-scroll-refresh__track"
            :style="trackStyle"
            @touchstart="onTouchStart"
            @touchmove="onTouchMove"
            @touchend="onTouchEnd"
            @touchcancel="onTouchEnd"
        >
            <div
                class="som-scroll-refresh__head"
                :style="pullDownStyle"
            >
                <!-- 下拉刷新过程的插槽 -->
                <slot
                    v-if="pullDownState.status === 'pulling'"
                    name="pullDownPulling"
                    :distance="pullDownState.distance"
                    :status="pullDownState.status"
                >
                    <div class="som-scroll-refresh__text">{{statusText}}</div>
                </slot>
                <!-- 释放刷新过程的插槽 -->
                <slot
                    v-if="pullDownState.status === 'loosing'"
                    name="pullDownLoosing"
                    :distance="pullDownState.distance"
                    :status="pullDownState.status"
                >
                    <div class="som-scroll-refresh__text">{{statusText}}</div>
                </slot>
                <!-- lodign过程的插槽 -->
                <slot
                    v-if="pullDownState.status === 'loading'"
                    name="pullDownLoading"
                    :distance="pullDownState.distance"
                    :status="pullDownState.status"
                >
                    <Loading
                        vertical
                        animation
                    >
                        <slot name="spinner"></slot>
                        {{statusText}}
                    </Loading>
                </slot>
            </div>
            <!-- 默认的内容 -->
            <slot></slot>
            <!-- 上啦拉加载 -->
            <div
                v-if="pullUpState.loading"
                class="som-scroll-refresh__loading bottom-loading"
            >
                <!-- 插槽完全自定义 -->
                <slot name="pullUp">
                    <Loading>
                        <slot name="spinner"></slot>
                        {{loadingPullUpText}}
                    </Loading>
                </slot>
            </div>
            <div
                v-else-if="pullUpState.finished"
                class="som-scroll-refresh__finished-text"
            >
                <slot name="no-more">
                    {{noMoreText}}
                </slot>
            </div>
            <div
                ref="placeholder"
                class="som-scroll-refresh__placeholder"
            />
        </div>
        <div
            v-if="pullUpState.isBackTopVisible"
            class="som-scroll-refresh__back-top-wrapper"
            :onClick="goBackTop"
        ></div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, PropType, computed } from 'vue';
// Composition
import { useScrollParent } from '@/common/composition/useScrollParent';
import { PullDownType, PullUpTyp } from 'types/components/scroll-refresh';
import Loading from './loading.vue';
import { pullUpComposition } from './pull-up';
import { pullDownMinix } from './pull-down';

export default defineComponent({
    name: 'som-scroll-refresh',
    components: {
        Loading,
    },
    props: {
        offsetH: {
            type: Number,
            default: 72,
        },
        maxPullDown: {
            type: Number,
            default: 120,
        },
        bottomDistance: {
            type: Number,
            default: 100,
        },
        pullDown: Function as PropType<PullDownType>,
        pullUp: Function as PropType<PullUpTyp>,
        showBackTop: {
            type: Boolean,
            default: true,
        },
        preventDefault: Boolean,
        disabled: Boolean,
        successTime: {
            type: Number,
            default: 0,
        },
        successPullDownText: {
            type: String,
            default: '',
        },
        pullingPullDownText: {
            type: String,
            default: '下拉刷新',
        },
        loosingPullDownText: {
            type: String,
            default: '松开刷新',
        },
        loadingPullDownText: {
            type: String,
            default: '正在刷新',
        },
        loadingPullUpText: {
            type: String,
            default: '正在加载',
        },
        noMoreText: {
            type: String,
            default: '没有更多了～',
        },
    },
    setup(props) {
        // data数据
        const root = ref<HTMLElement>();
        const placeholder = ref<HTMLElement>();
        const scrollParent = useScrollParent(root);

        // composition封装逻辑
        // 下拉刷新的相关逻辑，拿到touch相关方法，动画，style，状态
        const { onTouchStart, onTouchMove, onTouchEnd, statusText, state: pullDownState } = pullDownMinix(props, scrollParent);
        // 上拉加载的相关逻辑，拿到状态,返回顶部的方法
        const { state: pullUpState, goBackTop } = pullUpComposition(props, scrollParent, root, placeholder);

        // computed计算属性
        // 下拉加载的style
        const pullDownStyle = computed(() => ({
            height: `${props.offsetH}px`,
            lineHeight: `${props.offsetH}px`,
        }));

        // 下拉刷新时的过程动画
        const trackStyle = computed(() => ({
            transitionDuration: `${pullDownState.duration}ms`,
            transform: pullDownState.distance ? `translate3d(0,${pullDownState.distance}px, 0)` : '',
        }));

        return {
            root,
            placeholder,
            statusText,
            trackStyle,
            pullDownStyle,
            onTouchStart,
            onTouchMove,
            onTouchEnd,
            pullDownState,
            pullUpState,
            goBackTop,
        };
    },
});
</script>