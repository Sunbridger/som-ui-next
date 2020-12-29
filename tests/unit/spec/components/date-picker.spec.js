import { mount } from '@vue/test-utils';
import DatePicker from 'main/components/date-picker';
import { namespace } from 'root/components.json';
import { title } from 'root/build/share/utils';

describe('date-picker', () => {
    it('渲染日期选择器组件', () => {
        const wrapper = mount(DatePicker);
        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.name()).toMatch(new RegExp(`^${title(namespace)}`));
    });
});
