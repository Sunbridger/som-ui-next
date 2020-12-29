
// 搜索框
import { App } from 'vue';

import SomSearchbar from './searchbar.vue';

const install = (app: App) => {
    app.component(SomSearchbar.name, SomSearchbar);
};

export {
    SomSearchbar
};

export default {
    install
};
