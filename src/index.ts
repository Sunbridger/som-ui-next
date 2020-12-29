/* 这是一个根据components.json自动生成的文件 */
import { App } from 'vue';
import IConfigData from 'types/common/const';
import { setGlobalConfig } from './config';

import Icon from './components/icon';
import Button from './components/button';
import Form from './components/form';
import FormItem from './components/form-item';
import Input from './components/input';
import Radio from './components/radio';
import RadioGroup from './components/radio-group';
import Checkbox from './components/checkbox';
import CheckboxGroup from './components/checkbox-group';
import Filter from './components/filter';
import FilterItem from './components/filter-item';
import Searchbar from './components/searchbar';
import Picker from './components/picker';
import DatePicker from './components/date-picker';
import Popup from './components/popup';
import Dialog from './components/dialog';
import Modal from './components/modal';
import ActionSheet from './components/action-sheet';
import NoticeBar from './components/notice-bar';
import Overlay from './components/overlay';
import Toast from './components/toast';
import Tooltips from './components/tooltips';
import Loading from './components/loading';
import List from './components/list';
import Tag from './components/tag';
import Badge from './components/badge';
import Carousel from './components/carousel';
import Steps from './components/steps';
import Progress from './components/progress';
import Tabs from './components/tabs';
import ResultPage from './components/result-page';
import ScrollRefresh from './components/scroll-refresh';

const components = [
    Icon,
    Button,
    Form,
    FormItem,
    Input,
    Radio,
    RadioGroup,
    Checkbox,
    CheckboxGroup,
    Filter,
    FilterItem,
    Searchbar,
    Picker,
    DatePicker,
    Popup,
    Dialog,
    Modal,
    ActionSheet,
    NoticeBar,
    Overlay,
    Toast,
    Tooltips,
    Loading,
    List,
    Tag,
    Badge,
    Carousel,
    Steps,
    Progress,
    Tabs,
    ResultPage,
    ScrollRefresh
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
    Icon,
    Button,
    Form,
    FormItem,
    Input,
    Radio,
    RadioGroup,
    Checkbox,
    CheckboxGroup,
    Filter,
    FilterItem,
    Searchbar,
    Picker,
    DatePicker,
    Popup,
    Dialog,
    Modal,
    ActionSheet,
    NoticeBar,
    Overlay,
    Toast,
    Tooltips,
    Loading,
    List,
    Tag,
    Badge,
    Carousel,
    Steps,
    Progress,
    Tabs,
    ResultPage,
    ScrollRefresh
};
