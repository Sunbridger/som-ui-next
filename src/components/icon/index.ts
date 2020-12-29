
// icon图标
import { App } from 'vue';

import SomIcon from './icon.vue';

const install = (app: App) => {
    app.component(SomIcon.name, SomIcon);
};

export {
    SomIcon
};

export default {
    install
};
