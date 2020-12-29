import { pickProps } from '@/common/utils/prop';
import { CheckCommonProps } from './check-common-types';

export const RadioName = 'SomRadio';

const CheckCommonPropsPicked = pickProps(CheckCommonProps, [
    'disabled',
    'mode',
    'direction',
    'inlineStyle',
    'inlineDesc',
    'value',
    'label'
]);
export const RadioProps = {
    ...CheckCommonPropsPicked,
    modelValue: [Number, String, Boolean]
};