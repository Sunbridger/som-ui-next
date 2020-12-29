import { mount } from '@vue/test-utils';
import Tooltips from 'main/components/tooltips';
import { namespace } from 'root/components.json';
import { title } from 'root/build/share/utils';

describe('tooltips', () => {
    it('渲染提示气泡组件', () => {
        const wrapper = mount(Tooltips);
        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.name()).toMatch(new RegExp(`^${title(namespace)}`));
    });
});
