import { cancelRaf, raf } from './animationFrame';
import { isIOS as checkIsIOS, isWindow } from './index';

type ScrollElement = Element | Window;

export function getScrollTop(el: ScrollElement): number {
    const top = 'scrollTop' in el ? el.scrollTop : el.pageYOffset;

    // iOS scroll bounce cause minus scrollTop
    return Math.max(top, 0);
}

export function setScrollTop(el: ScrollElement, value: number) {
    if ('scrollTop' in el) {
        el.scrollTop = value;
    } else {
        el.scrollTo(el.scrollX, value);
    }
}

export function getRootScrollTop(): number {
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

export function setRootScrollTop(value: number) {
    setScrollTop(window, value);
    setScrollTop(document.body, value);
}

// get distance from element top to page top or scroller top
export function getElementTop(el: ScrollElement, scroller?: HTMLElement) {
    if (isWindow(el)) {
        return 0;
    }

    const scrollTop = scroller ? getScrollTop(scroller) : getRootScrollTop();
    return el.getBoundingClientRect().top + scrollTop;
}

export function getVisibleHeight(el: ScrollElement) {
    if (isWindow(el)) {
        return el.innerHeight;
    }
    return el.getBoundingClientRect().height;
}

export function getVisibleTop(el: ScrollElement) {
    if (isWindow(el)) {
        return 0;
    }
    return el.getBoundingClientRect().top;
}

// hack for iOS12 page scroll
// see: https://developers.weixin.qq.com/community/develop/doc/00044ae90742f8c82fb78fcae56800
export function resetScroll() {
    const isIOS = checkIsIOS();
    if (isIOS) {
        setRootScrollTop(getRootScrollTop());
    }
}

// 动画id
let rafId: number;

// 动画滚动
export function scrollLeftTo(
    scroller: HTMLElement,
    to: number,
    duration: number
) {
    cancelRaf(rafId);

    let count = 0;
    const from = scroller.scrollLeft;
    const frames = duration === 0 ? 1 : Math.round((duration) / 16);

    function animate() {
        scroller.scrollLeft += (to - from) / frames;
        count += 1;
        if (count < frames) {
            rafId = raf(animate);
        } else {
            cancelRaf(rafId);
        }
    }

    animate();
}
// 动画滚动
export function scrollTopTo(
    scroller: HTMLElement,
    to: number,
    duration: number,
    callback: () => void
) {
    let current = getScrollTop(scroller);

    const isDown = current < to;
    const frames = duration === 0 ? 1 : Math.round((duration * 1000) / 16);
    const step = (to - current) / frames;

    function animate() {
        current += step;

        if ((isDown && current > to) || (!isDown && current < to)) {
            current = to;
        }

        setScrollTop(scroller, current);

        if ((isDown && current < to) || (!isDown && current > to)) {
            raf(animate);
        } else if (callback) {
            raf(callback as FrameRequestCallback);
        }
    }

    animate();
}
