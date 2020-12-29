import { mount } from '@vue/test-utils';
import Form from 'main/components/form/form';
import { namespace } from 'root/components.json';
import { title } from 'root/build/share/utils';

describe('form', () => {
    it('渲染表单组件', () => {
        const wrapper = mount(Form);
        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.name()).toMatch(new RegExp(`^${title(namespace)}`));
    });
});
