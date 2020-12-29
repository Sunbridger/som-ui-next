<style lang="less">

@block: som-filter;
@item: som-filte-item;
@fade: som-filter-fade;
@fold: som-filter-fold;

.@{block} {
    background: #fff;
    box-shadow: var(--box-shadow-common);
    .color-1a1a1a {
        color: #1a1a1a;
    }

    &__mask-wrapper {
        .@{item}__content-wrapper {
            .fixed(@left: 0, @right: 0);
            background: #fff;
            transform-origin: top;
        }

        .@{fold}-enter-active,
        .@{fold}-leave-active {
            transition: all .2s linear;
            overflow: hidden;
        }
        .@{fold}-enter-from,
        .@{fold}-leave-to {
            transform: scaleY(0);
        }
        .@{fold}-enter-to {
            transform: scaleY(1);
        }

        .@{fade}-enter-active,
        .@{fade}-leave-active {
            transition: all .2s linear;
        }
        .@{fade}-enter-from,
        .@{fade}-leave-to {
            opacity: 0;
        }
        .@{fade}-enter-to,
        .@{fade}-leave-from {
            opacity: 1;
        }
    }

    &__mask {
        background: var(--mask1);
    }
}
</style>

<template>
    <div class="som-filter">
        <div
            class="som-filter__labels flex"
            ref="labelsRef"
        >
            <slot></slot>
        </div>
        <div
            class="som-filter__mask-wrapper fixed lr-0 t-0 z-index-90"
            :style="currentChild ? topMaskStyle : {}"
            @click.self="clickMask"
        >
            <transition name="som-filter-fade">
                <div
                    v-if="currentChild"
                    class="som-filter__mask fixed cover bg-mask1"
                    :style="MaskStyle"
                    @click="clickMask"
                ></div>
            </transition>
            <transition
                name="som-filter-fold"
                mode="out-in"
            >
                <div
                    v-if="showFilterItemContent && filterInfo.group"
                    v-bind="contentWrapperStyle"
                    class="pt10 overflow-y-auto"
                    key="group"
                    @touchmove.stop
                >
                    <div
                        v-for="(item, index) in filterInfo.options"
                        :key="index"
                        class="pt14"
                    >
                        <div class="fs15 line-height pl16 pr16 color-1a1a1a">{{item.label}}</div>
                        <component :is="CheckboxGroupWrapper(item)"></component>
                    </div>
                    <div class="padding-x-16 pb8 pt16">
                        <som-button @click="setModel(filterInfo?.options)">确认</som-button>
                    </div>
                </div>
                <div
                    v-else-if="showFilterItemContent && filterInfo?.multiple"
                    v-bind="contentWrapperStyle"
                    key="multiple"
                >
                    <component :is="CheckboxGroupWrapper(filterInfo)"></component>
                    <div class="padding-x-16 pb8 pt16">
                        <som-button @click="setModel([filterInfo])">确认</som-button>
                    </div>
                </div>
                <som-radio-group
                    v-else-if="showFilterItemContent"
                    v-bind="contentWrapperStyle"
                    mode="icon"
                    inlineStyle="style2"
                    v-model="model[filterInfo.prop]"
                    :options="filterInfo.options"
                    @change="$nextTick(closeMask)"
                    key="icon"
                ></som-radio-group>
            </transition>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick, CSSProperties, reactive, watch, h, computed } from 'vue';
import { cloneDeep } from '@souche-vue3/souche-util-vue';
import SomRadioGroup from '@/components/radio-group/radio-group.vue';
import SomCheckbox from '@/components/checkbox/checkbox.vue';
import SomCheckboxGroup from '@/components/checkbox-group/checkbox-group.vue';
import SomTagGroup from '@/components/tag/tag-group.vue';
import SomTag from '@/components/tag/tag.vue';
import SomButton from '@/components/button/button.vue';
import { provideParent } from '@/common/composition/communicate';
import { ComponentInternalInstanceExt } from '@/common/types';
import { preventBodyScroll } from '@/common/utils/events';
import { FilterName, FilterProps } from './filter-types';
import { FilterItemInfo, FilterItemMethods } from '../filter-item/filter-item-types';

