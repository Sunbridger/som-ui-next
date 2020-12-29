import { mount } from '@vue/test-utils';
import NoticeBar from 'main/components/action/notice-bar';
import { namespace } from 'root/components.json';
import { title } from 'root/build/share/utils';

describe('notice-bar', () => {
    it('渲染通告栏组件', () => {
        const wrapper = mount(NoticeBar);
        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.name()).toMatch(new RegExp(`^${title(namespace)}`));
    });
});
