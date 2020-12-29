import { mount } from '@vue/test-utils';
import ActionSheet from 'main/components/action/action-sheet';
import { namespace } from 'root/components.json';
import { title } from 'root/build/share/utils';

describe('action-sheet', () => {
    it('渲染动作面板组件', () => {
        const wrapper = mount(ActionSheet);
        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.name()).toMatch(new RegExp(`^${title(namespace)}`));
    });
});
