import { mount } from '@vue/test-utils';
import Modal from 'main/components/modal';
import { namespace } from 'root/components.json';
import { title } from 'root/build/share/utils';

describe('modal', () => {
    it('渲染对话框组件', () => {
        const wrapper = mount(Modal);
        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.name()).toMatch(new RegExp(`^${title(namespace)}`));
    });
});
