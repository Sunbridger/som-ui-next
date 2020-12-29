import { App } from 'vue';
import ToastInstance from './plugin';

const plugin = {
    install(app: App) {
        if (!app.config.globalProperties.$som) {
            app.config.globalProperties.$som = {
                toast: ToastInstance
            };
        } else {
            app.config.globalProperties.$som.toast = ToastInstance;
        }
    }
};
export const install = plugin.install;

export default plugin;
