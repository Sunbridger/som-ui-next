import { IConfigData } from 'types/common/const';
import { IModalProps } from 'types/components/modal';
import { IToastOptions } from 'types/components/toast';
import { reactive } from 'vue';

export const iconCdnHost = 'https://img-icon.souche.com';

export const toastPluginDefalutOptions: IToastOptions = {
    isMultiple: false,
    type: 'text',
    position: 'default',
    time: 2000,
    transition: 'som-fade',
    showMask: true,
    isTransparent: true,
    maskZIndex: 1010,
    icon: undefined,
};

export const modalPluginDefalutOptions: IModalProps = {
    isMultiple: false,
    maskZIndex: 1000,
    maskClass: '',
    lockScroll: true,
    isTransparent: false,
    hideOnBlur: true,
    content: '',
    isConfirm: true,
    confirmLoading: true,
    confirmText: '确认',
    cancelText: '取消',
};

const confiData: IConfigData = {
    theme: 'default',
    needChangeToVw: false,
    toastPluginDefalutOptions,
    modalPluginDefalutOptions,
};

export default reactive(confiData);
