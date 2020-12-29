
// 输入框
import { App } from 'vue';

import SomInput from './input.vue';

const install = (app: App) => {
    app.component(SomInput.name, SomInput);
};

export {
    SomInput
};

export default {
    install
};
