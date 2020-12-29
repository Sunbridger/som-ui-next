// Overlay
import { SomComponent, CommonProps } from '../component';
export interface IOverlayProps {
    /**
     * 是否显示
     * @default false
     * @type boolean
     */
    show?: boolean;

    /**
     * 遮罩的蒙层
     * @type string | number
     */
    maskZIndex?: string | number;

    /**
     * 是否锁定背景滚动
     * @default true
     * @type boolean
     */
    lockScroll?: boolean;

    /**
     * 是否为透明背景
     * @default false
     * @type boolean
     */
    isTransparent?: boolean;

    /**
     * 蒙层动画
     * @type string
     * @default 'som-mask'
     */

    maskTransition?: string;
}

export interface IOverlayPropsWrapper extends Omit<IOverlayProps, 'show'> {
    /**
     * 是否显示
     * @default false
     * @type boolean
     */
    showMask?: boolean;
}

export interface Props extends IOverlayProps, CommonProps {}

export declare class Overlay extends SomComponent {
    $props: Props;
}

export default Overlay;
