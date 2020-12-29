import { PropType } from 'vue';

export const InputName = 'SomInput';

export type InputTheme = 'light' | 'dark' | 'none';

export interface InputMethods {
    focus: () => void;
    blur: () => void;
    select: () => void;
}

export const InputProps = {
    modelValue: String,
    type: {
        type: String,
        default: 'text'
    },
    showWordLimit: {
        type: Boolean,
        default: false
    },
    placeholder: {
        type: String,
        default: '请输入'
    },
    clearable: {
        type: Boolean,
        default: false
    },
    showPassword: {
        // 是否显示切换密码图标
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    autosize: {
        // { minRows maxRows minHeight maxHeight }
        type: [Boolean, Object],
        default: false as any // todo 类型
    },
    validateEvent: {
        // 输入时是否触发表单的校验
        type: Boolean,
        default: true
    },
    theme: {
        type: String as PropType<InputTheme>,
        default: 'none'
    },
    prefixIcon: String,
    suffixIcon: String,
    debounce: {
        type: Number,
        default: 0
    }
};
