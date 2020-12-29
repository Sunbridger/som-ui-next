import { mount } from '@vue/test-utils';
import Overlay from 'main/components/overlay';
import { namespace } from 'root/components.json';
import { title } from 'root/build/share/utils';

describe('overlay', () => {
    it('渲染遮罩层组件', () => {
        const wrapper = mount(Overlay);
        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.name()).toMatch(new RegExp(`^${title(namespace)}`));
    });
});
