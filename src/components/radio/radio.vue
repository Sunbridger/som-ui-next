<template>
    <check-common
        class="som-radio"
        v-bind="$props"
        :checked="checked"
        @toggle="onToggle"
        @click="onClick">
        <template v-for="slot in Object.keys($slots)" #[slot]="data">
            <slot :name="slot" v-bind="data"></slot>
        </template>
        <template #checkedIcon="data">
            <!-- eslint-disable -->
            <slot name="checkedIcon" v-bind="data">
                <template v-if="comMode === 'button'">
                    <template v-if="checked">
                        <custom-icon v-if="data.disabled" size="16">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32" version="1.1"><title>Group 10</title><desc>Created with Sketch.</desc><g id="3.-组件-Data-Entry-数据录入" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Radio-单选备份" transform="translate(-832.000000, -1315.000000)"><g id="编组-2" transform="translate(576.000000, 1283.000000)"><g id="编组-14" transform="translate(256.000000, 26.000000)"><g id="common_icon_radio_m_selected-copy" transform="translate(0.000000, 6.000000)"><g id="Group-10"><circle id="Combined-Shape" stroke="#E3E3E6" stroke-width="2" fill="#F7F8FA" cx="16" cy="16" r="15"/><circle id="Oval-277-Copy" fill="#E3E3E6" cx="16" cy="16" r="7.11111111"/></g></g></g></g></g></g></svg>
                        </custom-icon>
                        <custom-icon v-else size="16">
                            <svg width="1em" height="1em" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="3.-组件-Data-Entry-数据录入" stroke="none" stroke-width="1" fill-rule="evenodd"><g id="Radio-单选备份" transform="translate(-833.000000, -1074.000000)"><g id="Group-3备份-2" transform="translate(576.000000, 1037.000000)"><rect id="Rectangle-Copy" fill="#FFFFFF" x="0" y="0" width="750" height="176"></rect><g id="编组-6" transform="translate(256.000000, 30.000000)"><g id="common_radio_selected" transform="translate(0.000000, 6.000000)"><g id="Group-10" transform="translate(1.000000, 1.000000)"><circle id="Combined-Shape" cx="15" cy="15" r="15"></circle><circle id="Oval-277-Copy" fill="#FFFFFF" cx="15" cy="15" r="6"></circle></g></g></g></g></g></g></svg>
                        </custom-icon>
                    </template>
                    <custom-icon v-else size="16">
                        <svg t="1606391482172" class="icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3192"><path d="M510.669 1011.507c-67.482 0-132.915-13.21-194.56-39.219-59.494-25.19-112.947-61.133-158.822-107.008s-81.92-99.328-107.008-158.822C24.269 644.813 11.059 579.482 11.059 512s13.21-132.813 39.219-194.458c25.19-59.494 61.133-112.947 107.008-158.822S256.614 76.8 316.109 51.712c61.645-26.01 126.976-39.219 194.458-39.219 67.379 0 132.813 13.21 194.458 39.219 59.494 25.19 112.947 61.133 158.822 107.008s81.92 99.328 107.008 158.822c26.01 61.645 39.219 126.976 39.219 194.458s-13.21 132.813-39.322 194.458c-25.088 59.494-61.133 112.947-107.008 158.822-45.875 45.875-99.226 81.92-158.72 107.008C643.482 998.298 578.048 1011.507 510.669 1011.507L510.669 1011.507M510.566 55.91c-61.542 0-121.344 12.083-177.562 35.84-54.272 22.938-103.117 55.91-144.998 97.792s-74.752 90.624-97.792 144.998c-23.757 56.218-35.84 115.917-35.84 177.562 0 61.542 12.083 121.344 35.84 177.562 22.938 54.272 55.91 103.117 97.792 144.998s90.624 74.752 144.998 97.792c56.218 23.757 115.917 35.84 177.562 35.84l0.102 0 0 0c61.542 0 121.242-12.083 177.459-35.84 54.272-22.938 103.014-55.808 144.998-97.792s74.752-90.726 97.792-144.998c23.757-56.218 35.84-115.917 35.84-177.562 0-61.542-12.083-121.344-35.84-177.562-22.938-54.272-55.808-103.117-97.792-144.998-41.882-41.984-90.726-74.854-144.998-97.792C631.91 67.994 572.109 55.91 510.566 55.91z" p-id="3193" fill="#D8D8D8"></path></svg>
                    </custom-icon>
                </template>
                <template v-else-if="comInlineStyle === 'style1'">
                    <img
                        v-if="checked"
                        width="16"
                        src="https://assets.souche.com/assets/sccimg/som-ui-next/radio/gou.png" />
                </template>
                <template v-else-if="comInlineStyle === 'style2'">
                    <span
                        class="inline-block"
                        :style="{
                            width: '16px',
                            height: '16px',
                            background: `url('https://assets.souche.com/assets/sccimg/som-ui-next/radio/style2-icon-2.png') no-repeat 0 ${checked ? '0' : '100%'} / cover`
                        }"></span>
                </template>
                <template v-else-if="comInlineStyle === 'style3'">
                    <span
                        class="inline-block"
                        :style="{
                            width: '16px',
                            height: '16px',
                            background: `url('https://assets.souche.com/assets/sccimg/som-ui-next/radio/style3-icon.png') no-repeat 0 ${checked ? '0' : '100%'} / cover`
                        }"></span>
                </template>
            </slot>
            <!-- eslint-enable -->
        </template>
    </check-common>
</template>

<script lang="ts">
import { computed } from 'vue';
import { injectParent } from '@/common/composition/communicate';
import { CustomIcon } from '@/common/utils/form';
import CheckCommon from './check-common.vue';
import { RadioName, RadioProps } from './radio-types';
import { FormItemMethods, FormItemName } from '../form-item/form-item-types';
import { RadioGroupName } from '../radio-group/radio-group-types';

/**
 * @param Slots.icon
 * @param Slots.checkedIcon
 * @param Slots.default 标签的key
 * @param Slots.inlineDesc
 */
export default {
    name: RadioName,
    props: RadioProps,
    components: {
        CheckCommon,
        CustomIcon
    },
    emits: [
        'update:modelValue',
        'change',
        'click'
    ],
    setup(props, { emit }) {
        const { publicParent: formItemPub } = injectParent<FormItemMethods>(FormItemName);
        const { internalParent: radioGroupInt, publicParent: radioGroupPub } = injectParent(RadioGroupName);
        const comModelValue = computed(() => radioGroupPub?.modelValue || props.modelValue);
        const comMode = computed(() => radioGroupPub?.mode || props.mode);
        const checked = computed(() => props.value === comModelValue.value);
        const comInlineStyle = computed(() => radioGroupPub?.inlineStyle || props.inlineStyle);

        function onToggle(optionInfo) {
            const value = props.value;
            radioGroupInt?.emit('update:modelValue', value);
            radioGroupInt?.emit('change', value, optionInfo);
            emit('update:modelValue', value);
            emit('change', value, optionInfo);
            formItemPub?.onFieldChange();
        }

        function onClick(optionInfo) {
            radioGroupInt?.emit('itemClick', optionInfo);
            emit('click', optionInfo);
        }

        return {
            comModelValue,
            comMode,
            checked,
            comInlineStyle,
            onToggle,
            onClick
        };
    }
};
</script>
