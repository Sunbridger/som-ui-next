import { reactive, nextTick, computed, Ref, onMounted } from 'vue';
// Composition
import { useTouch } from '@/common/composition/useTouch';

// Utils
import { preventDefault } from '@/common/utils/events';
import { getScrollTop } from '@/common/utils/scroll';
import { IScrollRefreshProps, PullRefreshStatus } from 'types/components/scroll-refresh';

let reachTop: boolean;
// 下拉刷新

export const pullDownMinix = (props: Readonly<IScrollRefreshProps>, scrollParent: Ref<Window | Element | undefined>) => {
    const state = reactive({
        status: 'normal' as PullRefreshStatus,
        distance: 0,
        duration: 0,
    });

    // 获取touch的一些参数
    const touch = useTouch();

    const pullDownStyle = computed(() => ({
        height: `${props.offsetH}px`,
        lineHeight: `${props.offsetH}px`,
    }));

    const trackStyle = computed(() => ({
        transitionDuration: `${state.duration}ms`,
        transform: state.distance ? `translate3d(0,${state.distance}px, 0)` : '',
    }));

    // 正在被触摸
    const isTouchable = () => state.status !== 'loading' && state.status !== 'success' && !props.disabled;

    // 弹性下拉逻辑
    const ease = (distance: number) => {
        const headHeight = +(props.offsetH || 0);
        const maxPullDown = +(props.maxPullDown || 0);

        if (distance > maxPullDown) {
            distance = maxPullDown;
        }
        if (distance > headHeight) {
            if (distance < headHeight * 2) {
                distance = headHeight + (distance - headHeight) / 2;
            } else {
                distance = headHeight * 1.5 + (distance - headHeight * 2) / 4;
            }
        }

        return Math.round(distance);
    };

    // 设置pulldown的状态
    const setStatus = (distance: number, isLoading?: boolean) => {
        state.distance = distance;
        const offsetH = +(props.offsetH || 0);

        if (isLoading) {
            state.status = 'loading';
        } else if (distance === 0) {
            state.status = 'normal';
        } else if (distance < offsetH) {
            state.status = 'pulling';
        } else {
            state.status = 'loosing';
        }
    };

    // 获取状态
    const statusText = computed(() => {
        if (state.status === 'normal') {
            return '';
        }
        return props[`${state.status}PullDownText`] || '';
    });

    // 下拉刷新成功的方法
    const scrollSuccess = () => {
        state.status = 'success';
        setTimeout(() => {
            setStatus(0);
        }, props.successTime);
    };

    // pull-down 的参数
    const pullDownParmas = {
        refreshed: scrollSuccess,
    };

    // 判断是否到顶
    const checkPosition = (event: TouchEvent) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        reachTop = getScrollTop(scrollParent.value!) === 0;

        if (reachTop) {
            state.duration = 0;
            touch.start(event);
        }
    };

    // 设置起始状态
    const onTouchStart = (event: TouchEvent) => {
        isTouchable() && checkPosition(event);
    };

    // 设置起始状态
    const onTouchMove = (event: TouchEvent) => {
        if (isTouchable()) {
            !reachTop && checkPosition(event);

            const { deltaY } = touch;
            touch.move(event);

            if (reachTop && deltaY.value >= 0 && touch.isVertical()) {
                // 阻止默认的滚动，使用ease动画修改滚动值
                preventDefault(event);
                setStatus(ease(deltaY.value));
            }
        }
    };

    // 结束状态
    const onTouchEnd = () => {
        if (reachTop && touch.deltaY.value && isTouchable()) {
            state.duration = 300;

            if (state.status === 'loosing') {
                setStatus(props.offsetH || 0, true);
                nextTick(() => {
                    props.pullDown && props.pullDown(pullDownParmas);
                });
            } else {
                setStatus(0);
            }
        }
    };

    onMounted(() => {
        // 默认触发一次下拉刷新
        !props.preventDefault && props.pullDown && props.pullDown?.(pullDownParmas);
    });

    return {
        state,
        trackStyle,
        pullDownStyle,
        statusText,
        onTouchStart,
        onTouchMove,
        onTouchEnd,
    };
};
