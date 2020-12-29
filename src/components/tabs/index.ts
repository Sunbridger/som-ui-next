// tabs选项卡
import { App } from 'vue';

import SomTabs from './tabs.vue';
import SomTab from './tab.vue';

const install = (app: App) => {
    app.component(SomTabs.name, SomTabs);
    app.component(SomTab.name, SomTab);
};

export { SomTabs, SomTab };

export default {
    install,
};
