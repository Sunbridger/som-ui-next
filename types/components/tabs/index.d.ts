// Tabs
import { SomComponent, CommonProps } from '../component';

export interface ITabsProps {
    vertical?: boolean;
    activeColor?: string;
    defaultColor?: string;
    disabledColor?: string;
    lineColor?: string;
    hasLine?: boolean;
    isSameAway?: boolean;
    animate?: boolean;
    preventDefault?: boolean;
    onIndexChange?: (val: number, oldVal?: number) => {};
    onBeforeIndexChange?: (index: number) => {};
}
export interface ITabProps {
    disabled?: boolean;
    activeClass?: string;
    onItemClick?: (index: number) => {};
}

export interface Props extends ITabsProps, CommonProps { }

export declare class Tabs extends SomComponent {
    $props: Props;
}

export default Tabs;