/**
 * @param Methods.setCurrentChild
 * @param Methods.getCurrentChild
 */
export default {
    name: FilterName,
    props: FilterProps,
    components: {
        SomRadioGroup,
        SomCheckbox,
        SomCheckboxGroup,
        SomTagGroup,
        SomTag,
        SomButton
    },
    setup(props) {
        provideParent(FilterName);
        const labelsRef = ref<HTMLDivElement | null>(null);
        let copyModel = reactive(cloneDeep(props.model)); // emm.. model的拷贝，用于重置数据
        const showFilterItemContent = ref(false);
        const currentChild = ref<ComponentInternalInstanceExt<FilterItemMethods> | null>(null);
        // todo: 定位优化
        // 蒙层容器的样式
        const MaskStyle = reactive<CSSProperties>({});
        const topMaskStyle = reactive<CSSProperties>({});
        const filterInfo = ref<any>({});

        const contentWrapperStyle = computed(() => {
            const classList = [
                'som-filter-item__content-wrapper',
                { 'b-0': currentChild.value?.props.full }
            ];

            return {
                class: classList,
                style: MaskStyle
            };
        });

        const { addPrevent, rmPrevent } = preventBodyScroll();

        watch(() => currentChild.value, (newV) => {
            if (newV) {
                // 打开选项的时候
                // 设置蒙层的样式
                const labelsEl = labelsRef.value;
                if (labelsEl) {
                    MaskStyle.top = `${labelsEl.getBoundingClientRect().top + labelsEl.offsetHeight}px!important`;
                    topMaskStyle.bottom = `${(document.documentElement || document.body).offsetHeight - labelsEl.getBoundingClientRect().top}px!important`;
                }
                // 保存model原始值
                copyModel = reactive(cloneDeep(props.model));
                // 阻止滚动
                addPrevent();
            } else {
                rmPrevent();
            }
            // 🧓 下拉菜单过度。。。
            showFilterItemContent.value = false;
            nextTick(() => {
                currentChild.value && (showFilterItemContent.value = true);
            });
        });

        // 设置当前激活的filterItem实例
        function setCurrentChild(instance: ComponentInternalInstanceExt<FilterItemMethods> | null) {
            currentChild.value = instance;
            if (instance) {
                filterInfo.value = instance.proxy.getFilterInfo();
            }
        }

        // 获取当前激活的filterItem实例
        function getCurrentChild() {
            return currentChild;
        }
        // 关闭蒙层
        function closeMask() {
            setCurrentChild(null);
        }
        // 点击蒙层
        function clickMask() {
            props.hideOnBlur && closeMask();
        }
        // 多选点击确认 设置model数据
        const setModel = (options) => {
            options.forEach((o) => {
                const { prop: modelProp } = o;
                // eslint-disable-next-line
                props.model[modelProp] = copyModel[modelProp];
            });
            closeMask();
        };

        // 标签多选框
        const CheckboxGroupWrapper = (info: FilterItemInfo) => {
            // 单个多选
            const { prop: modelProp, options: opts } = info;
            return defineComponent({
                setup() {
                    const Checkboxs = () => opts.map((option) => {
                        const { key, value: v } = option;
                        return h(SomCheckbox, {
                            value: v
                        }, {
                            fullItem(i) {
                                return h(SomTag, {
                                    halfRadius: true,
                                    class: [
                                        { 'fw-600': i.checked }
                                    ],
                                    type: i.checked ? 'selected' : ''
                                }, () => key);
                            }
                        });
                    });
                    return () => h(SomCheckboxGroup, {
                        mode: 'icon',
                        borderIndent: 'none',
                        modelValue: copyModel[modelProp],
                        'onUpdate:modelValue'(val) {
                            copyModel[modelProp] = val;
                        }
                    }, () => h(SomTagGroup, {
                        cloumn: 'three'
                    }, Checkboxs));
                }
            });
        };

        return {
            labelsRef,
            copyModel,
            showFilterItemContent,
            currentChild,
            MaskStyle,
            topMaskStyle,
            CheckboxGroupWrapper,
            setCurrentChild,
            getCurrentChild,
            closeMask,
            clickMask,
            filterInfo,
            contentWrapperStyle,
            setModel,
        };
    }
};
</script>
