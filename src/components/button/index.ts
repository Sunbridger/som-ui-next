// 按钮
import { App } from 'vue';

import SomButton from './button.vue';
import SomButtonGroup from './button-group.vue';

const install = (app: App): void => {
    app.component(SomButton.name, SomButton);
    app.component(SomButtonGroup.name, SomButtonGroup);
};

export { SomButton, SomButtonGroup };

export default {
    install,
};
