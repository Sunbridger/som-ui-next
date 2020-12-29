import { DirectionType, StatusType } from 'types/components/steps';
import { PropType } from 'vue';

const commonProps = {
    activeColor: {
        type: String
    },
    inActiveColor: {
        type: String
    },
    titleLength: {
        type: Number
    },
    itemLength: {
        type: String
    }
};

export const StepProps = Object.assign({}, commonProps, {
    title: {
        type: String
    },
    description: {
        type: String
    },
    state: {
        type: String
    },
    status: {
        type: String as PropType<StatusType>
    }
});

export const StepsProps = Object.assign({}, commonProps, {
    active: {
        type: Number,
        default: 0
    },
    direction: {
        type: String as PropType<DirectionType>,
        default: 'horizontal'
    },
    flexable: {
        type: Boolean,
        default: false
    },
    activeColor: {
        type: String,
        default: 'var(--primary)'
    },
    inActiveColor: {
        type: String,
        default: '#E6E6E6'
    },
    titleLength: {
        type: Number,
        default: 4
    },
    itemLength: {
        type: String,
        default: '72px'
    }
});

export default {
    StepProps,
    StepsProps
};
