export const FilterItemName = 'SomFilterItem';

export type FilterItemOption = { key: string; value: any };
export interface FilterItemInfo {
    label: string;
    prop: string;
    multiple: boolean;
    options: FilterItemOption[];
}
export interface FilterItemGroupInfo {
    label: string;
    group: true;
    options: FilterItemInfo[];
}

export interface FilterItemMethods {
    getFilterInfo: () => FilterItemInfo | FilterItemGroupInfo;
}

export const FilterItemProps = {
    label: String, // 筛选项文字
    prop: String, // 筛选项值
    // Options = { key, value }[]
    // Info { label, prop, multiple, options: Options }
    // GroupInfo { label, group, options: Info }
    options: {
        // 筛选项选选项, 可以传键值对方式
        type: [Object, Array],
        default: () => [],
    },
    multiple: {
        // 是否多值筛选
        type: Boolean,
        default: false,
    },
    group: {
        // 是否多个分组
        type: Boolean,
        default: false,
    },
    full: {
        // 是否填充剩余高度
        type: Boolean,
        default: false,
    },
};