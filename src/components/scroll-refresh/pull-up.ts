import { nextTick, Ref, unref, reactive } from 'vue';

// Composition
import { isHidden } from '@/common/utils/dom';
import { useEventListener } from '@/common/composition/useEventListener';
import { useRect } from '@/common/composition/useRect';
import { useExpose } from '@/common/composition/useExpose';
import { getScrollTop, setScrollTop } from '@/common/utils/scroll';
import { IScrollRefreshProps } from 'types/components/scroll-refresh';

export const pullUpComposition = (props: Readonly<IScrollRefreshProps>, scrollParent: Ref<Window | Element | undefined>, root: Ref<HTMLElement | undefined>, placeholder: Ref<HTMLElement | undefined>) => {
    const pullDownState = reactive({
        isBackTopVisible: false,
        loading: false,
        finished: false,
    });

    const pullUpParams = {
        loaded: () => {
            pullDownState.loading = false;
        },
        completed: () => {
            pullDownState.finished = true;
        },
    };

    // 返回顶部
    const goBackTop = () => {
        const parentDom = unref(scrollParent);
        parentDom && setScrollTop(parentDom, 0);
    };

    // 取当前状态
    const check = () => {
        nextTick(() => {
            const parentDom = unref(scrollParent);
            const scrollTop = (parentDom && getScrollTop(parentDom)) || 0;

            if (props.showBackTop) {
                // 超过两屏
                pullDownState.isBackTopVisible = (scrollTop || 0) > window.innerHeight * 2;
            }
            // 已经loading或者finished，不在触发判断逻辑
            if (pullDownState.loading || pullDownState.finished) {
                return;
            }

            // 如果被隐藏则不触发判断逻辑
            const scrollParentRect = useRect(scrollParent);
            if (!scrollParentRect.height || isHidden(root)) {
                return false;
            }

            const placeholderRect = useRect(placeholder);
            const isReachEdge = placeholderRect.bottom - scrollParentRect.bottom <= (props.bottomDistance || 0);

            if (isReachEdge) {
                pullDownState.loading = true;
                //     emit('update:loading', true);
                //     emit('load');
                props.pullUp && props.pullUp(pullUpParams);
            }
        });
    };

    // 重置没有更多
    const resetLoadMore = () => {
        pullDownState.loading = false;
        pullDownState.finished = false;
    };

    // 把方法绑定到实例上去，可以使用ref.resetLoadMore 去调用
    useExpose({ check, resetLoadMore });

    // 监听滚动
    useEventListener('scroll', check, { target: scrollParent });

    return {
        state: pullDownState,
        goBackTop,
        resetLoadMore,
    };
};
