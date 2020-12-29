
// 走马灯
import { App } from 'vue';

import SomCarousel from './carousel.vue';

const install = (app: App) => {
    app.component(SomCarousel.name, SomCarousel);
};

export {
    SomCarousel
};

export default {
    install
};
