import { pickProps } from '@/common/utils/prop';
import { CheckCommonGroupProps } from '../radio/check-common-group-types';

export const RadioGroupName = 'SomRadioGroup';

const CheckCommonGroupPropsPicked = pickProps(CheckCommonGroupProps, [
    'disabled',
    'mode',
    'direction',
    'inlineStyle',
    'options',
    'borderIndent'
]);
export const RadioGroupProps = {
    ...CheckCommonGroupPropsPicked,
    modelValue: [Number, String, Boolean]
};