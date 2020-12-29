## 快速上手

本节将介绍如何在项目中使用 som-ui-next

### 引入

你可以引入整个 som-ui-next，或是根据需要仅引入部分组件。我们先介绍如何引入完整的 som-ui-next

#### 完整引入

在 main.js 中写入以下内容：

```javascript
import { createApp } from 'vue';
import VueComponent from '@souche-ui/som-ui-next';
import '@souche-ui/som-ui-next/lib/styles/index.css';
import '@souche-ui/som-ui-next/lib/theme/default.css';
import App from './App.vue';

const app = createApp(App);
app.use(VueComponent);

app.mount('#app');

```

#### 按需引入
借助 [babel-plugin-component](https://github.com/ElementUI/babel-plugin-component)，我们可以只引入需要的组件，以达到减小项目体积的目的。

首先，安装 babel-plugin-component：

```bash
npm install babel-plugin-component --save-dev
```

然后，将 .babelrc 修改为：

```json
{
    "presets": [
        ["es2015", { "modules": false }]
    ],
    "plugins": [["component", [
        {
            "libraryName": "som-ui",
            "styleLibraryName": "styles"
        }
    ]]]
}
```

如是 `babel.config.js` 文件则添加配置如下
```javascript
module.exports = {
    plugins: [
        ['component', {
            libraryName: 'som-ui',
            styleLibraryName: 'styles'
        }, 'som-ui']
    ]
};
```

接下来，如果你只希望引入部分组件，比如 Button 和 Select，那么需要在 main.js 中写入以下内容：

```javascript
import Vue from 'vue';
import { Button, Select } from 'som-ui'; // 记得在 webpack 中配置别名哦
import 'som-ui/styles/theme/default.css'; // 自己引入主题文件
import App from './App.vue';

Vue.component(Button.name, Button);
Vue.component(Select.name, Select);

/* 或写为
 * Vue.use(Button)
 * Vue.use(Select)
 */

// eslint-disable-next-line no-new
new Vue({
    el: '#app',
    render: h => h(App)
});
```
以上代码便完成了 som-ui-next 的引入。需要注意的是，样式文件需要单独引入。

### 开始使用

至此，一个基于 Vue 和 som-ui-next 的开发环境已经搭建完毕，现在就可以编写代码了。各个组件的使用方法请参阅它们各自的文档。
