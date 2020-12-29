import { PropType } from 'vue';
import { pickProps } from '@/common/utils/prop';
import { ListProps } from './list-types';

export const ListItemName = 'SomListItem';

export type ListItemArrowDirection = 'right' | 'down' | 'left' | 'up';

const ListPropsPicked = pickProps(ListProps, [
    'labelWidth',
    'labelAlign',
    'labelAlignVertical',
    'labelLeftIconAlign',
    'labelMarginRight', // 默认值跟着主题走
    'align',
    'isEllipsis',
    'itemClass'
]);
export const ListItemProps = {
    ...ListPropsPicked,
    label: String, // 标签文本
    labelLeftIcon: String,
    labelRightIcon: String,
    rightIcon: String,
    inlineDesc: String, // 副标题
    isLink: Boolean,
    arrowDirection: {
        type: String as PropType<ListItemArrowDirection>,
        default: 'right'
    },
    content: String
};