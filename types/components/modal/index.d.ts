// Modal
import { CSSProperties } from 'vue';
import { SomComponent, CommonProps } from '../component';
import { IPopupPropsWrapper } from '../popup';
import { IPluginComponentInstance } from '../toast/plugin';

type excludeType = 'showMask';

export type ModalTypes = 'text' | 'confirm';

export interface IModalProps extends Omit<IPopupPropsWrapper, excludeType> {
    /**
     * 弹出层content
     * @type String
     */
    content?: string;

    /**
     * 弹出层模式
     * @default true
     * @type boolean
     */
    isConfirm?: boolean;

    /**
     * 确认按钮loading
     * @default true
     * @type boolean
     */
    confirmLoading?: boolean;

    /**
     * 确认按钮文案
     * @default '确认'
     * @type string
     */
    confirmText?: string;

    /**
     * 取消按钮文案
     * @default '取消'
     * @type string
     */
    cancelText?: string;

    /**
     * 确认按钮style
     * @type CSSProperties
     */
    confirmStyle?: CSSProperties;

    /**
     * 取消按钮style
     * @type CSSProperties
     */
    cancelStyle?: CSSProperties;

    isMultiple?: boolean;

    /**
     * @description 渲染时的勾子
     * @type () => Promise
     */
    onShow?: () => any;

    /**
     * @description 关闭时的勾子
     * @type () => Promise
     */
    onHide?: () => any;

    /**
     * @description 取消
     * @type () => Promise
     */
    onCancel?: (done: Function) => Promise | any;

    /**
     * @description 确认
     * @type () => Promise
     */
    onConfirm?: (done: Function) => Promise | any;
}

export type IModalInstance = IPluginComponentInstance<IModalProps>;

export interface ModalInterface {
    (options?: IModalProps): IModalInstance;
    text(options?: Omit<IModalProps, 'isConfirm'>): IModalInstance;
    confirm(options?: Omit<IModalProps, 'isConfirm'>): IModalInstance;
    close(): void;
}

declare module '@vue/runtime-core' {
    interface Som {
        modal: ModalInterface;
    }
    interface ComponentCustomProperties {
        $som: Som;
    }
}

export interface Props extends IModalProps, CommonProps {}

export declare class Modal extends SomComponent {
    $props: Props;
}

export default Modal;
