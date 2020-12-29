<style lang="less">
.som-filter-item {
    color: #000;
    &--active {
        color: var(--primary); // todo
    }
}
</style>

<template>
    <div
        v-bind="itemStyle"
        @click="toggleActive"
    >
        <span>
            <slot name="label">{{info.label}}</slot>
        </span>
        <img
            v-if="info.group"
            class="ml5 align-self-center"
            width="14"
            src="https://assets.souche.com/assets/sccimg/som-ui-next/filter/编组 7.png"
        />
        <img
            v-else
            class="ml6 align-self-center"
            width="6"
            :src="isActive ?
                'https://assets.souche.com/assets/sccimg/som-ui-next/filter/展开16red.png' :
                'https://assets.souche.com/assets/sccimg/som-ui-next/filter/展开16.png'"
        />
    </div>
</template>

<script lang="ts">
import { computed, getCurrentInstance } from 'vue';
import { isObject, omitBy } from '@souche-vue3/souche-util-vue';
import { injectParent } from '@/common/composition/communicate';
import { ComponentInternalInstanceExt } from '@/common/types';
import { FilterItemMethods, FilterItemName, FilterItemProps } from './filter-item-types';
import { FilterMethods, FilterName } from '../filter/filter-types';

/**
 * @param Slots.label
 * @param Slots.default
 * @param Methods.getFilterInfo
 */
export default {
    name: FilterItemName,
    props: FilterItemProps,
    setup(props) {
        const instance = getCurrentInstance() as ComponentInternalInstanceExt<FilterItemMethods>;
        const { publicParent } = injectParent<FilterMethods>(FilterName);
        const isActive = computed(() => {
            const currentP = publicParent?.getCurrentChild().value?.proxy;
            return currentP?.getFilterInfo().label === info.value.label;
        });
        // 筛选项的信息
        const info = computed(() => {
            const { label, prop, options, multiple, group } = props;
            const result = {
                label,
                prop,
                options,
                multiple,
                group,
            };
            // todo props.group优化
            if (isObject(options)) {
                Object.assign(
                    result,
                    omitBy(options, (v) => !v),
                );
            }
            return result;
        });
        const itemStyle = computed(() => {
            const classList = [
                'som-filter-item',
                'flex1',
                'flex',
                'flex-justify-center',
                'line-height',
                // 'padding15',
                'padding-y-15',
                'fs14',
                { 'som-filter-item--active': isActive.value },
            ];
            return {
                class: classList,
            };
        });

        // 切换状态
        function toggleActive() {
            publicParent?.setCurrentChild(isActive.value ? null : instance);
        }
        // 获取筛选器的数据
        function getFilterInfo() {
            return info.value;
        }

        return {
            isActive,
            // 筛选项的信息
            info,
            itemStyle,
            toggleActive,
            getFilterInfo,
        };
    },
};
</script>
