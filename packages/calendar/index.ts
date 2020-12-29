
// 日历选择器
import { App } from 'vue';

import SomCalendar from './src/calendar.vue';

const install = (app: App) => {
    app.component(SomCalendar.name, SomCalendar);
};

export {
    SomCalendar
};

export default {
    install
};
