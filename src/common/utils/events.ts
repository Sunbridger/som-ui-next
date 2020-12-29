export function stopPropagation(event: Event) {
    event.stopPropagation();
}

export function preventDefault(event: Event, isStopPropagation?: boolean) {
    /* istanbul ignore else */
    if (typeof event.cancelable !== 'boolean' || event.cancelable) {
        event.preventDefault();
    }

    if (isStopPropagation) {
        stopPropagation(event);
    }
}

export function trigger(target: Element, type: string) {
    const inputEvent = document.createEvent('HTMLEvents');
    inputEvent.initEvent(type, true, true);
    target.dispatchEvent(inputEvent);
}

/**
 * 阻止背景滚动
 *
 * @param  Boolean  flag    [是否阻止背景滚动]
 */
export const preventBack = (flag?: boolean) => {
    if (typeof window === 'undefined') return;
    if (flag) {
        const top = document.documentElement.scrollTop || document.body.scrollTop;
        document.body.style.cssText += `
            position: fixed;
            width: 100vw;
            left: 0;
            top: ${-top}px;
        `;
    } else {
        const top = document.body.style.top;
        document.body.style.cssText += `
            position: static;
        `;
        window.scrollTo(0, Math.abs(parseFloat(top)));
    }
};

// 阻止滚动
export const preventBodyScroll = () => {
    function pd(e) {
        e.preventDefault();
    }
    return {
        addPrevent() {
            document.body.addEventListener('touchmove', pd, { passive: false });
        },
        rmPrevent() {
            document.body.removeEventListener('touchmove', pd);
        }
    };
};
