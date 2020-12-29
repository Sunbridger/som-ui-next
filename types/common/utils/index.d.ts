import { Component, ComponentPublicInstance, VNode } from 'vue';

export interface IMountComponentReturn {
    instance: ComponentPublicInstance;
    unmount(): void;
}
export interface IRenderComponentReturn {
    instance: VNode;
    unmount(): void;
}

export declare type mountComponent = (RootComponent: Component, className?: string) => IMountComponentReturn;

export declare type renderComponent = (RootComponent: Component, options: Record<string, any>, className?: string) => IRenderComponentReturn;
