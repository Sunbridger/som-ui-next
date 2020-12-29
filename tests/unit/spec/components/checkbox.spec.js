import { mount } from '@vue/test-utils';
import Checkbox from 'main/components/form/checkbox';
import { namespace } from 'root/components.json';
import { title } from 'root/build/share/utils';

describe('checkbox', () => {
    it('渲染复选框组件', () => {
        const wrapper = mount(Checkbox);
        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.name()).toMatch(new RegExp(`^${title(namespace)}`));
    });
});
