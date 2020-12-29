import { mount } from '@vue/test-utils';
import Popup from 'main/components/popup';
import { namespace } from 'root/components.json';
import { title } from 'root/build/share/utils';

describe('popup', () => {
    it('渲染弹出框组件', () => {
        const wrapper = mount(Popup);
        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.name()).toMatch(new RegExp(`^${title(namespace)}`));
    });
});
