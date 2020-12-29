// Button
import { SomComponent, CommonProps } from '../component';
import { SomButtonGroup } from './button-group';

export type ButtonType =
    | 'primary' | 'success' | 'warning' | 'link' | 'assist';

export type ButtonSize =
    | 'normal' | 'medium' | 'small';

export type ButtonMode =
    | 'normal' | 'plain' | 'border' | 'link';

export type ButtonActionType =
    | 'submit' | 'button' | 'reset';

export type ButtonBorderType =
    | 'half' | 'large' | 'medium' | 'small' | 'mini';

export interface IButtonProps {
    /**
     * 按钮的颜色类型
     * @default 'primary'
     * @type string
     */
    type?: ButtonType

    /**
     * 按钮的尺寸
     * @default 'normal'
     * @type string
     */
    size?: ButtonSize;

    /**
     * 按钮的圆角寸
     * @default 'half'
     * @type string
     */
    border?: ButtonBorderType | string;

    /**
     * 按钮的样式风格
     * @default 'normal'
     * @type string
     */
    mode?: ButtonMode

    /**
     * 按钮的宽度
     * @default false
     * @type boolean
     */
    inline?: boolean;

    /**
     * 按钮的disabled 状态
     * @default false
     * @type boolean
     */
    disabled?: boolean;

    /**
     * 按钮的内置图标
     * @type string
     */
    icon?: string;

    /**
     * 按钮的loading 状态
     * @default false
     * @type boolean
     */
    loading?: boolean;

    /**
     * 按钮的延迟禁点
     * @type number
     */
    delayTime?: number;

    /**
     * 按钮的 type 属性
     * @type string
     */
    actionType?: ButtonActionType;
}

export interface Props extends IButtonProps, CommonProps {}

export declare class SomButton extends SomComponent {
    $props: Props;
    static ButtonGroup: typeof SomButtonGroup;
}

export default SomButton;
