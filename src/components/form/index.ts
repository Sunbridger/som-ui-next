
// 表单
import { App } from 'vue';

import SomForm from './form.vue';

const install = (app: App) => {
    app.component(SomForm.name, SomForm);
};

export {
    SomForm
};

export default {
    install
};
