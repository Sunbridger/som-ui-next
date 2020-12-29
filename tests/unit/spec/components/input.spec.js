import { mount } from '@vue/test-utils';
import Input from 'main/components/form/input';
import { namespace } from 'root/components.json';
import { title } from 'root/build/share/utils';

describe('input', () => {
    it('渲染输入框组件', () => {
        const wrapper = mount(Input);
        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.name()).toMatch(new RegExp(`^${title(namespace)}`));
    });
});
