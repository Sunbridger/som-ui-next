<style lang="less">
@marginDis: 14px;
.som-check-common-group {
    &--button {
        margin-bottom: -@marginDis;
    }
    .som-check-common--button {
        margin-bottom: @marginDis;
    }
}
</style>

<template>
    <component
        :class="[
            'som-check-common-group',
            {
                'som-check-common-group--button': mode === 'button'
            }
        ]"
        :is="computedTag"
        v-bind="computedProps"
    >
        <template v-for="option in options">
            <slot
                name="item"
                v-bind="option"
            ></slot>
        </template>
        <slot></slot>
    </component>
</template>

<script lang="ts">
/**
 * @desc radio & checkbox底层组件
 */
import { computed, CSSProperties, defineComponent } from 'vue';
import { isString } from '@souche-vue3/souche-util-vue';
import { provideParent } from '@/common/composition/communicate';
import { CheckCommonGroupName, CheckCommonGroupProps } from './check-common-group-types';

/**
 * @param Slots.item
 * @param Slots.default
 * @param Slots.fullItem
 */
export default defineComponent({
    name: CheckCommonGroupName,
    props: CheckCommonGroupProps,
    setup(props) {
        provideParent(CheckCommonGroupName);
        const buttonModeStyle = computed(() => {
            const classList: string[] = [
                'som-check-common-group'
            ];
            const style: CSSProperties = {};

            if (props.direction === 'horizontal') {
                classList.push(
                    'flex',
                    'flex-wrap'
                );
            }

            return {
                style,
                class: classList
            };
        });
        const computedTag = computed(() => (props.mode === 'button' ? 'div' : 'som-list'));
        const computedProps = computed(() => (props.mode === 'button' ?
            { ...buttonModeStyle.value } :
            { borderIndent: props.borderIndent }));
        // option格式化
        const options = computed(() => props.options.map(option => (isString(option) ? { key: option, value: option } : option)));

        return {
            computedTag,
            computedProps,
            options
        };
    }
});
</script>
