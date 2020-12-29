// FormItem
import { SomComponent, CommonProps } from '../component';

export interface IFormItemProps {
    [key: string]: any;
}

export interface Props extends IFormItemProps, CommonProps { }

export declare class FormItem extends SomComponent {
    $props: Props;
    validate: (cb: Function, trigger: ItemOrArray<FormValidateTrigger>) => Promise<any>;
    onFieldChange: () => void;
    onFieldBlur: () => void;
    resetFiled: () => void;
}

export default FormItem;
