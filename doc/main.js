import 'highlight.js/styles/monokai-sublime.css';
// import 'highlight.js/styles/atom-one-light.css';
import 'lemon';
import 'lemon/less/reset.less';
import 'styles/common.less';
import { createApp } from 'vue';
import main from 'main';
import { Menu, Row, Col, Dropdown, Select, Table } from 'ant-design-vue';
import DownOutlined from '@ant-design/icons-vue/DownOutlined';
import 'ant-design-vue/es/menu/style/css';
import 'ant-design-vue/es/row/style/css';
import 'ant-design-vue/es/col/style/css';
import 'ant-design-vue/es/dropdown/style/css';
import 'ant-design-vue/es/select/style/css';
import 'ant-design-vue/es/table/style/css';
import docApi from '@souche-vue/component-doc-api-next';
import SUV from '@souche-vue3/souche-util-vue';
import App from './App.vue';
import router from './router';
import DemoBlock from './components/common/demo';
import IconList from '../examples/views/components/basic/icon-list.vue';

const app = createApp(App);

const isProduction = process.env.NODE_ENV === 'production';

app.use(router);
app.use(main);
app.use(SUV);

const elComponents = [
    Menu, Row, Col, Dropdown, Select, Table
];
const IconComponents = [
    DownOutlined
];
IconComponents.forEach(elComponent => app.component(elComponent.displayName, elComponent));
elComponents.forEach(elComponent => app.use(elComponent));
app.component('demo-block', DemoBlock);
app.component('IconList', IconList);
app.use(docApi, {
    isProduction
});

app.mount('#app');
