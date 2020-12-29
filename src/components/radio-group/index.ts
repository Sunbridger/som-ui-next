
// 单选框组
import { App } from 'vue';

import SomRadioGroup from './radio-group.vue';

const install = (app: App) => {
    app.component(SomRadioGroup.name, SomRadioGroup);
};

export {
    SomRadioGroup
};

export default {
    install
};
