import { MaskProps } from '../popup/popupType';

const PopupProps = {
    transition: {
        type: String,
        default: 'som-dialog-fade',
    },
    customStyle: Object,
};

export const ModalProp = {
    /** mask部分,popup部分 begin */
    ...MaskProps,
    ...PopupProps,
    /** mask部分,popup部分 end */
    show: {
        type: Boolean,
        default: false,
    },
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    isConfirm: {
        type: Boolean,
        default: true,
    },
    confirmLoading: {
        type: Boolean,
        default: true,
    },
    confirmText: {
        type: String,
        default: '确认',
    },
    cancelText: {
        type: String,
        default: '取消',
    },
    confirmStyle: {
        type: Object,
    },
    cancelStyle: {
        type: Object,
    },
    onConfirm: {
        type: Function,
    },
    onCancel: {
        type: Function,
    },
};

export default ModalProp;
