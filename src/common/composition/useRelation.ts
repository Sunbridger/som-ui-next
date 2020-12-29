import {
    VNode,
    inject,
    isVNode,
    provide,
    reactive,
    computed,
    onUnmounted,
    getCurrentInstance,
    VNodeNormalizedChildren,
    ComponentPublicInstance,
    ComponentInternalInstance
} from 'vue';

type ParentProvide<T> = T & {
    link(child: ComponentInternalInstance): void;
    unlink(child: ComponentInternalInstance): void;
    children: ComponentPublicInstance[];
    internalChildren: ComponentInternalInstance[];
};

export function useParent<T>(key: string | symbol) {
    const parent = inject<ParentProvide<T> | null>(key, null);

    if (parent) {
        const instance = getCurrentInstance();

        if (instance) {
            const {
                link, unlink, internalChildren, ...rest
            } = parent;

            link(instance);

            onUnmounted(() => {
                unlink(instance);
            });

            const index = computed(() => internalChildren.indexOf(instance));

            return {
                parent: rest,
                instance,
                index
            };
        }
    }

    return {};
}

export function flattenVNodes(children: VNodeNormalizedChildren) {
    const result: VNode[] = [];

    // eslint-disable-next-line no-shadow
    const traverse = (children: VNodeNormalizedChildren) => {
        if (Array.isArray(children)) {
            children.forEach((child) => {
                if (isVNode(child)) {
                    result.push(child);

                    if (child.component?.subTree) {
                        traverse(child.component.subTree.children);
                    }

                    if (child.children) {
                        traverse(child.children);
                    }
                }
            });
        }
    };

    traverse(children);

    return result;
}

// sort children instances by vnodes order
export function sortChildren(
    parent: ComponentInternalInstance,
    publicChildren: ComponentPublicInstance[],
    internalChildren: ComponentInternalInstance[]
) {
    const vnodes = flattenVNodes(parent.subTree.children);
    // eslint-disable-next-line no-shadow
    internalChildren.sort((a, b) => vnodes.indexOf(a.vnode) - vnodes.indexOf(b.vnode));

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const orderedPublicChildren = internalChildren.map(item => item.proxy!);

    publicChildren.sort((a, b) => {
        const indexA = orderedPublicChildren.indexOf(a);
        const indexB = orderedPublicChildren.indexOf(b);
        return indexA - indexB;
    });
}

export function useChildren(key: string | symbol) {
    const publicChildren: ComponentPublicInstance[] = reactive([]);
    const internalChildren: ComponentInternalInstance[] = reactive([]);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const parent = getCurrentInstance()!;

    const linkChildren = (value?: any) => {
        const link = (child: ComponentInternalInstance) => {
            if (child.proxy) {
                internalChildren.push(child);
                publicChildren.push(child.proxy);
                sortChildren(parent, publicChildren, internalChildren);
            }
        };

        const unlink = (child: ComponentInternalInstance) => {
            const index = internalChildren.indexOf(child);
            publicChildren.splice(index, 1);
            internalChildren.splice(index, 1);
        };

        provide(key, {
            link,
            unlink,
            children: publicChildren,
            internalChildren,
            ...value
        });
    };

    return {
        children: publicChildren,
        linkChildren
    };
}
