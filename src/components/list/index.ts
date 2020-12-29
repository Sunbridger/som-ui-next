
// 列表
import { App } from 'vue';

import SomList from './list.vue';
import SomListItem from './list-item.vue';

const install = (app: App) => {
    app.component(SomList.name, SomList);
    app.component(SomListItem.name, SomListItem);
};

export {
    SomList,
    SomListItem
};

export default {
    install
};
