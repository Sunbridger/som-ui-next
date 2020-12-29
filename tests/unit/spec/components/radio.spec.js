import { mount } from '@vue/test-utils';
import Radio from 'main/components/form/radio';
import { namespace } from 'root/components.json';
import { title } from 'root/build/share/utils';

describe('radio', () => {
    it('渲染单选框组件', () => {
        const wrapper = mount(Radio);
        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.name()).toMatch(new RegExp(`^${title(namespace)}`));
    });
});
