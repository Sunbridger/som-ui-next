import { PropType } from 'vue';
import { ListBorderIndent } from '../list/list-types';

export const CheckCommonGroupName = 'SomCheckCommonGroup';

export type CheckCommonMode = 'button' | 'icon'
export type CheckCommonDirection = 'horizontal' | 'vertical'
export type CheckCommonInlineStyle = 'style1' | 'style2' | 'style3'
export const CheckCommonGroupProps = {
    disabled: Boolean,
    mode: {
        // 单选模式, 分为 button 按钮模式和勾选模式
        type: String as PropType<CheckCommonMode>,
        default: 'button'
    },
    direction: {
        // mode=button
        type: String as PropType<CheckCommonDirection>,
        default: 'horizontal'
    },
    inlineStyle: {
        // mode=icon 内置布局样式
        type: String as PropType<CheckCommonInlineStyle>,
        default: 'style1'
    },
    options: {
        // string[] | { icon, key, value, inlineDesc }[]
        type: Array,
        default: () => []
    },
    borderIndent: {
        type: String as PropType<ListBorderIndent>,
        default: 'left'
    }
};