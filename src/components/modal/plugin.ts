import { App } from 'vue';
import { IModalProps } from 'types/components/modal';
import { useGlobalConfig } from '@/config';
import SomModal from './modal.vue';
import createPlugin from '@/common/utils/createPopupPlugin';

type ModalTypes = 'text' | 'confirm' | 'close';

const { pluginInstance, hideMethod } = createPlugin<IModalProps>(SomModal as any);

const ModalInstance = (options: IModalProps) => pluginInstance(options);

/**
 * @description 创建不同类型的toast默认方法,方便挂在到modal实例下
 * @param type 'text' | 'confirm' | 'close'
 */
const customCreateMethod = (type: ModalTypes) => (options: IModalProps) => {
    // 拿到默认配置
    const { modalPluginDefalutOptions } = useGlobalConfig().config;
    // 获取默认值
    // text 状态下，不允许在设置为confirm
    const isText = type === 'text';
    const option: IModalProps = Object.assign({}, modalPluginDefalutOptions, { isConfirm: !isText }, options);
    option.isMultiple = true;
    return pluginInstance(option);
};

ModalInstance.text = customCreateMethod('text');
ModalInstance.confirm = customCreateMethod('confirm');
ModalInstance.close = hideMethod;

const plugin = {
    install(app: App) {
        if (!app.config.globalProperties.$som) {
            app.config.globalProperties.$som = {
                modal: ModalInstance,
            };
        } else {
            app.config.globalProperties.$som.modal = ModalInstance;
        }
    },
};

export const install = plugin.install;

export default plugin;
