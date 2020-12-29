
// 进度条
import { App } from 'vue';

import SomProgress from './progress.vue';

const install = (app: App) => {
    app.component(SomProgress.name, SomProgress);
};

export {
    SomProgress
};

export default {
    install
};
