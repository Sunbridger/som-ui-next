// Popup
import { CSSProperties } from 'vue';
import { SomComponent, CommonProps } from '../component';
import { IOverlayPropsWrapper } from '../overlay';

export type PopupPositionTypes = 'left' | 'right' | 'top' | 'bottom' | 'center';

// 用于弹窗类声明接口的继承
export interface IPopupPropsWrapper extends IOverlayPropsWrapper {
    /**
     * 是否显示
     * @default false
     * @type boolean
     */
    show?: boolean;

    /**
     * 弹窗样式
     * @type object
     */
    customStyle?: CSSProperties;

    /**
     * 弹窗动画
     * @type string
     * @default 'som-popup-animate'
     */
    transition?: string;

    /**
     * 遮罩的类名
     * @type string
     */
    maskClass?: string;

    /**
     * 点击遮罩时是否自动关闭
     * @default true
     * @type boolean
     */
    hideOnBlur?: boolean;

    [key: string]: any;
}

export interface IPopupProps extends IPopupPropsWrapper {
    /**
     * 标题
     * @type string
     */
    title?: string;
    /**
     * 弹出层模式
     * @default 'default'
     * @type string
     */
    mode?: PopupModeTypes;

    /**
     * 是否显示关闭按钮
     * @default false
     * @type boolean
     */
    closeable?: boolean;

    /**
     * 关闭按钮
     * @default 'close'
     * @type string
     */
    closeIcon?: string;

    /**
     * 设置 100% 宽度必须使用该属性。在 position 为 left 或者 right 时有效。
     * @default 'auto'
     * @type string
     */
    width?: string;

    /**
     * 高度，设置 100% 为整屏高度。当 position 为 top 或者 bottom 时有效。
     * @default 'auto'
     * @type string
     */
    height?: string;

    /**
     * 最大高度
     * @type string
     */
    maxHeight?: string;

    /**
     * 位置
     * @type string
     */
    position?: PopupPositionTypes;

    /**
     * 弹窗圆角
     * @type string
     */
    borderRadius?: string;
}

export interface Props extends IPopupProps, CommonProps { }

export declare class Popup extends SomComponent {
    $props: Props;
}

export default Popup;
