import { mount } from '@vue/test-utils';
import Tag from 'main/components/dataDisplay/tag';
import { namespace } from 'root/components.json';
import { title } from 'root/build/share/utils';

describe('tag', () => {
    it('渲染标签组件', () => {
        const wrapper = mount(Tag);
        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.name()).toMatch(new RegExp(`^${title(namespace)}`));
    });
});
