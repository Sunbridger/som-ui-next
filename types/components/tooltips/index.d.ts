// Tooltips
import { SomComponent, CommonProps } from '../component';

export type EffectType = 'light' | 'dark' | 'active';

export type PlacementType = 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'right';

export interface ITooltipsProps {
    /**
     * @description 是否显示
     * @type boolean
     */
    show: boolean;

    /**
     * @description 主题颜色
     * @type EffectType
     */
    effect: EffectType;

    /**
     * @description tips 的出现位置
     * @type PlacementType
     */
    placement: PlacementType;

    /**
     * @description 箭头和触发元素之间的距离
     * @type number
     */
    gutter: number;

    /**
     * @description 点击外部是否关闭
     * @type boolean
     */
    hideOnBlur?: boolean;

    /**
     * @description 触发元素是否设置开关
     * @type boolean
     */
    isTrigger?: boolean;

    /**
     * @description 标题
     * @type string
     */
    title?: string;

    /**
     * @description 内容
     * @type string
     */
    content?: string;

    /**
     * @description 气泡的样式类， 通过添加类名，可以自定义气泡样式
     * @type string
     */
    tipsClass?: string;

    /**
     * @description 是否显示关闭按钮
     * @type boolean
     */
    closable?: boolean
}

export interface Props extends ITooltipsProps, CommonProps {}

export declare class Tooltips extends SomComponent {
    $props: Props;
}

export default Tooltips;
