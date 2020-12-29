// ActionSheet
import { SomComponent, CommonProps } from '../component';

export interface IMenuItem {
    value: string;
    warning?: boolean;
}

export type MenuItemType = IMenuItem | string;

export interface IActionSheetProps {
    /**
     * 是否显示
     * @default false
     * @type boolean
     */
    show?: boolean;

    /**
     * 顶部标题
     * @type string
     */
    title?: string;

    /**
     * 是否显示底部取消按钮
     * @default true
     * @type boolean
     */
    showCancel?: boolean;

    /**
     * 底部取消按钮文案
     * @default 取消
     * @type string
     */
    cancelText?: string;

    /**
     * 菜单列表展示
     * @type array
     */
    menus?: MenuItemType[];

    /**
     * 点击遮罩时是否关闭菜单，适用于一些进入页面时需要强制选择的场景。
     * @default true
     * @type boolean
     */
    closeOnClickingMask?: boolean;

    /**
     * 点击菜单时是否自动隐藏
     * @default true
     * @type boolean
     */
    closeOnClickingMenu?: boolean;
}

export interface Props extends IActionSheetProps, CommonProps { }

export declare class ActionSheet extends SomComponent {
    $props: Props;
}

export default ActionSheet;
