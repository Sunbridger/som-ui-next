
// 日期选择器
import { App } from 'vue';

import SomDatePicker from './date-picker.vue';

const install = (app: App) => {
    app.component(SomDatePicker.name, SomDatePicker);
};

export {
    SomDatePicker
};

export default {
    install
};
