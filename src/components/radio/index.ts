
// 单选框
import { App } from 'vue';

import SomRadio from './radio.vue';

const install = (app: App) => {
    app.component(SomRadio.name, SomRadio);
};

export {
    SomRadio
};

export default {
    install
};
