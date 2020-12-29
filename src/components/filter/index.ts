
// 筛选
import { App } from 'vue';

import SomFilter from './filter.vue';

const install = (app: App) => {
    app.component(SomFilter.name, SomFilter);
};

export {
    SomFilter
};

export default {
    install
};
