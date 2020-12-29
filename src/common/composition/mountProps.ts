import { getCurrentInstance } from 'vue';

/**
 * 组件向外到处属性
 * @param props
 */
export default function mountProps(props) {
    const instance = getCurrentInstance();
    instance && Object.assign(instance.proxy, props);
}
