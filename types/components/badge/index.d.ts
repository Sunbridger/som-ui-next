// Badge
import { SomComponent, CommonProps } from '../component';

export interface IBadgeProps {
    /**
     * 显示的文字
     * @type [string, number]
     */
    text?: [string, number]
    /**
     * 自定义样式
     * @type object
     */
    badgeStyle?: object

    /**
     * 是否是小圆点
     * @type boolean
     */
    dot?: boolean

}

export interface Props extends IBadgeProps, CommonProps {}

export declare class Badge extends SomComponent {
    $props: Props;
}

export default Badge;
