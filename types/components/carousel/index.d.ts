// Carousel
import { SomComponent, CommonProps } from '../component';

export type DirectionType =
    | 'horizontal' | 'vertical';
export type DotsPositionType =
    | 'left' | 'center' | 'right';

export interface ICarouselProps {
    /**
     * 图片列表
     * @default []
     * @type array
     */
    list?: Array<string>

    /**
     * 轮播方向
     * @default horizontal
     * @type DirectionType
     */
    direction?: DirectionType

    /**
     * 是否显示指示点
     * @default true
     * @type boolean
     */
    showDots?: boolean

    /**
     * 指示点的位置
     * @default center
     * @type DotsPositionType
     */
    dotsPosition?: DotsPositionType

    /**
     * 指示点className
     * @type string
     */
    dotsClass?: string

    /**
     * 是否自动轮播
     * @default false
     * @type boolean
     */
    auto?: boolean

    /**
     * 是否循环播放
     * @default false
     * @type boolean
     */
    loop?: boolean

    /**
     * 轮播停留时长(毫秒)
     * @default 3000
     * @type number
     */
    interval?: number

    /**
     * 切换动画时间(毫秒)
     * @default 300
     * @type number
     */
    duration?: number

    /**
     * 高度，如果为100%宽度并且知道宽比，可以设置aspect-ratio 自动计算高度
     * @default 180px
     * @type string
     */
    height?: string

    /**
     * index绑定，可以初始化显示的index
     * @default 0
     * @type number
     */
    value?: number

}

export interface Props extends ICarouselProps, CommonProps {}

export declare class Carousel extends SomComponent {
    $props: Props;
}

export default Carousel;
