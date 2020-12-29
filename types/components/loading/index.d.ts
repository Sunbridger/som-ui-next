// Loading
import { SomComponent, CommonProps } from '../component';

export interface ILoadingProps {
    show?: boolean;
    type?: string;
    showMask?: boolean;
    text?: string;
    svg?: string;
    fullScreen?: boolean;
}

export interface Props extends ILoadingProps, CommonProps { }

export declare class Loading extends SomComponent {
    $props: Props;
}

export default Loading;
