import { PropType } from 'vue';

export const ListName = 'SomList';

export type ListAlign = 'left' | 'center' | 'right';
export type ListLabelAlignVertical = 'start' | 'center' | 'end';
export type ListBorderIndent = 'left' | 'both' | 'none';
export type ListLabelLeftIconAlign = 'start' | 'center' | 'end';

export const ListProps = {
    labelWidth: String, // 表单域标签的的宽度，例如 '50px'。支持 auto。
    labelAlign: String as PropType<ListAlign>,
    labelAlignVertical: String as PropType<ListLabelAlignVertical>, // label垂直定位
    labelLeftIconAlign: String as PropType<ListLabelLeftIconAlign>, // leftIcon垂直定位
    labelMarginRight: String, // 默认值跟着主题走
    align: String as PropType<ListAlign>, // 内容水平排版
    isEllipsis: {
        // 内容超出省略
        type: [String, Boolean],
        default: 'none' // ! 替代boolean默认值为false 不可删
    },
    borderIndent: {
        // 分割线样式
        type: String as PropType<ListBorderIndent>,
        default: 'left'
    },
    itemClass: String // item元素添加class类名
};