// 提示气泡
import { App } from 'vue';

import SomTooltips from './tooltips.vue';
import SomTooltipsItem from './tooltips-item.vue';

const install = (app: App) => {
    app.component(SomTooltips.name, SomTooltips);
    app.component(SomTooltipsItem.name, SomTooltipsItem);
};

export { SomTooltips, SomTooltipsItem };

export default {
    install,
};
