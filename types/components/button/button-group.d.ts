// ButtonGroup
import { SomComponent, CommonProps } from '../component';

export interface IButtonGroupProp {
    flexRank: 'two' | 'three';
}

export interface Props extends IButtonGroupProp, CommonProps {}

export declare class SomButtonGroup extends SomComponent {
    $props: Props
}

export default SomButtonGroup;
