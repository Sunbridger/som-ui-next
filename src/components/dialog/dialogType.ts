import { PropType } from 'vue';
import { DialogPositionTypes } from 'types/components/dialog/index';
import { MaskProps } from '../popup/popupType';

const PopupProps = {
    transition: {
        type: String,
        default: 'som-dialog-fade',
    },
    customStyle: Object,
    width: {
        type: String,
        default: '80%',
    },
    height: {
        type: String,
        default: '96vw',
    },
};

const DialogProp = {
    ...MaskProps,
    ...PopupProps,
    show: {
        type: Boolean,
        default: false,
    },
    isCancel: {
        type: Boolean,
        default: true,
    },
    closeBtnPosition: {
        type: String as PropType<DialogPositionTypes>,
        default: 'outside',
    },
    closeIcon: {
        type: String,
        default: 'close',
    },
};

export default DialogProp;
