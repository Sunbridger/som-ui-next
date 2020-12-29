<template>
    <check-common-group
        class="som-checkbox-group"
        v-bind="$props"
    >
        <slot></slot>
        <template #item="{ key, value, inlineDesc, disabled }">
            <som-checkbox
                :label="key"
                :value="value"
                :inlineDesc="inlineDesc"
                :disabled="disabled"
            >
                <template
                    v-for="slot in Object.keys($slots)"
                    #[slot]="data"
                >
                    <slot
                        :name="slot"
                        v-bind="data"
                    ></slot>
                </template>
                <template #default="data">
                    <slot
                        name="itemKey"
                        v-bind="data"
                    >
                        {{key}}
                    </slot>
                </template>
            </som-checkbox>
        </template>
    </check-common-group>
</template>

<script lang="ts">
import CheckCommonGroup from '@/components/radio/check-common-group.vue';
import SomCheckbox from '@/components/checkbox/checkbox.vue';
import { provideParent } from '@/common/composition/communicate';
import { CheckboxGroupName, CheckboxGroupProps } from './checkbox-group-types';

/**
 * @param Slots.icon
 * @param Slots.checkedIcon
 * @param Slots.default group补充内容
 * @param Slots.itemKey checkbox的key 现在只针对options生成的checkbox!!!!!!!!!
 * @param Slots.fullItem
 * todo inlineDesc??
 */
export default {
    name: CheckboxGroupName,
    props: CheckboxGroupProps,
    components: {
        CheckCommonGroup,
        SomCheckbox
    },
    emits: [
        'update:modelValue',
        'change',
        'itemClick'
    ],
    setup() {
        provideParent(CheckboxGroupName);
        return {};
    }
};

</script>
