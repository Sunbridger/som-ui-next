// Tag
import { SomComponent, CommonProps } from '../component';

export type TagType =
    | 'primary' | 'selected' | 'disable';

export type TagSize =
    | 'nomal' | 'medium' | 'small' | 'mini' | 'smini';

export interface ITagProps {
    /**
     * 标签类型
     * @default primary
     * @type TagType
     */
    type?: TagType

    /**
     * 标签尺寸
     * @default nomal
     * @type TagSize
     */
    size?: TagSize

    /**
     * 标签背景是否填充
     * @default true
     * @type boolean
     */
    filled?: boolean

    /**
     * 标签背景色
     * @type string
     */
    bgColor?: string

    /**
     * 标签字体颜色
     * @type string
     */
    color?: string

    /**
     * 标签边框色
     * @type string
     */
    borderColor?: string

    /**
     * 是否是半圆角
     * @type boolean
     * @default false
     */
    halfRadius?: boolean

    /**
     * 是否可关闭
     * @type boolean
     * @default false
     */
    closable?: boolean

    /**
     * 图标
     * @type string
     */
    icon?: string

}

export interface Props extends ITagProps, CommonProps {}

export declare class Tag extends SomComponent {
    $props: Props;
}

export default Tag;
