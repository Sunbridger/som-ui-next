import { mount } from '@vue/test-utils';
import FormItem from 'main/components/form/form-item';
import { namespace } from 'root/components.json';
import { title } from 'root/build/share/utils';

describe('form-item', () => {
    it('渲染表单元素组件', () => {
        const wrapper = mount(FormItem);
        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.name()).toMatch(new RegExp(`^${title(namespace)}`));
    });
});
