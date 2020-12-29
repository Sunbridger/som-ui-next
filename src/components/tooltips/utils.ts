import { computed, reactive } from 'vue';
import { ITooltipsProps, PlacementType } from 'types/components/tooltips';

// 得到箭头图标对应的class
export const arrowIconClass = (props: ITooltipsProps) =>
    computed(() => ({
        'som-tooltips-arrow': true,
        'som-tooltips-arrow-up-start': props.placement === 'bottom-start',
        'som-tooltips-arrow-up-center': props.placement === 'bottom',
        'som-tooltips-arrow-up-end': props.placement === 'bottom-end',
        'som-tooltips-arrow-right': props.placement === 'left',
        'som-tooltips-arrow-left': props.placement === 'right',
        'som-tooltips-arrow-down-start': props.placement === 'top-start',
        'som-tooltips-arrow-down-center': props.placement === 'top',
        'som-tooltips-arrow-down-end': props.placement === 'top-end',
    }));

interface IOffset {
    offsetLeft: number;
    offsetTop: number;
    offsetHeight: number;
    offsetWidth: number;
}

// 计算提示框具体的位置
export const calcPosition = (placement: PlacementType, gutter: number, domOffset: IOffset, tipsOffset: IOffset) =>
    computed(() => {
        const position = reactive({
            left: 0,
            top: 0,
        });
        switch (placement) {
            case 'top-start':
                position.left = domOffset.offsetLeft;
                position.top = domOffset.offsetTop - tipsOffset.offsetHeight - gutter;
                break;
            case 'top-end':
                position.left = domOffset.offsetLeft + domOffset.offsetWidth - tipsOffset.offsetWidth;
                position.top = domOffset.offsetTop - tipsOffset.offsetHeight - gutter;
                break;
            case 'top':
                // eslint-disable-next-line no-mixed-operators
                position.left = domOffset.offsetLeft + domOffset.offsetWidth / 2 - tipsOffset.offsetWidth / 2;
                position.top = domOffset.offsetTop - tipsOffset.offsetHeight - gutter;
                break;
            case 'left':
                position.left = domOffset.offsetLeft - tipsOffset.offsetWidth - gutter;
                position.top = domOffset.offsetTop + domOffset.offsetHeight / 2 - tipsOffset.offsetHeight / 2; //eslint-disable-line
                break;
            case 'right':
                position.left = domOffset.offsetLeft + domOffset.offsetWidth + gutter;
                position.top = domOffset.offsetTop + domOffset.offsetHeight / 2 - tipsOffset.offsetHeight / 2; //eslint-disable-line
                break;
            case 'bottom-start':
                position.left = domOffset.offsetLeft;
                position.top = domOffset.offsetTop + domOffset.offsetHeight + gutter;
                break;
            case 'bottom-end':
                position.left = domOffset.offsetLeft + domOffset.offsetWidth - tipsOffset.offsetWidth;
                position.top = domOffset.offsetTop + domOffset.offsetHeight + gutter;
                break;
            case 'bottom':
                position.left = domOffset.offsetLeft + (domOffset.offsetWidth - tipsOffset.offsetWidth) / 2; //eslint-disable-line
                position.top = domOffset.offsetTop + domOffset.offsetHeight + gutter;
                break;
            default:
                console.warn('Wrong placement prop');
        }

        return position;
    });

export default {
    arrowIconClass,
    calcPosition,
};
