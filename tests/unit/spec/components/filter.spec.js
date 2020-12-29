import { mount } from '@vue/test-utils';
import Filter from 'main/components/form/filter';
import { namespace } from 'root/components.json';
import { title } from 'root/build/share/utils';

describe('filter', () => {
    it('渲染筛选组件', () => {
        const wrapper = mount(Filter);
        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.name()).toMatch(new RegExp(`^${title(namespace)}`));
    });
});
