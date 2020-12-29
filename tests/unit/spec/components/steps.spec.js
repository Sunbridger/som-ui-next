import { mount } from '@vue/test-utils';
import Steps from 'main/components/steps';
import { namespace } from 'root/components.json';
import { title } from 'root/build/share/utils';

describe('steps', () => {
    it('渲染步骤条组件', () => {
        const wrapper = mount(Steps);
        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.name()).toMatch(new RegExp(`^${title(namespace)}`));
    });
});
