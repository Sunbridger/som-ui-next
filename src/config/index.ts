// 全局参数配置
import ConfiData from '@/common/const/config';
import { isObject } from '@/common/utils';
import { IConfigData } from 'types/common/const';
import { App, AppContext, getCurrentInstance } from 'vue';

type ValueOf<T> = T[keyof T];
type CanChangeConfigType = Omit<IConfigData, 'theme' | 'needChangeToVw'>;
type CanChangeConfigKeys = keyof CanChangeConfigType;
type CanChangeConfigValues = ValueOf<CanChangeConfigType>;

class GlobalConfigClass {
    config: IConfigData;
    constructor(config: IConfigData) {
        this.config = config;
    }
    getConfig() {
        return this.config || {};
    }
    // TODO 改变主题
    // 待完善，需要动态导入css样式文件去覆盖
    changeTheme(theme: string) {
        this.config.theme = theme;
        // todo import style
    }
    updateDefaultConfig(key: CanChangeConfigKeys, options: CanChangeConfigValues) {
        this.config[key] = Object.assign({}, this.config[key], options);
    }
}

// @ts-ignore
const configInstance = new GlobalConfigClass(ConfiData);

export const mergeConfig = (options?: IConfigData) => {
    if (!options) return;
    const config = configInstance.getConfig();
    Object.keys(options).forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(config, key)) {
            return;
        }
        // todo待优化
        if (isObject(config[key])) {
            config[key] = Object.assign({}, config[key], options[key]);
        } else {
            config[key] = options[key];
        }
    });
};

export const setGlobalConfig = (app: App | AppContext, config: IConfigData) => {
    config && mergeConfig(config);
    app.config.globalProperties.$som.config = configInstance.getConfig();
};

export const useGlobalConfig = () => {
    const instance = getCurrentInstance();
    if (!instance) {
        return configInstance;
    }
    const config: IConfigData = instance.appContext.config.globalProperties.$config || configInstance.getConfig();
    return {
        ...configInstance,
        config
    };
};

