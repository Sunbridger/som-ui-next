import { inBrowser } from '.';

const root = inBrowser ? window : {} as any;

let prev = Date.now();

function rafPolyfill(fn) {
    const curr = Date.now();
    const ms = Math.max(0, 16 - (curr - prev));
    const id = setTimeout(fn, ms);
    prev = curr + ms;
    return id;
}

// requestAnimationFrame 兼容处理
export function raf(fn) {
    const requestAnimationFrame = root.requestAnimationFrame || rafPolyfill;
    return requestAnimationFrame.call(root, fn);
}

// cancelAnimationFrame 兼容处理
export function cancelRaf(id) {
    const cancelAnimationFrame = root.cancelAnimationFrame || root.clearTimeout;
    cancelAnimationFrame.call(root, id);
}
