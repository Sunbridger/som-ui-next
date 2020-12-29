// 弹出框
import { App } from 'vue';

import SomPopup from './popup.vue';

const install = (app: App): void => {
    app.component(SomPopup.name, SomPopup);
};

export { SomPopup };

export default {
    install,
};
