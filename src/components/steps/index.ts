// 步骤条
import { App } from 'vue';

import SomSteps from './steps.vue';
import SomStep from './step.vue';

const install = (app: App) => {
    app.component(SomSteps.name, SomSteps);
    app.component(SomStep.name, SomStep);
};

export {
    SomSteps,
    SomStep
};

export default {
    install,
};
