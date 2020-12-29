import { pickProps } from '@/common/utils/prop';
import { CheckCommonGroupProps } from '../radio/check-common-group-types';

export const CheckboxGroupName = 'SomCheckboxGroup';
const CheckCommonGroupPropsPicked = pickProps(CheckCommonGroupProps, [
    'disabled',
    'mode',
    'direction',
    'inlineStyle',
    'options',
    'borderIndent'
]);
export const CheckboxGroupProps = {
    ...CheckCommonGroupPropsPicked,
    modelValue: {
        type: Array,
        default: () => []
    },
    min: Number,
    max: Number
};