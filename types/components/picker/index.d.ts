// Picker
import { SomComponent, CommonProps } from '../component';


export interface IColumnObject {
    values?: string[] | IColumnObject[];
    defaultIndex?: number;
    children?: IColumnObject[];
    className?: string;
}

export type ColumnsType = IColumnObject[] | string[];

export interface IPickerProps {
    title?: string;
    loading?: boolean;
    itemHeight?: number;
    showToolbar?: boolean;
    visibleItemCount: number | string;
    cancelText?: string;
    confirmText?: string;
    swipeDuration: string | number;
    valueKey: string;
    columns: ColumnsType;
}

export interface Props extends IPickerProps, CommonProps { }

export declare class Picker extends SomComponent {
    $props: Props;

    getValues<T = string>(): T[];

    setValues<T = string>(values: T[]): void;

    getIndexes(): number[];

    setIndexes(indexes: number[]): void;

    getColumnValue<T = string>(columnIndex: number): T;

    setColumnValue<T = string>(columnIndex: number, value: T): void;

    getColumnIndex(columnIndex: number): number;

    setColumnIndex(columnIndex: number, optionIndex: number): void;

    getColumnValues<T = string>(columnIndex: number): T[];

    setColumnValues<T = string>(columnIndex: number, values: T[]): void;

    confirm(): void;
}

export default Picker;
