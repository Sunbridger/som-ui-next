const render = require('json-templater/string');
const fs = require('fs');
const { namespace } = require('../../components.json');

const componentSrcTemplateIndex = `
// {{componentChineseName}}
import { App } from 'vue';

import {{componentTitleName}} from './src/{{componentName}}.vue';

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
@import './var.less';

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

const declareTemplate = `// {{componentTitleName}}
import { App, HTMLAttributes } from 'vue';

export declare class SomComponent {
    static install(app: App): void;
}

export type CommonProps = HTMLAttributes

export interface I{{componentTitleName}}Props {

}

export interface Props extends I{{componentTitleName}}Props, CommonProps {}

export declare class {{componentTitleName}} extends SomComponent {
    $props: Props;
}

export default {{componentTitleName}};
`;


const declareVueTemplate = `declare module '*.vue' {
    import { defineComponent } from 'vue';

    const component: ReturnType<typeof defineComponent>;
    export default component;
  }
`;

const componentDocTemplate = `## {{componentTitleName}} {{componentChineseName}}

### 代码演示

::: demo packages {{componentName}}
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
import {{componentTitleName}} from 'root/packages/{{componentName}}';
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

const componentPackageJson = `{
    "name": "@souche-ui/{{nComponentName}}-next",
    "version": "0.1.0",
    "description": "{{nComponentName}}",
    "main": "./lib/index.js",
    "repository": "https://git.souche-inc.com/souche-vue3/souche-ui/som-ui-next/tree/master/packages/{{componentName}}",
    "author": "souchefe",
    "license": "MIT",
    "types": "index.d.ts",
    "files": [
        "src",
        "lib",
        "index.d.ts",
        "index.js"
    ]
}`;

/**
 * 渲染并保存模板
 * @param {Object} param { template, data, path }
 */
function renderTemplate({
    template,
    data,
    path
}) {
    const templates = render(template, data);
    fs.writeFileSync(path, templates);
}

module.exports = {
    /**
     * 渲染组件
     * @param {String} path 路径
     * @param {Object} data { moduleName, componentName, componentTitleName, type, typeTitle }
     */
    renderComponentSrcIndex(path, data) {
        renderTemplate({
            template: componentSrcIndexTemplate,
            data,
            path
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
            path
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
            path
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
            path
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
            path
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
            path: path[0]
        });
        renderTemplate({
            template: declareVueTemplate,
            data,
            path: path[1]
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
            path
        });
    },
    renderComponentReadme(path, data) {
        renderTemplate({
            template: '# {{nComponentName}}',
            data,
            path
        });
    },
    renderComponentPackage(path, data) {
        renderTemplate({
            template: componentPackageJson,
            data,
            path
        });
    }
};
