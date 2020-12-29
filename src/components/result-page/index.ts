
// 结果页
import { App } from 'vue';

import SomResultPage from './result-page.vue';

const install = (app: App) => {
    app.component(SomResultPage.name, SomResultPage);
};

export {
    SomResultPage
};

export default {
    install
};
