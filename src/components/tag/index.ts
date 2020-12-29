
// 标签
import { App } from 'vue';

import SomTag from './tag.vue';
import SomTagGroup from './tag-group.vue';

const install = (app: App) => {
    app.component(SomTag.name, SomTag);
    app.component(SomTagGroup.name, SomTagGroup);
};

export {
    SomTag,
    SomTagGroup
};

export default {
    install
};
