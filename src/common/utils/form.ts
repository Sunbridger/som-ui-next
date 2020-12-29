import { defineComponent, h, VNode, Fragment } from 'vue';
import { isArray } from '.';

/**
 * todo som-icon接入
 * 自定义icon
 */
export const CustomIcon = defineComponent({
    props: {
        // 使用som-icon的传参
        icon: {
            type: [String, Object],
            default: ''
        },
        size: {
            type: [Number, String],
            default: 14
        },
        fill: {
            type: String,
            default: '#f01d24'
        }
    },
    setup(props, { slots }) {
        return () => {
            const iconVNode = slots.default?.();
            const hasIconSlot = (iconVNode as VNode[])[0].children?.length;
            return (hasIconSlot || props.icon ?
                h('span', {
                    class: `fs${props.size} inline-flex flex-align-center`,
                    style: { fill: props.fill }
                }, hasIconSlot ? iconVNode : props.icon) :
                null);
        };
    }
});

/**
 * 将props等组件属性继承到继承slot的组件
 */
export const extendsSlot = defineComponent({
    setup(_props, { slots, attrs }) {
        return () => {
            const vnode = slots.default?.();
            if (!vnode) return null;
            // todo: 待优化
            let vn = vnode[0];
            // 遍历获取非片段的元素
            while (vn.type === Fragment && (vn.children && isArray(vn.children) && vn.children.some(child => (child as VNode)?.type === Fragment))) {
                vn = vn.children.find(child => (child as VNode)?.type === Fragment) as VNode;
            }
            vn.children = (vn.children as VNode[]).map?.((i) => {
                if (typeof i.type === 'symbol') {
                    return i;
                }
                return h(i, attrs);
            });
            return vnode;
        };
    }
});
