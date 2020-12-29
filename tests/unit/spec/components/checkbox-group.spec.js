import { mount } from '@vue/test-utils';
import CheckboxGroup from 'main/components/form/checkbox-group';
import { namespace } from 'root/components.json';
import { title } from 'root/build/share/utils';

describe('checkbox-group', () => {
    it('渲染复选框组组件', () => {
        const wrapper = mount(CheckboxGroup);
        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.name()).toMatch(new RegExp(`^${title(namespace)}`));
    });
});
