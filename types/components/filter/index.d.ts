// Filter
import { SomComponent, CommonProps } from '../component';

export interface IFilterProps {
    [key: string]: any;
}

export interface Props extends IFilterProps, CommonProps { }

export declare class Filter extends SomComponent {
    $props: Props;
    closeMask: () => void;
}

export default Filter;
