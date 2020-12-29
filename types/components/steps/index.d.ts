// Steps
import { SomComponent, CommonProps } from '../component';

export type StatusType = 'wait' | 'active' | 'done';
export type DirectionType = 'horizontal' | 'vertical';

export interface ICommonProps {
    /**
     * @description 激活状态的颜色
     * @type stirng
     * @default
     */
    activeColor?: stirng;
    /**
     * @description 未激活状态的颜色
     * @type stirng
     * @default
     */
    inActiveColor?: stirng;
    /**
     * @description 节点标题一行最大字数
     * @type number
     * @default 4
     */
    titleLength?: number;
    /**
     * @description 节点标题一行最大字数
     * @type number
     * @default '60px'
     */
    itemLength?: string;
}


export interface IStepProps extends ICommonProps {
    /**
     * @description 标题
     * @type string
     * @default
     */
    title?: stirng;
    /**
     * @description 描述
     * @type string
     * @default
     */
    description?: stirng;
    /**
     * @description 圆内置文字
     * @type string
     * @default
     */
    state?: stirng;
    /**
     * @description 节点当前状态 'wait' | 'active' | 'done' | 'error'
     * @type statusType
     * @default
     */
    status?: StatusType;
}

export interface IStepsProps extends ICommonProps {
    /**
     * @description 当前步骤，FlowItem的status优先
     * @type string
     * @default 0
     */
    active?: number;
    /**
     * @description step 方向 horizontal/vertical
     * @type DirectionType
     * @default 'horizontal'
     */
    direction?: DirectionType;
    /**
     * @description 节点是否平均分配宽度
     * @type boolean
     * @default false
     */
    flexable?: boolean;
    /**
     * @description step点击事件
     * @type Function
     * @default
     */
    clickStep?: (key: number) => {};

    $step?: IStepProps;
}

export interface Props extends IStepsProps, CommonProps { }

export declare class Steps extends SomComponent {
    $props: Props;
}

export default Steps;
