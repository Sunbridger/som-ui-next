import { IToastOptions } from '../../components/toast';
import { IModalProps } from '../../components/modal';

export class IConfigData {
    theme: string;
    needChangeToVw: boolean;
    toastPluginDefalutOptions: IToastOptions;
    modalPluginDefalutOptions: IModalProps;
}

export default IConfigData;
