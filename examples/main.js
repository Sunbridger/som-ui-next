import { createApp } from 'vue';
import main from 'main';
import 'main/styles/theme/default.css';
import { Menu, Row, Col, Dropdown, Radio, Select } from 'ant-design-vue';
import 'ant-design-vue/es/menu/style/css';
import 'ant-design-vue/es/row/style/css';
import 'ant-design-vue/es/col/style/css';
import 'ant-design-vue/es/dropdown/style/css';
import 'ant-design-vue/es/radio/style/css';
import 'ant-design-vue/es/select/style/css';
import 'lemon';
import 'lemon/less/reset.less';
import RightOutlined from '@ant-design/icons-vue/RightOutlined';
import MenuUnfoldOutlined from '@ant-design/icons-vue/MenuUnfoldOutlined';
import ProfileOutlined from '@ant-design/icons-vue/ProfileOutlined';
import SUV from '@souche-vue3/souche-util-vue';
import App from './App.vue';
import router from './router';
import Calendar from '../packages/calendar';


const app = createApp(App);
app.use(SUV);
app.use(Calendar);

const component = [
    Menu, Row, Col, Dropdown, Radio, Select
];

const IconComponents = [
    RightOutlined, MenuUnfoldOutlined, ProfileOutlined
];
IconComponents.forEach(elComponent => app.component(elComponent.displayName, elComponent));
component.forEach(elComponent => app.use(elComponent));
app.use(router);

app.use(main);
app.mount('#app');
