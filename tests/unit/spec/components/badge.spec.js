import { mount } from '@vue/test-utils';
import Badge from 'main/components/dataDisplay/badge';
import { namespace } from 'root/components.json';
import { title } from 'root/build/share/utils';

describe('badge', () => {
    it('渲染徽标组件', () => {
        const wrapper = mount(Badge);
        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.name()).toMatch(new RegExp(`^${title(namespace)}`));
    });
});
