// List
import { SomComponent, CommonProps } from '../component';
import { SomListItem } from './list-item';

export type ListLabelAlign =
    | 'center' | 'inherit' | 'left' | 'right';

export interface IListProps {
    /**
     * 为子元素设定统一 label 宽度
     * @type string
     */
    labelWidth?: string;

    /**
     * 为子元素设定统一对齐方式
     * @type ListLabelAlign
     */
    labelAlign?: ListLabelAlign;

    /**
     * 为子元素设定统一的右边 margin
     * @type string
     */
    labelMarginRight?: string;

    /**
     * 列表容器样式
     * @type object
     */
    listStyle?: object;
}

export interface Props extends IListProps, CommonProps {}

export declare class SomList extends SomComponent {
    $props: Props;
    static ListItem: typeof SomListItem;
}

export default SomList;
