import { mount } from '@vue/test-utils';
import List from 'main/components/dataDisplay/list';
import { namespace } from 'root/components.json';
import { title } from 'root/build/share/utils';

describe('list', () => {
    it('渲染列表组件', () => {
        const wrapper = mount(List);
        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.name()).toMatch(new RegExp(`^${title(namespace)}`));
    });
});
