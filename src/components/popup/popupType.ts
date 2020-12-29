import { PropType } from 'vue';
import { PopupPositionTypes } from 'types/components/popup/index';

export const MaskProps = {
    /* mask 部分 */
    showMask: {
        type: Boolean,
        default: true,
    },
    maskZIndex: {
        type: [Number, String],
        default: 1000,
    },
    maskStyle: {
        type: Object,
    },
    lockScroll: {
        type: Boolean,
        default: true,
    },
    isTransparent: {
        type: Boolean,
        default: false,
    },
    maskTransition: {
        type: String,
        default: 'som-mask',
    },
    maskClass: {
        type: String,
    },
    hideOnBlur: {
        type: Boolean,
        default: true,
    },
};

export const CustomPopupProp = {
    customStyle: {
        type: Object,
    },
    transition: {
        type: String,
    },
};

export const PopupProp = {
    /* mask 部分 */
    ...MaskProps,
    /* popup */
    ...CustomPopupProp,
    show: {
        type: Boolean,
        default: false,
    },
    position: {
        type: String as PropType<PopupPositionTypes>,
        default: 'bottom',
    },
    width: {
        type: String,
        default: 'auto',
    },
    height: {
        type: String,
        default: 'auto',
    },
    maxHeight: {
        type: String,
    },
    closeIcon: {
        type: String,
        default: 'close',
    },
    borderRadius: {
        type: String,
    },
    closeable: {
        type: Boolean,
        default: true,
    },
};

export default PopupProp;
