// 轻提示
import { IToastOptions, ToastTypes } from 'types/components/toast';
import { isString } from '@souche-vue3/souche-util-vue';
import { useGlobalConfig } from '@/config';
import createPlugin from '@/common/utils/createPopupPlugin';
import SomToast from './toast.vue';

const iconList = {
    success: {
        type: 'success',
        department: 'base',
        size: '36px',
    },
    loading: {
        type: 'renovate',
        department: 'base',
        size: '36px',
    },
    warn: {
        type: 'warn',
        department: 'base',
        size: '36px',
    },
    error: {
        type: 'error',
        department: 'base',
        size: '36px',
    }
};

// 格式化参数，比如附上type属性
// 转换string类型的options为对象
const formatPluginOptions = (type: ToastTypes, options: IToastOptions | string) => {
    const { toastPluginDefalutOptions } = useGlobalConfig().config;
    let option: IToastOptions = toastPluginDefalutOptions;

    // 如果时带icon的默认类型则给实例附上默认的icon，并让toast居中
    const param: IToastOptions = {
        type,
    };
    if (type !== 'text' && type !== 'default') {
        param.icon = iconList[type] || '';
        param.position = 'middle';
    }

    // 带图标的
    if (isString(options)) {
        option = Object.assign({}, option, {
            ...param,
            text: options,
            isMultiple: false,
        });
    } else {
        // 如果主动传人了icon和position则以传入的为准
        options.icon && delete param.icon;
        options.position && delete param.position;
        option = Object.assign({}, option, options, param);
    }

    return option;
};


const { pluginInstance, hideMethod } = createPlugin<IToastOptions>(SomToast as any);

/**
 * @description toast调用方法
 * @param options IToastOptions | string, toast配置
 * @returns IToastInstance
 */
const ToastInstance = (options: IToastOptions | string) => {
    const option = formatPluginOptions('default', options);
    return pluginInstance(option);
};

/**
 * @description 创建不同类型的toast默认方法
 * @param type ToastTypes
 */
const customCreateMethod = (type: ToastTypes) => (options: IToastOptions | string) => {
    const option = formatPluginOptions(type, options);
    return ToastInstance({
        ...option,
    });
};
ToastInstance.success = customCreateMethod('success');
ToastInstance.warn = customCreateMethod('warn');
ToastInstance.error = customCreateMethod('error');
ToastInstance.loading = customCreateMethod('loading');
ToastInstance.text = customCreateMethod('text');
ToastInstance.hide = hideMethod;

export default ToastInstance;
