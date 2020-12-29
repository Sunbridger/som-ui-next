
// 加载
import SomLoading from './loading.vue';
import createPlugin from '@/common/utils/createPopupPlugin';
import { ILoadingProps } from 'types/components/loading';
import { isString } from '@souche-vue3/souche-util-vue';

type ILoadingPropsWrapper = ILoadingProps & {
    isMultiple?: boolean;
};

const { pluginInstance, hideMethod } = createPlugin<ILoadingPropsWrapper>(SomLoading as any);

// 转换string类型的options为对象
const formatPluginOptions = (options: ILoadingPropsWrapper | string = {}) => {
    let option: ILoadingPropsWrapper = {};
    // 带图标的
    if (isString(options)) {
        option = Object.assign({}, {
            text: options,
        });
    } else {
        option = options || {};
    }
    option.isMultiple = true;

    return option;
};

/**
 * @description loading调用方法
 * @param options loadingOptions | string
 * @returns LoadingInstance
 */
const LoadingInstance = (options: ILoadingPropsWrapper | string) => {
    const option = formatPluginOptions(options);
    return pluginInstance(option);
};

LoadingInstance.show = LoadingInstance;
LoadingInstance.hide = hideMethod;

export default LoadingInstance;
