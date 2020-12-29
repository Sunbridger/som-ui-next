// Dialog
import { CSSProperties } from 'vue';
import { SomComponent, CommonProps } from '../component';
import { IPopupPropsWrapper } from '../popup';

export type DialogPositionTypes = | 'inside' | 'outside';

export interface IDialogProps extends IPopupPropsWrapper{

    width?: string;

    height?: string;

    isCancel?: boolean;

    closeBtnPosition?: DialogPositionTypes;

    closeIcon?: string;

    onClose?: Function;

    onShow?: Function;
}

export interface Props extends IDialogProps, CommonProps {}

export declare class Dialog extends SomComponent {
    $props: Props;
}

export default Dialog;
