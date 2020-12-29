// 弹窗
import { App } from 'vue';

import SomDialog from './dialog.vue';

const install = (app: App) => {
    app.component(SomDialog.name, SomDialog);
};

export { SomDialog };

export default {
    install,
};
