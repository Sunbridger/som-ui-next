import { CSSProperties } from 'vue';

export type types = 'String' | 'Number' | 'Boolean' | 'Object' | 'Undefined' | 'Null' | 'Promise' | 'Function' | 'Date' | 'Array' | 'RegExp' | 'Error' | 'Symbol' | 'HTMLDocument' | 'global';

export const isType = (type: types) => (val: any): boolean => Object.prototype.toString.call(val) === `[object ${type}]`;

export const isString = (val: unknown): val is string => isType('String')(val);
export const isNumber = (val: unknown): val is number => isType('Number')(val);
export const isObject = (val: unknown): val is Record<any, any> => isType('Object')(val);
export const isFunction = (val: unknown): val is Function => isType('Function')(val);
export const isPromise = <T>(val: unknown): val is Promise<T> => isType('Promise')(val);

export function isArray<T>(val: unknown): val is Array<T> {
    return isType('Array')(val);
}

export function isDef<T>(val: T): val is NonNullable<T> {
    return val !== undefined && val !== null;
}

export function isNaN(val: number): val is typeof NaN {
    if (Number.isNaN) {
        return Number.isNaN(val);
    }
    // eslint-disable-next-line no-self-compare
    return val !== val;
}

export function isDate(val: Date): val is Date {
    return (
        Object.prototype.toString.call(val) === '[object Date]' &&
        // eslint-disable-next-line no-restricted-globals
        !isNaN(val.getTime())
    );
}

export const inBrowser: boolean = typeof window !== 'undefined';
export const isWindow = (val: unknown): val is Window => val === window;

export const cleanStyle = (styles: CSSProperties): CSSProperties => {
    for (const i in styles) {
        if (typeof styles[i] === 'undefined') {
            delete styles[i];
        }
    }
    return styles;
};
export const getParentProp = (self: any, name: string): unknown => {
    if (self.$parent && self.$parent[name]) {
        return self.$parent[name];
    }

    if (self.$parent && self.$parent.$parent && self.$parent.$parent[name]) {
        return self.$parent.$parent[name];
    }
};
// const flattenChildren = (children = [], filterEmpty = true) => {
//     const temp = Array.isArray(children) ? children : [children];
//     const res: any = [];
//     temp.forEach((child: any) => {
//         if (Array.isArray(child)) {
//             res.push(...flattenChildren(child, filterEmpty));
//         } else if (child && child.type === Fragment) {
//             res.push(...flattenChildren(child.children, filterEmpty));
//         } else if (child && isVNode(child)) {
//             if (filterEmpty && !isEmptyElement(child)) {
//                 res.push(child);
//             } else if (!filterEmpty) {
//                 res.push(child);
//             }
//         } else if (isValid(child)) {
//             res.push(child);
//         }
//     });
//     return res;
// };
// export const getSlot = (self: { type: any; children:
//  { [x: string]: (arg0: {}) => any; }; $slots: { [x: string]: (arg0: {}) => any; }; }, name = 'default', options = {}) => {
//     if (isVNode(self)) {
//         if (self.type === Fragment) {
//             return name === 'default' ? flattenChildren(self.children) : [];
//         } else if (self.children && self.children[name]) {
//             return flattenChildren(self.children[name](options));
//         } else {
//             return [];
//         }
//     } else {
//         let res = self.$slots[name] && self.$slots[name](options);
//         return flattenChildren(res);
//     }
// };

export const changePxToVw = (v?: number | string): undefined | string => {
    if (typeof v === 'undefined') {
        return undefined;
    }
    let value: string | number = '';
    if (typeof v === 'string') {
        if (!v) {
            return undefined;
        }
        // 如果是px则，切字符串
        const index = v.indexOf('px');
        if (index > -1) {
            value = v.split('px')[0];
        } else if (v) {
            value = v;
        }
    } else {
        value = v;
    }

    value = Math.round((+value / 3.75) * 1000) / 1000;

    return `${value}vw`;
};

// 属性路径转化为数组
export const getPropsArr = (path: string): string[] =>
    path
        .replace(/\[(\w+)\]/g, '.$1')
        .replace(/^\./, '')
        .split('.');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const noop = (..._args: any[]): void => {
    // do nothing
};

export function isIOS(): boolean {
    return inBrowser ? /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()) : false;
}

export function asserts(condition, msg = ''): asserts condition {
    if (!condition) {
        throw new Error(`条件不成立: ${msg}`);
    }
}


export default {
    isType,
    inBrowser,
    isString,
    isNumber,
    isObject,
    isFunction,
    isArray,
    cleanStyle,
    getParentProp,
    changePxToVw,
    asserts
};
