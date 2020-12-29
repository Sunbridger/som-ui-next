import { isNaN } from '@/common/utils';

import { pickerProps } from '../../components/picker/shared';

export const sharedProps = {
    ...pickerProps,
    filter: Function,
    modelValue: null,
    columnsOrder: Array,
    formatter: {
        type: Function,
        default: (type: string, value: unknown) => value
    }
};

/**
 * @description 迭代计算范围内数据
 * @param n 范围长度
 * @param iteratee 迭代函数
 * @returns Array 迭代数据
 */
export function times(n: number, iteratee: (index: number) => any[]) {
    let index = -1;
    const result = Array(n);
    // eslint-disable-next-line no-plusplus
    while (++index < n) {
        result[index] = iteratee(index);
    }

    return result;
}

/**
 * @description 获取十进制number
 * @param value  string | undefined
 * @returns number 默认0
 */
export function getTrueValue(value: string | undefined): number {
    if (!value) {
        return 0;
    }

    while (isNaN(parseInt(value, 10))) {
        if (value.length > 1) {
            value = value.slice(1);
        } else {
            return 0;
        }
    }

    return parseInt(value, 10);
}

/**
 * @description 获取月最后一天
 * @param year  number 年
 * @param month  number 月
 * @returns number 月的最后一天
 */
export function getMonthEndDay(year: number, month: number): number {
    return 32 - new Date(year, month - 1, 32).getDate();
}

/**
 * @description 数字补全0
 * @param num number | string 数据
 * @param targetLength number 目标长度 默认 2
 * @returns string 补全后数据
 */
export function padZero(num: number | string, targetLength = 2): string {
    let str = `${num}`;

    while (str.length < targetLength) {
        str = `0${str}`;
    }

    return str;
}
