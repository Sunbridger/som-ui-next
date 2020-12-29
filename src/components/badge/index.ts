
// 徽标
import { App } from 'vue';

import SomBadge from './badge.vue';

const install = (app: App) => {
    app.component(SomBadge.name, SomBadge);
};

export {
    SomBadge
};

export default {
    install
};
