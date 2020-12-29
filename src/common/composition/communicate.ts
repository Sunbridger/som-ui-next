import { ref, getCurrentInstance, ComponentInternalInstance, computed, inject, onUnmounted, provide } from 'vue';
import mountProps from './mountProps';
import { ComponentInternalInstanceExt } from '../types';

// 设置父组件实例
export function provideParent(instanceName: string) {
    const vm = getCurrentInstance();
    provide(`${instanceName}-internal`, vm);
    provide(`${instanceName}-public`, vm?.proxy);
}

// 获取父组件实例
export function injectParent<T extends Record<string, any>>(parentInstanceName: string) {
    const internalParent = inject(`${parentInstanceName}-internal`, null) as ComponentInternalInstanceExt<T> | null;
    const publicParent = inject(`${parentInstanceName}-public`, null) as ComponentInternalInstanceExt<T>['proxy'] | null;
    return {
        internalParent,
        publicParent
    };
}

/**
 * @desc 父组件收集子组件
 */
export interface CollectChildrenMethods {
    addChild: <T extends ComponentInternalInstance>(child: T) => void;
    rmChild: <T extends ComponentInternalInstance>(child: T) => void;
}
export function collectChildren<T extends Record<string, any>>() {
    const internalChildren = ref<ComponentInternalInstanceExt<T>[]>([]);
    const publicChildren = computed(() => internalChildren.value.map(i => i.proxy));

    function addChild(child) {
        !internalChildren.value.includes(child) && internalChildren.value.push(child);
    }
    function rmChild(child) {
        const idx = internalChildren.value.indexOf(child);
        idx > -1 && internalChildren.value.splice(idx, 1);
    }

    mountProps({
        addChild,
        rmChild
    });

    return {
        internalChildren,
        publicChildren
    };
}

// 子组件向上加入父组件
export function joinChild(parentVmName: string) {
    const vm = getCurrentInstance();
    const { publicParent } = injectParent<CollectChildrenMethods>(parentVmName);

    if (publicParent) {
        vm && publicParent.addChild(vm);
        onUnmounted(() => {
            vm && publicParent.rmChild(vm);
        });
    }
}

// 父子组件相同属性优先获取
export function comProps(preProps, secProps) {
    return (prop: string, defaultValue?: any, by?: Function) =>
        computed(() => {
            if (by) {
                return by(preProps?.[prop]) ?
                    preProps?.[prop] :
                    by(secProps?.[prop]) ?
                        secProps?.[prop] :
                        defaultValue;
            } else {
                return preProps?.[prop] || secProps?.[prop] || defaultValue;
            }
        });
}
