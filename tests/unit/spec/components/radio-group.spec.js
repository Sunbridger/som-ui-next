import { mount } from '@vue/test-utils';
import RadioGroup from 'main/components/form/radio-group';
import { namespace } from 'root/components.json';
import { title } from 'root/build/share/utils';

describe('radio-group', () => {
    it('渲染单选框组组件', () => {
        const wrapper = mount(RadioGroup);
        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.name()).toMatch(new RegExp(`^${title(namespace)}`));
    });
});
