import { ItemOrArray } from '@/common/types';
import { pickProps } from '@/common/utils/prop';
import { isBoolean } from '@souche-vue3/souche-util-vue';
import { PropType } from 'vue';
import { ListProps } from '../list/list-types';

export const FormName = 'SomForm';

export type FormValidateTrigger = 'submit' | 'blur' | 'change' | '';
// todo 组件ts定义
// 组件实例方法
export interface FormMethods {
    submit: () => void;
    validate: (cb?: Function, trigger?: ItemOrArray<FormValidateTrigger>) => Promise<any[]>;
    validateField: (ps: string[], cb, trigger: ItemOrArray<FormValidateTrigger>) => Promise<any[]>;
    resetFields: () => void;
}

const ListPropsPicked = pickProps(ListProps, [
    ['labelWidth', { default: '98px' }],
    'labelAlign',
    'labelMarginRight',
    // 'align', // Form默认left
    ['align', { default: 'left' }],
    'borderIndent',
    'itemClass',
    'labelAlignVertical'
]);
export const FormProps = {
    ...ListPropsPicked,
    model: Object,
    rules: Object,
    validateFirst: {
        // 有一个错误则停止校验
        type: Boolean,
        default: false
    },
    scrollToError: {
        // 是否滚动到报错区域
        type: Boolean,
        default: false
    },
    hideRequiredAsterisk: {
        // 是否显示必填字段的标签旁边的红色星号
        type: Boolean,
        default: false
    },
    validateOnRuleChange: {
        // 是否在 rules 属性改变后立即触发一次验证
        type: Boolean,
        default: true
    },
    validateTrigger: {
        // 触发时机
        type: String as PropType<FormValidateTrigger>,
        default: 'submit'
    },
    disabled: {
        type: Boolean,
        default: false
    },
    // 是否展示错误提示
    ifError: {
        type: [String, Boolean],
        default: 'none',
        validator(v) {
            return v === 'none' || isBoolean(v);
        }
    },
    errorClass: String // 如果校验错误，会添加该类到formItem上
};