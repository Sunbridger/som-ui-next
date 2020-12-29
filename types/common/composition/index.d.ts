export interface IWrapperStateReturn<T> {
    open(props: T): void;
    close(): void;
    state: {
        show: boolean;
        [key: string]: any;
    };
    toggle(show: boolean): void;
    changeProps(props: T): void;
}

export interface IPopupShowMixnis {
    state: {
        showPopup: boolean;
    };
    closeDialog(): void;
    clickMask(): void;
    clickClose(): void;
}
