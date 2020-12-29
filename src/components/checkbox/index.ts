
// 复选框
import { App } from 'vue';

import SomCheckbox from './checkbox.vue';

const install = (app: App) => {
    app.component(SomCheckbox.name, SomCheckbox);
};

export {
    SomCheckbox
};

export default {
    install
};
