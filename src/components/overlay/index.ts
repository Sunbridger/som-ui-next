// 蒙层
import { App } from 'vue';

import SomOverlay from './overlay.vue';

const install = (app: App): void => {
    app.component(SomOverlay.name, SomOverlay);
};

export { SomOverlay };

export default {
    install,
};
