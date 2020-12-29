<style lang="less">
@import '~@/styles/components/radio/var.less';

.som-check-common {
    color: var(--som-check-common-color);
    font-size: var(--som-check-common-fs);
    line-height: 22px;

    &--select-color {
        color: var(--som-check-common-select-color);
    }
    &--disabled-color {
        color: var(--som-check-common-disabled-color);
    }
    &--horizontal {
        margin-right: var(--som-check-common-mr);
    }
}
</style>

<template>
    <extends-slot
        :class="[
            'som-check-common',
            {
                'som-check-common--disabled': comDisabled,
                'som-check-common--button': comMode === 'button'
            }
        ]"
        @click="onClick"
    >
        <slot
            name="fullItem"
            v-bind="optionInfo"
        >
            <!-- !!!!!!!! 如果交换这两个元素的位置，会报错（存在注释的情况下），待定位 -->
            <!-- icon模式下的样式 -->
            <som-list-item
                v-if="comMode === 'icon'"
                labelLeftIconAlign="center"
                :inlineDesc="inlineDesc"
            >
                <template #label>
                    <span :class="[
                            { 'som-check-common--disabled-color': comDisabled },
                            comInlineStyle === 'style1' ? {
                                'som-check-common--select-color': checked,
                                'som-check-common--disabled-color': comDisabled
                            } : {}
                        ]">
                        <slot v-bind="optionInfo"></slot>
                    </span>
                </template>
                <template #labelLeftIcon>
                    <slot
                        v-if="comInlineStyle === 'style1'"
                        name="icon"
                        v-bind="optionInfo"
                    ></slot>
                    <slot
                        v-if="comInlineStyle === 'style3'"
                        name="checkedIcon"
                        v-bind="optionInfo"
                    ></slot>
                </template>
                <template #rightIcon>
                    <slot
                        v-if="['style1', 'style2'].includes(comInlineStyle)"
                        name="checkedIcon"
                        v-bind="optionInfo"
                    ></slot>
                </template>
            </som-list-item>
            <!-- button模式下的样式 -->
            <div
                v-else
                v-bind="buttonModeStyle"
            >
                <div :class="[
                    'flex flex-align-center',
                    { 'som-check-common--disabled-color': comDisabled }
                ]">
                    <div class="mr8 flex flex-align-center">
                        <slot
                            name="checkedIcon"
                            v-bind="optionInfo"
                        ></slot>
                    </div>
                    <slot v-bind="optionInfo"></slot>
                </div>
            </div>
        </slot>
    </extends-slot>
</template>

<script lang="ts">
/**
 * @desc radio & checkbox底层组件
 * 提供了通用的样式和事件
 */
import { defineComponent, CSSProperties, computed } from 'vue';
import { injectParent, comProps } from '@/common/composition/communicate';
import { extendsSlot } from '@/common/utils/form';
import SomListItem from '@/components/list/list-item.vue';
import { CheckCommonName, CheckCommonProps } from './check-common-types';
import { FormName } from '../form/form-types';
import { CheckCommonGroupName } from './check-common-group-types';

/**
 * @param Slots.icon
 * @param Slots.checkedIcon
 * @param Slots.default 标签的key
 * @param Slots.inlineDesc
 * @param Slots.fullItem 需要包一层根元素
 */
export default defineComponent({
    name: CheckCommonName,
    props: CheckCommonProps,
    components: {
        extendsSlot,
        SomListItem
    },
    emits: [
        'toggle',
        'click'
    ],
    setup(props, { emit }) {
        const { publicParent: formPub } = injectParent(FormName);
        const { publicParent: checkCommonGroupPub } = injectParent(CheckCommonGroupName);
        const getComProp = comProps(checkCommonGroupPub, props);
        const comDirection = getComProp('direction');
        const comMode = getComProp('mode');
        const comInlineStyle = getComProp('inlineStyle');
        const comDisabled = computed(() => props.disabled || checkCommonGroupPub?.disabled || formPub?.disabled);
        const optionInfo = computed(() => {
            const { checked, value } = props;
            return {
                checked,
                key: props.label,
                value,
                disabled: comDisabled.value
            };
        });

        function onClick() {
            emit('click', optionInfo);
            if (!comDisabled.value) {
                emit('toggle', optionInfo);
            }
        }

        const buttonModeStyle = computed(() => {
            const classList = [
                `som-check-common--${comDirection.value}`
            ];
            const style: CSSProperties = {};

            return {
                class: classList,
                style
            };
        });

        return {
            comDirection,
            comMode,
            comInlineStyle,
            comDisabled,
            optionInfo,
            onClick,
            buttonModeStyle
        };
    }
});
</script>
