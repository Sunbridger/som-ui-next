
// 通告栏
import { App } from 'vue';

import SomNoticeBar from './notice-bar.vue';

const install = (app: App) => {
    app.component(SomNoticeBar.name, SomNoticeBar);
};

export {
    SomNoticeBar
};

export default {
    install
};
