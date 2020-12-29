// List-item
import { SomComponent, CommonProps } from '../component';

export type ListArrowDirection =
    | 'up' | 'down' | 'left' | 'right';

export type ListAlignItems =
    | 'center' | 'flex-start' | 'flex-end' | 'baseline' | 'stretch';

export type ListBorderIntent = 'left' | 'right' | 'both' | 'none';

export interface IListItemProps {
    /**
     * 列表左边标题文案
     * @type string
     */
    title?: string;

    /**
     * 列表左侧标题下面的说明文字
     * @type string
     */
    inlineDesc?: string;

    /**
     * 列表右侧补充文案
     * @type string
     */
    value?: string;

    /**
     * 列表右侧补充文案是否换行
     * @type boolean
     * @default false
     */
    isLineBreak?: boolean;

    /**
     * 是否为链接
     * @type boolean
     * @default true
     */
    isLink?: boolean;

    /**
     * 右侧箭头方向
     * @type ListArrowDirection
     * @default 'right'
     */
    arrowDirection?: ListArrowDirection;

    /**
     * 点击链接
     * @type object | string
     */
    link?: object | string;

    /**
     * 是否显示边框与左边的间隙
     * @type boolean
     * @default true
     */
    borderIntent?: ListBorderIntent;

    /**
     * alient-items对齐方式
     * @type ListAlignItems
     * @default 'center'
     */
    alientItems?: ListAlignItems;
}

export interface Props extends IListItemProps, CommonProps { }

export declare class SomListItem extends SomComponent {
    $props: Props;
}

export default SomListItem;
