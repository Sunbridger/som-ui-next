import { Prop, ComponentObjectPropsOptions } from 'vue';
import { isObject, isArray } from '@souche-vue3/souche-util-vue';

// todo: emmmmm 这类型判断待改善
export function pickProps<Props extends ComponentObjectPropsOptions, T extends Array<keyof Props | [keyof Props, Prop<any>]>>(props: Props, arr: T) {
    type StringList = Extract<keyof Props, T[number]>;
    type ArrayList = Exclude<T[number], StringList>;
    return arr.reduce((result, p) => {
        if (typeof p === 'string') {
            result[p] = props[p];
        } else if (isArray(p)) {
            const opts = p[1];
            p = p[0];
            const propOptions = props[p as keyof Props];
            result[p as string] = isObject(propOptions) ? Object.assign({}, propOptions, opts) : { type: propOptions, ...opts };
        }
        return result;
        // @ts-ignore
    }, {} as Pick<Props, StringList | ArrayList[0]>);
}
// const a = getProps<IStepProps ,IStepsProps>(props, parentProps, 'activeColor');
export function getProps<T1, T2>(
    props: T1,
    parentProps: T2,
    key: Extract<keyof T1, keyof T2>
): T1[Extract<keyof T1, keyof T2>] | T2[Extract<keyof T1, keyof T2>] {
    return props[key] || parentProps[key];
}

export function getPropsCommon<T>(props: T, parentProps: T, key: keyof T) {
    return props[key] || parentProps[key];
}
