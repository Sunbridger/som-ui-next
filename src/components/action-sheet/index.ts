
// 动作面板
import { App } from 'vue';

import SomActionSheet from './action-sheet.vue';

const install = (app: App) => {
    app.component(SomActionSheet.name, SomActionSheet);
};

export {
    SomActionSheet
};

export default {
    install
};
