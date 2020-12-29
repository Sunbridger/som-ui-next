import { mount } from '@vue/test-utils';
import Loading from 'main/components/notice/loading';
import { namespace } from 'root/components.json';
import { title } from 'root/build/share/utils';

describe('loading', () => {
    it('渲染加载组件', () => {
        const wrapper = mount(Loading);
        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.name()).toMatch(new RegExp(`^${title(namespace)}`));
    });
});
