import { PropType, VNodeChild } from 'vue';
import { ToastPostionTypes, ToastTypes } from 'types/components/toast';
import { MaskProps } from '../popup/popupType';

export const ToastProp = {
    ...MaskProps,
    transition: {
        type: String,
        default: 'som-fade'
    },
    show: {
        type: Boolean,
        default: false
    },
    type: {
        type: String as PropType<ToastTypes>,
        default: 'text'
    },
    text: {
        type: [String, Function] as PropType<VNodeChild | JSX.Element>,
        default: ''
    },
    icon: {
        type: [String, Object, Function] as PropType<VNodeChild | JSX.Element | Record<string, any>>,
        default: ''
    },
    position: {
        type: String as PropType<ToastPostionTypes>,
        default: 'default'
    },
    time: {
        type: Number,
        default: 2000
    },
    className: {
        type: String
    },
    isMultiple: Boolean
};

export default ToastProp;
