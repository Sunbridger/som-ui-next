// NoticeBar
import { SomComponent, CommonProps } from '../component';

export type NoticeBarType = 'info' | 'warn' | 'success';
export type NoticeBarMode = | 'link';

export interface INoticeBarProps {
    /**
     * 提示类型
     * @type NoticeBarType
     * @default 'info'
     */
    type?: NoticeBarType

    /**
     * 模式
     * @type NoticeBarMode
     */
    mode?: NoticeBarMode

    /**
     * 是否显示关闭
     * @type boolean
     */
    closable?: boolean

    /**
     * icon图标
     * @type string
     */
    icon?: string

    /**
     * 跑马灯参数
     * @type object
     */
    marquee?: object

    /**
     * 是否显示半圆角
     * @type boolean
     * @default true
     */
    halfRadius?: boolean

}

export interface Props extends INoticeBarProps, CommonProps {}

export declare class NoticeBar extends SomComponent {
    $props: Props;
}

export default NoticeBar;
