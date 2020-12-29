
// 选择器
import { App } from 'vue';

import SomPicker from './picker.vue';

const install = (app: App) => {
    app.component(SomPicker.name, SomPicker);
};

export {
    SomPicker
};

export default {
    install
};
