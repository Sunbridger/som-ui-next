const render = require('json-templater/string');
const fs = require('fs');
const { namespace } = require('../../components.json');

const moduleIndexEntryTemplate = `/* 这是一个根据components.json自动生成的文件 */
import { App } from 'vue';
import IConfigData from 'types/common/const';
import { setGlobalConfig } from './config';

{{importList}}

const components = [
{{componentList}}
];

const install = function(app: App, options?: IConfigData) {
    options && setGlobalConfig(app, options);
    components.forEach(component => {
        app.use(component);
    });
};

export default {
    install
};

export {
{{componentList}}
};
`;

const typesIndexEntryTemplate = `/* 这是一个根据components.json自动生成的文件 */
import { App } from 'vue';
import IConfigData from 'types/common/const';

{{importList}}

export function install(app: App): void;

export {
    IConfigData,
{{componentList}}
};
`;

const componentSrcTemplateIndex = `
// {{componentChineseName}}
import { App } from 'vue';

import {{componentTitleName}} from './{{componentName}}.vue';

const install = (app: App) => {
    app.component({{componentTitleName}}.name, {{componentTitleName}});
};

export {
    {{componentTitleName}}
};

export default {
    install
};
`;

const componentSrcIndexTemplate = `<style lang="less">
@import '~@/styles/components/{{componentName}}/var.less';

@block: ${namespace}-{{componentName}};
.${namespace}-{{componentName}} {

}
</style>

<template>
    <div class="${namespace}-{{componentName}}">
        {{componentName}}
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: '{{componentTitleName}}'
});
</script>
`;

const componentStyleTemplate = `.${namespace}-{{componentName}} {

}
`;

const pluginSrcIndexTemplate = `// {{componentName}}
import { App } from 'vue';

const plugin = {
    install (app: App<Element>, pluginOptions = {}) {

        const {{componentName}} = {};

        app.config.globalProperties.\${{componentName}} = {{componentName}};
    }
};

export default plugin;
export const install = plugin.install;
`;

const directiveSrcIndexTemplate = `// {{componentName}}
import { App } from 'vue';

const directive = {
    install (app: App<Element>) {

        const {{componentName}} = {};

        app.directive('{{componentName}}', {{componentName}});
    }
};

export default directive;
export const install = plugin.install;
`;

const declareTemplate = `// {{componentName}}
import { SomComponent, CommonProps } from '../component';

export interface I{{componentName}}Props {

}

export interface Props extends I{{componentName}}Props, CommonProps {}

export declare class {{componentName}} extends SomComponent {
    $props: Props;
}

export default {{componentName}};
`;

const componentDocTemplate = `## {{componentTitleName}} {{componentChineseName}}

### 代码演示

::: demo {{moduleName}} {{componentName}}
基础用法
:::

### API

#### {{componentTitleName}}
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| — | — | — | — | — |

#### {{componentTitleName}} Events
| 事件名      | 说明          | 返回值                           |
|---------- |-------------- |--------------------------------  |
| — | — | — |

### 贡献者
| 类型       | 参与者                          |
|---------- |--------------------------------  |
| 维护者 | — |
| 设计师 | — |
`;

const componentTestTemplate = `import { mount } from '@vue/test-utils';
import {{componentTitleName}} from 'main/components/{{componentName}}';
import { namespace } from 'root/components.json';
import { title } from 'root/build/share/utils';

describe('{{componentName}}', () => {
    it('渲染{{componentChineseName}}组件', () => {
        const wrapper = mount({{componentTitleName}});
        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.name()).toMatch(new RegExp(\`^\${title(namespace)}\`));
    });
});
`;

const pluginTestTemplate = `import { mount } from '@vue/test-utils';
import {{componentName}} from 'main/{{type}}/{{componentName}}';

describe('{{componentName}}', () => {
    
});
`;

const componentExampleTemplate = `<template>
    <div class="pg-component-{{componentName}}">
        {{componentName}}
    </div>
</template>
<script>
export default {
};
</script>
`;

/**
 * 渲染并保存模板
 * @param {Object} param { template, data, path }
 */
function renderTemplate({ template, data, path }) {
    const templates = render(template, data);
    fs.writeFileSync(path, templates);
}

module.exports = {
    /**
     * 渲染模块入口文件
     * @param {String} path 路径
     * @param {Object} data { importList, componentList }
     */
    renderModuleIndexEntry(path, data) {
        renderTemplate({
            template: moduleIndexEntryTemplate,
            data,
            path,
        });
    },
    /**
     * 渲染模块types入口文件
     * @param {String} path 路径
     * @param {Object} data { importList, componentList }
     */
    renderTypesIndexEntry(path, data) {
        renderTemplate({
            template: typesIndexEntryTemplate,
            data,
            path,
        });
    },
    /**
     * 渲染组件
     * @param {String} path 路径
     * @param {Object} data { moduleName, componentName, componentTitleName, type, typeTitle }
     */
    renderComponentSrcIndex(path, data) {
        renderTemplate({
            template: componentSrcIndexTemplate,
            data,
            path,
        });
    },
    /**
     * 渲染组件
     * @param {String} path 路径
     * @param {Object} data { componentName }
     */
    renderComponentStyle(path, data) {
        renderTemplate({
            template: componentStyleTemplate,
            data,
            path,
        });
    },
    /**
     * 渲染组件index.js
     * @param {String} path 路径
     * @param {Object} data { componentName, componentTitleName, componentChineseName }
     */
    renderComponentSrcImportIndex(path, data) {
        renderTemplate({
            template: componentSrcTemplateIndex,
            data,
            path,
        });
    },
    /**
     * 渲染组件文档
     * @param {String} path 路径
     * @param {Object} data { moduleName, componentName componentTitleName, componentChineseName }
     */
    renderComponentDoc(path, data) {
        renderTemplate({
            template: componentDocTemplate,
            data,
            path,
        });
    },
    /**
     * 渲染组件测试文件
     * @param {String} path 路径
     * @param {Object} data { moduleName, componentName, componentTitleName, componentChineseName }
     */
    renderComponentTest(path, data) {
        renderTemplate({
            template: componentTestTemplate,
            data,
            path,
        });
    },

    /**
     * 渲染types文件
     * @param {String} path 路径
     * @param {Object} data
     */
    renderComponentType(path, data) {
        renderTemplate({
            template: declareTemplate,
            data,
            path,
        });
    },
    /**
     * 渲染组件测试文件
     * @param {String} path 路径
     * @param {Object} data { type, componentName }
     */
    renderPluginTest(path, data) {
        renderTemplate({
            template: pluginTestTemplate,
            data,
            path,
        });
    },

    /**
     * 渲染插件和指令的文件
     * @param {String} path 路径
     * @param {Object} data { type, componentName }
     */
    renderPluginSrcIndex(path, data) {
        renderTemplate({
            template: pluginSrcIndexTemplate,
            data,
            path,
        });
    },
    /**
     * 渲染插件和指令的文件
     * @param {String} path 路径
     * @param {Object} data { type, componentName }
     */
    renderDirectiveSrcIndex(path, data) {
        renderTemplate({
            template: directiveSrcIndexTemplate,
            data,
            path,
        });
    },
    /**
     * 渲染组件测试文件
     * @param {String} path 路径
     * @param {Object} data { moduleName, componentName }
     */
    renderComponentExample(path, data) {
        renderTemplate({
            template: componentExampleTemplate,
            data,
            path,
        });
    },
};
