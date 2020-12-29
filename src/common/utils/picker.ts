import { isObject, isString } from '@souche-vue3/souche-util-vue';
import { ColumnsType, IColumnObject, IPickerProps } from 'types/components/picker';
import { ComponentPublicInstance, ComputedRef } from 'vue';


/**
 * @description 得到列属性类型，对象，级联，文本
 * @param columns props的列属性
 * @returns 'cascade' | 'object' | 'text'
 */
export const getColumnDataType = (columns: ColumnsType): 'cascade' | 'object' | 'text' => {
    const firstColumn = columns[0] || {};

    // todo ts不知道怎么写
    if (isString(firstColumn)) {
        return 'text';
    } else if (firstColumn.children) {
        return 'cascade';
    } else if (firstColumn.values) {
        return 'object';
    }
    return 'text';
};

/**
 * @description 封装对级联数据的格式化
 * @param columnsProp props中的columns属性
 * @returns {formatCascadeTypeColumns, updateFormatCascadeTypeColumns}
 */
export const useformatCascadeTypeColumnsUtil = (columnsProp: IColumnObject[]) => {
    // 格式化 级联数据
    const formatCascadeTypeColumns = () => {
        const arr: object[] = [];
        if (columnsProp.length === 0 || isString(columnsProp[0])) {
            return columnsProp;
        }
        let cursor: IColumnObject = { children: columnsProp };
        while (cursor && cursor.children) {
            const childs = cursor.children;
            const defaultIndex = 0;
            // 加入到第一列
            arr.push({
                values: cursor.children,
                defaultIndex,
            });
            // 第二列的数据，以第一列的数据中的`defaultIndex`对应的children来充当
            cursor = childs[defaultIndex];
        }
        return arr;
    };

    // 修改data
    const updateFormatCascadeTypeColumns = (index: number, columnIndex: number, columnsData: IColumnObject[]) => {
        let cursor: IColumnObject = { children: columnsProp };
        let i = 0;
        while (cursor && cursor.children) {
            const childs = cursor.children;
            const defaultIndex = 0;
            if (i > columnIndex) {
                columnsData[i] = {
                    // todo 调试
                    values: cursor.children,
                    // children: cursor.children,
                    defaultIndex,
                };
            }
            if (i === columnIndex) {
                columnsData[i].defaultIndex = index;
            }
            const f: number = i === columnIndex ? index : columnsData[i].defaultIndex || 0;
            cursor = childs[f];
            i++;
        }
    };

    return {
        formatCascadeTypeColumns,
        updateFormatCascadeTypeColumns,
    };
};

/**
 * @description 封装对picker columns的操作
 * @param children 所有columns的实例
 * @param columns props中的columns属性
 * @param dataType columns的数据结构类型
 */
export const useColumnsUtils = (children: ComponentPublicInstance[], props: IPickerProps, dataType: ComputedRef<'object' | 'cascade' | 'text'>) => {
    const { columns } = props;

    // get column instance by index
    const getColumn = (index: number) => children[index];

    // set options of column by index
    const setColumnValues = (index, options) => {
        const column: any = children[index];
        if (column) {
            column.setOptions(options);
        }
    };
    // get options of column by index
    const getColumnValues = (index: number) => {
        // TODO: 待优化
        const childColumn: any = children[index] || {};
        return childColumn.state.options;
    };

    // get column value by index
    const getColumnValue = index => {
        const column: any = getColumn(index);
        return column && column.getValue();
    };
    // set column value by index
    const setColumnValue = (index, value) => {
        const column: any = getColumn(index);
        if (column) {
            column.setValue(value);
            // 级联环境下的设置需要解数据结构
            if (dataType.value === 'cascade') {
                // eslint-disable-next-line @typescript-eslint/no-use-before-define
                onCascadeChange(index);
            }
        }
    };
    // get column option index by column index
    const getColumnIndex = (index: number) => {
        const childColumn: any = getColumn(index) || {};
        return childColumn.state.index;
    };

    // set column option index by column index
    const setColumnIndex = (columnIndex, optionIndex) => {
        const column: any = getColumn(columnIndex);

        if (column) {
            column.setIndex(optionIndex);
            if (dataType.value === 'cascade') {
                // eslint-disable-next-line @typescript-eslint/no-use-before-define
                onCascadeChange(columnIndex);
            }
        }
    };

    const getValues = () => children.map((child: any) => child.getValue());
    const setValues = values => {
        values.forEach((value, index) => {
            setColumnValue(index, value);
        });
    };

    // get indexes of all columns
    const getIndexes = () => children.map((child: any) => child.state.index);
    // set indexes of all columns
    const setIndexes = indexes => {
        indexes.forEach((optionIndex, columnIndex) => {
            setColumnIndex(columnIndex, optionIndex);
        });
    };
    // 级联变化数据时需要循环的向下设置数据
    const onCascadeChange = columnIndex => {
        let cursor: IColumnObject = { children: columns as IColumnObject[] };
        const indexes = getIndexes();

        for (let i = 0; i <= columnIndex; i++) {
            cursor = cursor.children?.[indexes[i]] || {};
        }

        while (cursor && cursor.children) {
            columnIndex++; // eslint-disable-line
            setColumnValues(columnIndex, cursor.children);
            cursor = cursor.children[cursor.defaultIndex || 0];
        }
    };

    return {
        getColumn,
        setColumnValues,
        getColumnValues,
        setColumnValue,
        getColumnValue,
        setColumnIndex,
        getColumnIndex,
        setValues,
        getValues,
        setIndexes,
        getIndexes,
    };
};

export function getElementTranslateY(element: any) {
    const style = window.getComputedStyle(element);
    const transform = style.transform || style.webkitTransform;
    const translateY = transform.slice(7, transform.length - 1).split(', ')[5];

    return Number(translateY);
}

export function isOptionDisabled(option: any) {
    return isObject(option) && option.disabled;
}
export function range(num: number, min: number, max: number): number {
    return Math.min(Math.max(num, min), max);
}
