import { Ref } from 'vue';
import { ComponentInternalInstanceExt } from '@/common/types';
import { FilterItemMethods } from '../filter-item/filter-item-types';

export const FilterName = 'SomFilter';

export interface FilterMethods {
    setCurrentChild: (instance: ComponentInternalInstanceExt<FilterItemMethods> | null) => void;
    getCurrentChild: () => Ref<ComponentInternalInstanceExt<FilterItemMethods> | null>;
    closeMask: () => void;
}

export const FilterProps = {
    model: {
        type: Object,
        default: () => ({})
    },
    showMask: {
        type: Boolean,
        default: true
    },
    hideOnBlur: {
        type: Boolean,
        default: true
    }
};