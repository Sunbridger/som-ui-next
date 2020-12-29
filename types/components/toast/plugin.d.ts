export interface IPluginComponentInstance<T> {
    id: string | number;
    /**
     * @description open实例
     */
    open(props: T): void;
    /**
     * @description 修改options的内容
     * @param toastOptions toast的options
     */
    changeProps(option: T): void;

    /**
     * @description 关闭当前toast实例
     */
    hide(): void;

    /**
     * @description 销毁，同destroy
     */
    unmount(): void;
}
export interface ISimpleCustomPropOption {
    show: boolean;
    onShow?: Function;
    onHide?: Function;
}
