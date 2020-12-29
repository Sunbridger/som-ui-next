import { mount } from '@vue/test-utils';
import ScrollRefresh from 'main/components/scroll-refresh';
import { namespace } from 'root/components.json';
import { title } from 'root/build/share/utils';

describe('scroll-refresh', () => {
    it('渲染滚动刷新组件', () => {
        const wrapper = mount(ScrollRefresh);
        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.name()).toMatch(new RegExp(`^${title(namespace)}`));
    });
});
