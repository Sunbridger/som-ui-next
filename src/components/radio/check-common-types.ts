import { pickProps } from '@/common/utils/prop';
import { CheckCommonGroupProps } from './check-common-group-types';

export const CheckCommonName = 'SomCheckCommon';

const CheckCommonPropsPicked = pickProps(CheckCommonGroupProps, [
    'disabled',
    'mode',
    'direction',
    'inlineStyle'
]);
export const CheckCommonProps = {
    ...CheckCommonPropsPicked,
    inlineDesc: String,
    value: [Number, String, Boolean],
    checked: Boolean,
    label: String // ! 标签 option选项会通过字段传进label 外部可不关心
};