const baseProps = {
    maskZIndex: {
        type: [Number, String],
        default: 500,
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
};

export const OverlayProps = {
    show: {
        type: Boolean,
        default: false,
    },
    ...baseProps,
};

export default OverlayProps;
