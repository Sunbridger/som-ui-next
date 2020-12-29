import { mount } from '@vue/test-utils';
import Toast from 'main/components/toast';
import { namespace } from 'root/components.json';
import { title } from 'root/build/share/utils';

describe('toast', () => {
    it('渲染轻提示组件', () => {
        const wrapper = mount(Toast);
        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.name()).toMatch(new RegExp(`^${title(namespace)}`));
    });
});
