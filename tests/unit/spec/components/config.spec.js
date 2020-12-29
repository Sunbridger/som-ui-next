import { mount } from '@vue/test-utils';
import Config from 'main/components/config';
import { namespace } from 'root/components.json';
import { title } from 'root/build/share/utils';

describe('config', () => {
    it('渲染全局参数配置组件', () => {
        const wrapper = mount(Config);
        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.name()).toMatch(new RegExp(`^${title(namespace)}`));
    });
});
