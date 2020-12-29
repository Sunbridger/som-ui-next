<template>
    <check-common
        class="som-checkbox"
        v-bind="$props"
        :disabled="disabled || isLimitDisabled"
        :checked="checked"
        @toggle="onToggle"
        @click="onClick"
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
        <template #checkedIcon="data">
            <!-- eslint-disable -->
            <slot
                name="checkedIcon"
                v-bind="data"
            >
                <template v-if="comMode === 'button'">
                    <span
                        class="inline-block"
                        :style="{
                            width: '16px',
                            height: '16px',
                            background: `url('https://assets.souche.com/assets/sccimg/som-ui-next/radio/style3-icon.png') no-repeat 0 ${checked ? '0' : '100%'} / cover`
                        }"
                    ></span>
                </template>
                <template v-else-if="comInlineStyle === 'style1'">
                    <img
                        v-if="checked"
                        width="16"
                        src="https://assets.souche.com/assets/sccimg/som-ui-next/radio/gou.png"
                    />
                </template>
                <template v-else-if="comInlineStyle === 'style2'">
                    <span
                        class="inline-block"
                        :style="{
                            width: '16px',
                            height: '16px',
                            background: `url('https://assets.souche.com/assets/sccimg/som-ui-next/radio/style2-icon-2.png') no-repeat 0 ${checked ? '0' : '100%'} / cover`
                        }"
                    ></span>
                </template>
                <template v-else-if="comInlineStyle === 'style3'">
                    <span
                        class="inline-block"
                        :style="{
                            width: '16px',
                            height: '16px',
                            background: `url('https://assets.souche.com/assets/sccimg/som-ui-next/radio/style3-icon.png') no-repeat 0 ${checked ? '0' : '100%'} / cover`
                        }"
                    ></span>
                </template>
            </slot>
            <!-- eslint-enable -->
        </template>
    </check-common>
</template>

<script lang="ts">
import { computed } from 'vue';
import CheckCommon from '@/components/radio/check-common.vue';
import { injectParent } from '@/common/composition/communicate';
import { isArray } from '@souche-vue3/souche-util-vue';
import { CheckboxName, CheckboxProps } from './checkbox-types';
import { FormItemMethods, FormItemName } from '../form-item/form-item-types';
import { CheckboxGroupName } from '../checkbox-group/checkbox-group-types';

/**
 * @param Slots.icon
 * @param Slots.checkedIcon
 * @param Slots.default 标签的key
 * @param Slots.inlineDesc
 * @param Slots.fullItem
 */
export default {
    name: CheckboxName,
    props: CheckboxProps,
    components: {
        CheckCommon
    },
    emits: [
        'update:modelValue',
        'change',
        'click'
    ],
    setup(props, { emit }) {
        const { publicParent: formItemPub } = injectParent<FormItemMethods>(FormItemName);
        const { internalParent: checkboxGroupInt, publicParent: checkboxGroupPub } = injectParent(CheckboxGroupName);
        const comModelValue = computed(() => checkboxGroupPub?.modelValue || props.modelValue);
        const comMode = computed(() => checkboxGroupPub?.mode || props.mode);
        const checked = computed(() => (isArray(comModelValue.value) ? comModelValue.value.includes(props.value) : props.modelValue === props.trueValue));
        const comInlineStyle = computed(() => checkboxGroupPub?.inlineStyle || props.inlineStyle);

        // 范围限制
        const isLimitDisabled = computed(() => {
            const { max, min } = checkboxGroupInt?.props || {} as any;
            return (max || min) &&
                (
                    ((checkboxGroupInt?.props.modelValue as any).length >= max && !checked.value) ||
                    ((checkboxGroupInt?.props.modelValue as any).length <= min && checked.value)
                );
        });

        function onToggle() {
            if (checkboxGroupInt) {
                // group多选项（checkbox-group）
                const newModelValue: any[] = [...comModelValue.value];
                if (checked.value) {
                    // 删除
                    const idx = newModelValue.findIndex(i => i === props.value);
                    newModelValue.splice(idx, 1);
                } else {
                    newModelValue.push(props.value);
                }
                checkboxGroupInt.emit('update:modelValue', newModelValue);
                checkboxGroupInt.emit('change', newModelValue, props.value);
                emit('update:modelValue', newModelValue);
                emit('change', newModelValue, props.value);
            } else {
                // 单个选项 checkbox单独使用的时候
                const val = props.modelValue === props.trueValue ? props.falseValue : props.trueValue;
                emit('update:modelValue', val);
                emit('change', val, props.value);
            }
            formItemPub?.onFieldChange();
        }

        function onClick(optionInfo) {
            checkboxGroupInt?.emit('itemClick', optionInfo);
            emit('click', optionInfo);
        }

        return {
            comModelValue,
            comMode,
            checked,
            comInlineStyle,
            isLimitDisabled,
            onToggle,
            onClick
        };
    }
};
</script>
