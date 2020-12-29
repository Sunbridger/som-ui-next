
// 表单元素
import { App } from 'vue';

import SomFormItem from './form-item.vue';

const install = (app: App) => {
    app.component(SomFormItem.name, SomFormItem);
};

export {
    SomFormItem
};

export default {
    install
};
