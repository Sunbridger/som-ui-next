import { createApp, createVNode, render, Component, unref, Ref } from 'vue';
import { IMountComponentReturn, IRenderComponentReturn } from 'types/common/utils';

/**
 * 弃用
 * @description 挂载组件，可以使用tel去重写
 * @param RootComponent 组件实例
 */
export function mountComponent(RootComponent: Component, className?: string): IMountComponentReturn {
    // 创建组件应用
    const app = createApp(RootComponent);
    const root = document.createElement('div');
    className && (root.className = className);
    document.body.appendChild(root);

    // 应用挂载
    const instance = app.mount(root);

    return {
        instance,
        unmount() {
            app.unmount(root);
            document.body.removeChild(root);
        },
    };
}

/**
 * @description 挂载组件
 * @param RootComponent 组件实例
 */
export function renderComponent(RootComponent: Component, options?: Record<string, any>, className?: string): IRenderComponentReturn {
    // 创建组件VNode
    const app = createVNode(RootComponent);
    const root = document.createElement('div');
    className && (root.className = className);
    // VNode渲染
    render(app, root);

    document.body.appendChild(root);

    return {
        instance: app,
        unmount() {
            render(null, root);
            document.body.removeChild(root);
        },
    };
}

export function isHidden(elementRef: HTMLElement | Ref<HTMLElement | undefined>) {
    const el = unref(elementRef);
    if (!el) {
        return false;
    }

    const style = window.getComputedStyle(el);
    const hidden = style.display === 'none';

    // offsetParent returns null in the following situations:
    // 1. The element or its parent element has the display property set to none.
    // 2. The element has the position property set to fixed
    const parentHidden = el.offsetParent === null && style.position !== 'fixed';

    return hidden || parentHidden;
}

export default {
    mountComponent,
    isHidden,
};
