import { pickProps } from '@/common/utils/prop';
import { CheckCommonProps } from '../radio/check-common-types';

export const CheckboxName = 'SomCheckbox';

const CheckCommonPropsPicked = pickProps(CheckCommonProps, [
    'disabled',
    'mode',
    'direction',
    'inlineStyle',
    'inlineDesc',
    'value',
    'label'
]);
export const CheckboxProps = {
    ...CheckCommonPropsPicked,
    modelValue: {
        type: [Number, String, Boolean],
        default: false
    },
    trueValue: {
        type: [Number, String, Boolean],
        default: true
    },
    falseValue: {
        type: [Number, String, Boolean],
        default: false
    }
};