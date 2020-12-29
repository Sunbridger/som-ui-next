// ScrollRefresh
import { SomComponent, CommonProps } from '../component';

export type PullRefreshStatus = 'normal' | 'loading' | 'loosing' | 'pulling' | 'success';

export type PullUpTyp = (parmas: { loaded: Function; completed: Function }) => {};

export type PullDownType = (parmas: { refreshed: Function }) => {};

export interface IScrollRefreshProps {
    /**
     * @description 下拉触发 pullDown 方法的阈值，即距离顶部的滚动距离，超过该距离时，手指离开触摸屏则下拉刷新，单位默认为 px
     * @type number/string
     * @default 72
     */
    offsetH?: number;
    /**
     * @description 上拉触发 pullUp 方法的阈值，即剩余滚动内容的长度，单位为px
     * @type number/string
     * @default 50
     */
    bottomDistance?: number;

    /**
     * @description 下拉的最大距离， 达到之后不能继续往下拉
     * @type number/string
     * @default 120
     */
    maxPullDown?: number;

    /**
     * @description 下拉加载方法，达到下拉阈值即会触发
     * @type function
     */
    pullDown?: PullDownType;

    /**
     * @description 上拉加载方法，达到上拉阈值时即会触发
     * @type function
     */
    pullUp?: PullUpTyp;

    /**
     * @description 是否允许显示返回顶部按钮（超出两屏时显示出来）
     * @type boolean
     * @default false
     */
    showBackTop?: boolean;

    /**
     * @description 是否阻止初始化自动调用下拉加载方法
     * @type boolean
     * @default false
     */
    preventDefault?: boolean;

    /**
     * @description 是否阻止下拉加载方法
     * @type boolean
     * @default false
     */
    disabled?: boolean;
    successTime?: number;
    successPullDownText?: string;
    pullingPullDownText?: string;
    loosingPullDownText?: string;
    loadingPullDownText?: string;
    loadingPullUpText?: string;
    noMoreText?: string;
}

export interface Props extends IScrollRefreshProps, CommonProps {}

export declare class ScrollRefresh extends SomComponent {
    $props: Props;
    resetLoadMore: () => {};
}

export default ScrollRefresh;
