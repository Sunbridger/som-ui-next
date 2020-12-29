// Form
import { SomComponent, CommonProps } from '../component';

export interface IFormProps {
    model: Record<string, any>;
}

export interface Props extends IFormProps, CommonProps {}

export declare class Form extends SomComponent {
    $props: Props;
    submit: () => void;
    validate: (cb?: Function, trigger?: ItemOrArray<FormValidateTrigger>) => Promise<any[]>;
    validateField: (ps: string[], cb, trigger: ItemOrArray<FormValidateTrigger>) => Promise<any[]>;
    resetFields: () => void;
}

export default Form;
