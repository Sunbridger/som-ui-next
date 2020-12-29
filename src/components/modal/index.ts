// 对话框
import { App } from 'vue';

import SomModal from './modal.vue';
import SomModalPlugin from './plugin';

const install = (app: App) => {
    app.component(SomModal.name, SomModal);
    app.use(SomModalPlugin);
};

export { SomModal, SomModalPlugin };

export default {
    install,
};
