export type SharedPickerProps = {
    title?: string;
    loading?: boolean;
    itemHeight?: number;
    showToolbar?: boolean;
    visibleItemCount: number | string;
    cancelButtonText?: string;
    confirmButtonText?: string;
};

export const PICKER_KEY = 'somPicker';

export const pickerProps = {
    title: String,
    cancelText: {
        type: String,
        default: '取消'
    },
    confirmText: {
        type: String,
        default: '确定'
    },
    itemHeight: {
        type: Number,
        default: 34
    },
    showToolbar: {
        type: Boolean,
        default: true
    },
    visibleItemCount: {
        type: [Number, String],
        default: 7
    },
    swipeDuration: {
        type: [Number, String],
        default: 1000
    }
};
