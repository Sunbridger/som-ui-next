import { reactive, nextTick, watch } from 'vue';
import { IPopupShowMixnis, IWrapperStateReturn } from 'types/common/composition';
import { IPopupPropsWrapper } from 'types/components/popup';
import { ISimpleCustomPropOption } from 'types/components/toast/plugin';
/**
 * @description 封装对弹窗类组件显示的控制
 * @returns IWrapperStateReturn<T>
 *
 */
export function useShowWrappState<T>(): IWrapperStateReturn<T> {
    // 定义popup的显示变量
    const state = reactive({
        show: false,
    } as T & ISimpleCustomPropOption);

    // 修改props的方法
    const changeProps = (props: T) => {
        Object.assign(state, props);
    };

    // 修改show的值, 同时触发事件监听
    const toggle = (show: boolean) => {
        state.show = show;
        if (show) {
            state.onShow && state.onShow();
        } else {
            state.onHide && state.onHide();
        }
    };

    // 开弹窗
    const open = (props: T) => {
        changeProps(props);
        nextTick(() => {
            toggle(true);
        });
    };

    // 关弹窗
    const close = () => {
        toggle(false);
    };

    return {
        open,
        close,
        state,
        toggle,
        changeProps,
    };
}

/**
 * @description 封装对Popup组件的操作
 *
 */
export function useShowPopupMinixState<T extends IPopupPropsWrapper, E>(props: T, emit: Function, customShowFunc?: Function): IPopupShowMixnis {
    // 定义popup的显示变量
    const state = reactive({
        showPopup: false,
    });
    // 监听show，覆盖popup的显示
    watch(
        () => props.show,
        val => {
            state.showPopup = !!val;
        },
        // {
        //     immediate: true,
        // },
    );

    // 监听popup的显示，修改show并且抛出事件
    watch(
        () => state.showPopup,
        val => {
            if (customShowFunc) {
                customShowFunc(val);
            } else {
                emit('update:show', val);
                if (val) {
                    emit('show');
                } else {
                    emit('hide');
                }
            }
        },
    );

    // 关闭弹窗
    const closeDialog = () => {
        state.showPopup = false;
    };

    // 点击蒙层
    const clickMask = () => {
        emit('click-mask');
        props.hideOnBlur && closeDialog();
    };

    // 点击关闭按钮
    const clickClose = () => {
        emit('close');
        closeDialog();
    };

    return {
        state,
        closeDialog,
        clickMask,
        clickClose,
    };
}

export default {
    useShowWrappState,
    useShowPopupMinixState,
};
