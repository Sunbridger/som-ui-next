import { mount } from '@vue/test-utils';
import FilterItem from 'main/components/form/filter-item';
import { namespace } from 'root/components.json';
import { title } from 'root/build/share/utils';

describe('filter-item', () => {
    it('渲染筛选元素组件', () => {
        const wrapper = mount(FilterItem);
        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.name()).toMatch(new RegExp(`^${title(namespace)}`));
    });
});
