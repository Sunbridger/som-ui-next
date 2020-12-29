// Toast
import { VNodeChild } from 'vue';
import { SomComponent } from '../component';
import { IPluginComponentInstance } from './plugin';

export type ToastTypes = 'success' | 'loading' | 'warn' | 'text' | 'error' | 'default';
export type ToastPostionTypes = 'default' | 'top' | 'middle' | 'bottom' | string;
export type ToastMessage = string;

export interface IToastOptions {

    /**
     * @description toast类型
     * @default 'text'
     * @type 'success' | 'loading' | 'warn' | 'text' | 'error'
     */
    type?: ToastTypes;

    /**
     * @description toast 自定义类名
     * @type string
     */
    className?: string;

    /**
     * @description toast位置
     * @default 'default'
     * @type 'default' | 'top' | 'middle' | 'bottom' | string
     */
    position?: ToastPostionTypes;

    /**
     * @description toast 提示内容，支持 html，和默认 slot 同样功能
     * @type string| VNode | function(h)
     */
    // text?: string;
    text?: VNodeChild | JSX.Element;

    /**
     * @description toast icon
     * @type string | VNode | function(h)
     */
    icon?: VNodeChild | JSX.Element;
    // icon?: string;

    /**
     * @description toast 显示时间
     * @type number
     * @default 2000
     */
    time?: number;

    /**
     * @description toast 动画
     * @type sting
     * @default 'som-fade'
     */
    transition?: string;

    /**
     * @description toast 蒙层
     * @type boolean
     * @default true
     */
    showMask?: boolean;

    /**
     * @description toast 蒙层是否为透明背景
     * @type boolean
     * @default true
     */
    isTransparent?: boolean;

    /**
     * @description toast 蒙层层级
     * @type number
     * @default 1001
     */
    maskZIndex?: number;

    /**
     * @description toast 多例
     * @type number
     * @default 1001
     */
    isMultiple?: boolean;

    /**
     * @description toast 渲染时的勾子
     * @type () => Promise
     */
    onShow?: () => any;

    /**
     * @description toast 关闭时的勾子
     * @type () => Promise
     */
    onHide?: () => any;
}

export type IToastInstance = IPluginComponentInstance<IToastOptions>;

export interface Toast {
    (options?: IToastOptions | ToastMessage): IToastInstance;
    text(options?: IToastOptions | ToastMessage): IToastInstance;
    loading(options?: IToastOptions | ToastMessage): IToastInstance;
    success(options?: IToastOptions | ToastMessage): IToastInstance;
    error(options?: IToastOptions | ToastMessage): IToastInstance;
    warn(options?: IToastOptions | ToastMessage): IToastInstance;
    hide(): void;
}

declare module '@vue/runtime-core' {
    interface Som {
        toast: Toast;
    }
    interface ComponentCustomProperties {
        $som: Som;
    }
}


export declare class Toast extends SomComponent {
    $props: Props;
}

export default Toast;
