import { mount } from '@vue/test-utils';
import Progress from 'main/components/progress';
import { namespace } from 'root/components.json';
import { title } from 'root/build/share/utils';

describe('progress', () => {
    it('渲染进度条组件', () => {
        const wrapper = mount(Progress);
        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.name()).toMatch(new RegExp(`^${title(namespace)}`));
    });
});
