import { mount } from '@vue/test-utils';
import Carousel from 'main/components/dataDisplay/carousel';
import { namespace } from 'root/components.json';
import { title } from 'root/build/share/utils';

describe('carousel', () => {
    it('渲染走马灯组件', () => {
        const wrapper = mount(Carousel);
        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.name()).toMatch(new RegExp(`^${title(namespace)}`));
    });
});
