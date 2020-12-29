import { mount } from '@vue/test-utils';
import ResultPage from 'main/components/result-page';
import { namespace } from 'root/components.json';
import { title } from 'root/build/share/utils';

describe('result-page', () => {
    it('渲染结果页组件', () => {
        const wrapper = mount(ResultPage);
        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.name()).toMatch(new RegExp(`^${title(namespace)}`));
    });
});
