import { mount } from '@vue/test-utils';
import Button from 'main/components/button';
import { namespace } from 'root/components.json';
import { title } from 'root/build/share/utils';

describe('button', () => {
    it('渲染按钮组件', () => {
        const wrapper = mount(Button);
        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.name()).toMatch(new RegExp(`^${title(namespace)}`));
    });
});
