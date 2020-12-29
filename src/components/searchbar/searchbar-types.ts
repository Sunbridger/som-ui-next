import { PropType } from 'vue';
import { InputTheme } from '../input/input-types';

export const SearchbarName = 'SomSearchbar';
export interface PresetItem {
    title: string;
    list: {
        key: string;
        [key: string]: any;
    };
}

export interface ReulstItem {
    key: string;
    [key: string]: any;
}

export const SearchbarProps = {
    modelValue: String,
    placeholder: {
        // 提示文字
        type: String,
        default: '请输入'
    },
    isCancel: {
        // 是否显示取消按钮
        type: Boolean,
        default: false
    },
    cancelText: {
        // 取消文字
        type: String,
        default: '取消'
    },
    theme: {
        type: String as PropType<InputTheme>,
        default: 'light'
    },
    // todo: selectList
    // select: {} 是否为可切换列表搜索 boolean — false
    // select-list 切换列表数据 array — —
    // select-key 切换列表默认选择 key 值 number — 0
    // effect 切换列表模式， 同 tips string light/dark/active dark
    // placement tips 的出现位置 string top/top-start/top-end/bottom/bottom-start/bottom-end/left/right bottom
    // gutter 箭头和触发元素之间的距离 number — 8
    autoFixed: {
        // 是否 fixed 在页面，并展示 result
        type: Boolean,
        default: false
    },
    top: {
        // 自动固定时距离顶部的距离
        type: String,
        default: '0'
    },
    result: {
        // 指定搜索结果, 为带有 title key 的对象 或字符串组成的数组，如 [ {title: 'hello', otherData: otherValue} ]
        type: Array as PropType<ReulstItem[]>,
        default: () => []
    },
    preset: {
        // 搜索热词等提示
        type: Array as PropType<PresetItem[]>,
        default: () => []
    },
    noResultMsg: {
        // 没有搜索结果时的提示信息, 设置为空时不显示
        type: String,
        default: '抱歉， 暂无相关信息'
    },
    autoScrollToTop: {
        // safari 下弹出键盘时可能会出现看不到input，需要手动滚动，启用该属性会在fix时滚动到顶端
        type: Boolean,
        default: false
    },
    inputStyle: {
        // input 框样式自定义
        type: Object,
        default: () => ({})
    },
    formStyle: {
        // 搜索框 form 样式自定义
        type: Object,
        default: () => ({})
    },
    clearable: {
        type: Boolean,
        default: true
    },
    prefixIcon: {
        type: String,
        default: ''
    },
    suffixIcon: String,
    debounce: {
        type: Number,
        default: 100
    },
    loading: {
        type: Boolean,
        default: false
    }
};