// 滚动刷新
import { App } from 'vue';

import SomScrollRefresh from './scroll-refresh.vue';

const install = (app: App) => {
    app.component(SomScrollRefresh.name, SomScrollRefresh);
};

export { SomScrollRefresh };

export default {
    install,
};
