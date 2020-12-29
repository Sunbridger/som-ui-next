// Calendar
import { App, HTMLAttributes } from 'vue';

export declare class SomComponent {
    static install(app: App): void;
}

export type CommonProps = HTMLAttributes

export interface ICalendarProps {

}

export interface Props extends ICalendarProps, CommonProps {}

export declare class Calendar extends SomComponent {
    $props: Props;
}

export default Calendar;
