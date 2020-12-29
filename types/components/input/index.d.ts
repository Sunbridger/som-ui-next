// Input
import { SomComponent, CommonProps } from '../component';

export interface IInputProps {
    [key: string]: any;
}

export interface Props extends IInputProps, CommonProps { }

export declare class Input extends SomComponent {
    $props: Props;
    focus: () => void;
    blur: () => void;
    select: () => void;
}

export default Input;
