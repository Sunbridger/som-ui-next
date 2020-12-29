import { ComponentInternalInstance, ComponentPublicInstance } from 'vue';

export type ItemOrArray<T> = T | T[];

export interface ComponentInternalInstanceExt<T> extends ComponentInternalInstance {
    proxy: ComponentPublicInstance & T & {
        [key: string]: any;
    };
}
