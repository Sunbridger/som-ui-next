
// 筛选元素
import { App } from 'vue';

import SomFilterItem from './filter-item.vue';

const install = (app: App) => {
    app.component(SomFilterItem.name, SomFilterItem);
};

export {
    SomFilterItem
};

export default {
    install
};
