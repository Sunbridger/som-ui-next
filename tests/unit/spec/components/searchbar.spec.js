import { mount } from '@vue/test-utils';
import Searchbar from 'main/components/form/searchbar';
import { namespace } from 'root/components.json';
import { title } from 'root/build/share/utils';

describe('searchbar', () => {
    it('渲染搜索框组件', () => {
        const wrapper = mount(Searchbar);
        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.name()).toMatch(new RegExp(`^${title(namespace)}`));
    });
});
