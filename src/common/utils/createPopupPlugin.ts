// 轻提示
import { renderComponent } from '@/common/utils/dom';
import { inBrowser } from '@/common/utils';
import { useShowWrappState } from '@/common/composition/show';
import { defineComponent, h, VNode } from 'vue';
import { IPluginComponentInstance } from 'types/components/toast/plugin';

let customId = 1;

/**
 * @description 创建组件实例
 * @param multiple boolean 是否多例
 * @returns queueType
 */
const createInstance = <T>(queue: IPluginComponentInstance<T>[], component: VNode, isMultiple: boolean): IPluginComponentInstance<T> => {
    // 封装了一个reactive state（包含show），一级操作show的方法
    const { open, state, close, toggle, changeProps } = useShowWrappState<T>();

    let closeMethod: (destory?: boolean) => void = () => {
        close();
    };

    const componentId = customId++;

    // 包一层传入props
    const Wrapper = defineComponent({
        setup() {
            return () =>
                h(component, {
                    'onHide': closeMethod,
                    // 'onShow': showMethod,
                    'onUpdate:show': toggle,
                    ...state,
                });
        },
    });
    const componentWrapper = renderComponent(Wrapper);

    const destoryComponent = () => {
        componentWrapper.unmount();
        // 过滤实例池
        queue = queue.filter(item => {
            return item.id !== componentId;
        });
    };

    closeMethod = (destory?: boolean) => {
        close();
        if (destory) {
            destoryComponent();
        } else {
            isMultiple && destoryComponent();
        }
    };

    return {
        id: componentId,
        open,
        changeProps,
        hide: () => {
            closeMethod();
        },
        unmount() {
            closeMethod(true);
        },
    };
};

/**
 * @description 获取实例，从实例池
 * @param multiple 是否多例
 * @returns queueType
*/
const getInstance = <T>(queue: IPluginComponentInstance<T>[], component: VNode) => (multiple: boolean) => {
    if (!inBrowser) {
        // ssr环境下，不返回实例
        return undefined;
    }
    if (!queue.length || multiple) {
        // 多例模式或者，不存在实例
        const instance = createInstance<T>(queue, component, multiple);
        queue.push(instance);
    }
    return queue[queue.length - 1];
};


const createPlugin = <T extends {
    isMultiple?: boolean;
}>(component: VNode) => {
    const queue: IPluginComponentInstance<T>[] = [];// 实例池

    const getInstanceMethod = getInstance(queue, component);

    // 插件实例
    const pluginInstance = (options: T) => {
        const instance = getInstanceMethod(options.isMultiple || false);
        if (instance) {
            instance.open(options);
            return instance;
        } else {
            return undefined;
        }
    };

    const createMethod = (options: T) => pluginInstance(options);

    const hideMethod = () => {
        queue.forEach(instance => {
            instance.hide();
        });
        queue.length = 0;
    };

    return {
        pluginInstance,
        createMethod,
        hideMethod,
    };
};


export default createPlugin;