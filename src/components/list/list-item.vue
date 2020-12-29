<style lang="less">
@import '~@/styles/components/list/var.less';

.som-list-item {
    // todo paddingY变量
    padding: 15px 16px;
    background: #fff;

    &__label {
        margin-right: var(--list-label-mr);
    }

    &__label-content {
        font-size: var(--list-label-fs);
        line-height: 22px;
        font-weight: var(--list-label-fw);
        color: var(--list-label-color);
    }

    &__label-desc {
        line-height: 16px;
        margin-top: 6px;
        font-size: var(--list-inline-desc-fs);
        font-weight: var(--list-inline-desc-fw);
        color: var(--list-inline-desc-color);
    }

    &__label-left-icon {
        margin-right: var(--list-label-left-icon-mr);
    }

    &__content {
        line-height: 22px;
        font-size: var(--list-content-fs);
        font-weight: var(--list-content-fw);
        color: var(--list-content-color);
    }
}
</style>

<template>
    <div :class="[
            'som-list-item relative',
            ...itemClassList
        ]">
        <div class="flex flex-align-start">
            <div v-bind="labelStyle">
                <!-- 标签左侧图标 -->
                <custom-icon
                    :class="[
                        'som-list-item__label-left-icon',
                        `align-self-${comLabelLeftIconAlign}`
                    ]"
                    :icon="labelLeftIcon"
                >
                    <slot name="labelLeftIcon"></slot>
                </custom-icon>
                <div class="min-w-0">
                    <!-- 标签内容: 如果没有label 但有LabelLeftIcon也不展示 -->
                    <div
                        v-if="$slots.label || label"
                        class="som-list-item__label-content flex flex-align-center"
                    >
                        <slot name="label">{{label}}</slot>
                        <!-- 标签右侧图标 -->
                        <custom-icon
                            class="som-list-item__label-right-icon"
                            :icon="labelRightIcon"
                        >
                            <slot name="labelRightIcon"></slot>
                        </custom-icon>
                    </div>
                    <!-- 副标题 -->
                    <div
                        v-if="$slots.inlineDesc || inlineDesc"
                        class="som-list-item__label-desc"
                    >
                        <slot name="inlineDesc">{{inlineDesc}}</slot>
                    </div>
                </div>
            </div>
            <div class="flex1 min-w-0 align-self-center">
                <div class="flex">
                    <div :class="[
                        'som-list-item__content',
                        'min-w-0',
                        'flex1',
                        `text-${comAlign}`,
                        { 'ellipsis': comIsEllipsis }
                    ]">
                        <slot>{{content}}</slot>
                    </div>
                    <custom-icon
                        class="som-list-item__right-icon"
                        :icon="rightIcon"
                    >
                        <slot name="rightIcon"></slot>
                    </custom-icon>
                    <div
                        v-if="isLink"
                        class="som-list-item__link ml2 flex flex-align-center"
                    >
                        <!-- eslint-disable-next-line -->
                        <svg
                            :style="`width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden; transform: rotate(${arrowDirections[arrowDirection]}deg)`"
                            t="1606288041200"
                            class="icon"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="1798"
                        >
                            <path
                                d="M472.064 751.552 72.832 352.32c-22.08-22.08-22.08-57.792 0-79.872 22.016-22.016 57.792-22.08 79.872 0L512 631.744l359.296-359.296c22.016-22.016 57.792-22.08 79.872 0 22.08 22.08 22.016 57.792 0 79.872l-399.232 399.232C529.856 773.568 494.144 773.568 472.064 751.552z"
                                p-id="1799"
                                fill="#D8D8D8"
                            ></path>
                        </svg>
                    </div>
                </div>
                <slot name="desc"></slot>
            </div>
        </div>
        <slot name="bottom"></slot>
    </div>
</template>

<script lang="ts">
import { computed, CSSProperties } from 'vue';
import { isBoolean } from '@souche-vue3/souche-util-vue';
import { injectParent, comProps } from '@/common/composition/communicate';
import { CustomIcon } from '@/common/utils/form';
import { ListName } from './list-types';
import { ListItemName, ListItemProps } from './list-item-types';

// todo: icon接入
/**
 * @params Slots.inlineDesc
 * @params Slots.label
 * @params Slots.labelLeftIcon
 * @params Slots.labelRightIcon
 * @params Slots.rightIcon
 * @params Slots.default
 * @params Slots.desc
 * @params Slots.bottom
 */
export default {
    name: ListItemName,
    props: ListItemProps,
    components: {
        CustomIcon
    },
    setup(props) {
        const { publicParent: listPub } = injectParent(ListName);
        // 合计属性
        const arrowDirections = {
            left: 90,
            top: 180,
            right: 270,
            bottom: 0
        };
        const getComProp = comProps(props, listPub);
        const comLabelWidth = getComProp('labelWidth');
        const comLabelMarginRight = getComProp('labelMarginRight');
        const comLabelLeftIconAlign = getComProp('labelLeftIconAlign', 'start');
        const comLabelAlign = getComProp('labelAlign', 'left');
        const comAlign = getComProp('align', 'right');
        const comIsEllipsis = getComProp('isEllipsis', true, isBoolean);
        const comLabelAlignVertical = getComProp('labelAlignVertical', 'start');
        const itemClassList = computed(() => [listPub?.itemClass, props.itemClass]);
        // 左边标题区域class集合
        const labelStyle = computed(() => {
            const aligns = {
                left: 'flex-justify-start',
                center: 'flex-justify-center',
                right: 'flex-justify-end'
            };
            const classList = [
                'som-list-item__label',
                'flex',
                `text-${comLabelAlign.value}`,
                'flex-shrink-0',
                'flex-align-center',
                `align-self-${comLabelAlignVertical.value}`,
                aligns[comLabelAlign.value]
            ];

            const style: CSSProperties = {};
            // 标签宽度
            if (comLabelWidth.value) {
                comLabelWidth.value === '0' ?
                    style.display = 'none' :
                    style.width = comLabelWidth.value;
            }
            // 标签距离内容的距离
            if (comLabelMarginRight.value) {
                style.marginRight = comLabelMarginRight.value;
            }

            return {
                class: classList,
                style
            };
        });

        return {
            comLabelWidth,
            comLabelMarginRight,
            comLabelLeftIconAlign,
            comLabelAlign,
            comAlign,
            comIsEllipsis,
            comLabelAlignVertical,
            itemClassList,
            labelStyle,
            listPub,
            arrowDirections
        };
    }
};
</script>
