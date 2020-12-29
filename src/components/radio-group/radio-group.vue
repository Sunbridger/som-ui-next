<template>
    <check-common-group
        class="som-radio-group"
        v-bind="$props"
    >
        <slot></slot>
        <template #item="{ key, value, inlineDesc, disabled }">
            <som-radio
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
                    >{{key}}</slot>
                </template>
            </som-radio>
        </template>
    </check-common-group>
</template>

<script lang="ts">
import CheckCommonGroup from '@/components/radio/check-common-group.vue';
import SomRadio from '@/components/radio/radio.vue';
import { provideParent } from '@/common/composition/communicate';
import { RadioGroupName, RadioGroupProps } from './radio-group-types';


/**
 * @param Slots.icon
 * @param Slots.checkedIcon
 * @param Slots.default group补充内容
 * @param Slots.itemKey radio的key 现在只针对options生成的radio!!!!!!!!!
 * @param Slots.fullItem
 * todo inlineDesc??
 */
export default {
    name: RadioGroupName,
    props: RadioGroupProps,
    components: {
        CheckCommonGroup,
        SomRadio
    },
    emits: [
        'update:modelValue',
        'change',
        'itemClick'
    ],
    setup() {
        provideParent(RadioGroupName);
    }
};
</script>
