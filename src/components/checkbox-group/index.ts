
// 复选框组
import { App } from 'vue';

import SomCheckboxGroup from './checkbox-group.vue';

const install = (app: App) => {
    app.component(SomCheckboxGroup.name, SomCheckboxGroup);
};

export {
    SomCheckboxGroup
};

export default {
    install
};
