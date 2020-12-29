// Progress
import { SomComponent, CommonProps } from '../component';

export interface ITicksType {
    percent: number;
    text: string;
}
// export interface IProgressProps {

// }

export type Props = CommonProps

export declare class Progress extends SomComponent {
    $props: Props;
}

export default Progress;
