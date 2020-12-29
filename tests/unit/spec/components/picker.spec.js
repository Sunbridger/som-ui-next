import { mount } from '@vue/test-utils';
import Picker from 'main/components/form/picker';
import { namespace } from 'root/components.json';
import { title } from 'root/build/share/utils';

describe('picker', () => {
    it('渲染选择器组件', () => {
        const wrapper = mount(Picker);
        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.name()).toMatch(new RegExp(`^${title(namespace)}`));
    });
});
