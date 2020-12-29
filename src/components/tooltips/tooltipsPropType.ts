import { EffectType, PlacementType } from 'types/components/tooltips';
import { PropType } from 'vue';

export const TooltipsProps = {
    show: {
        type: Boolean,
        default: false,
    },
    effect: {
        type: String as PropType<EffectType>,
        default: 'light',
    },
    placement: {
        type: String as PropType<PlacementType>,
        default: 'top',
    },
    gutter: {
        type: Number,
        default: 8,
    },
    hideOnBlur: {
        type: Boolean,
        default: false,
    },
    isTrigger: {
        type: Boolean,
        default: true,
    },
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    tipsClass: {
        type: String,
    },
    closable: {
        type: Boolean,
        default: true,
    },
};

export default TooltipsProps;
