import { mount } from '@vue/test-utils';
import Calendar from 'root/packages/calendar';
import { namespace } from 'root/components.json';
import { title } from 'root/build/share/utils';

describe('calendar', () => {
    it('渲染日历选择器组件', () => {
        const wrapper = mount(Calendar);
        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.name()).toMatch(new RegExp(`^${title(namespace)}`));
    });
});
