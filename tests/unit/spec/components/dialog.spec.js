import { mount } from '@vue/test-utils';
import Dialog from 'main/components/dialog';
import { namespace } from 'root/components.json';
import { title } from 'root/build/share/utils';

describe('dialog', () => {
    it('渲染弹窗组件', () => {
        const wrapper = mount(Dialog);
        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.name()).toMatch(new RegExp(`^${title(namespace)}`));
    });
});
