import { ItemOrArray } from '@/common/types';
import { pickProps } from '@/common/utils/prop';
import { ErrorList, FieldErrorList } from 'async-validator';
import { FormProps, FormValidateTrigger } from '../form/form-types';
import { ListItemProps } from '../list/list-item-types';

export const FormItemName = 'SomFormItem';

export type ValidateResult = '' | 'success' | 'error';
export interface IErrorInfo {
    errors: ErrorList;
    fields: FieldErrorList;
}

export const getEmptyErrInfo = (): IErrorInfo => ({
    errors: [],
    fields: {},
});

declare module 'async-validator' {
    interface RuleItem {
        // ! 目前数组没有意义
        // 规则允许的触发器
        trigger?: ItemOrArray<FormValidateTrigger>;
    }
}

export interface FormItemMethods {
    validate: (cb: Function, trigger: ItemOrArray<FormValidateTrigger>) => Promise<any>;
    onFieldChange: () => void;
    onFieldBlur: () => void;
    resetFiled: () => void;
}

const ListItemPropsPicked = pickProps(ListItemProps, [
    'label',
    'labelWidth',
    'labelMarginRight',
    'labelAlign',
    'labelLeftIcon',
    'labelRightIcon',
    'rightIcon',
    'inlineDesc',
    'align',
    'itemClass',
    'labelAlignVertical',
    'isLink'
] as any);
const FormPropsPicked = pickProps(FormProps, [
    'ifError',
    ['validateTrigger', { default: '' }],
    'errorClass',
    [
        'hideRequiredAsterisk',
        {
            type: [Boolean, String],
            default: 'none',
        },
    ],
]);
export const FormItemProps = {
    ...ListItemPropsPicked,
    ...FormPropsPicked,
    prop: {
        // 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的
        type: String,
        default: '',
    },
    required: {
        type: Boolean,
        default: false,
    },
    rules: [Object, Array],
    error: Boolean,
    errorMessage: String,
};
