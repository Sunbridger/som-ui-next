import { App } from 'vue';
import LoadingInstance from './plugin';

const plugin = {
    install(app: App) {
        if (!app.config.globalProperties.$som) {
            app.config.globalProperties.$som = {
                loading: LoadingInstance
            };
        } else {
            app.config.globalProperties.$som.loading = LoadingInstance;
        }
    }
};
export const install = plugin.install;

export default plugin;
