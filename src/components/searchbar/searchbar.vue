<style lang="less">
.som-searchbar {
    &--dark {
        background: #fff;
    }
    &--light {
        background: var(--background-page);
    }
    &__cancel {
        padding: 0 4px 0 20px;
        color: var(--text-title);
        font-size: 15px;
    }
    &__preset-item__title {
        color: #1b1c33;
    }
}
</style>

<template>
    <div v-bind="searchbarStyle">
        <form
            action=""
            class="flex flex-align-center padding-x-16 padding-y-7"
            :style="formStyle"
            @submit="submit"
        >
            <div
                v-if="$slots.left"
                class="som-searchbar__left pr16"
            >
                <slot name="left"></slot>
            </div>
            <som-input
                class="flex1"
                type="search"
                autocomplete="off"
                :debounce="debounce"
                v-bind="{
                    ...inputProps,
                    ...inputEvents
                }"
                @focus="focusInput"
                ref="inputVm"
            >
                <template #prefix>
                    <slot name="prefix">
                        <!-- eslint-disable -->
                        <svg
                            t="1606268940702"
                            class="icon"
                            style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="2777"
                        >
                            <path
                                d="M700.8 775.765333a384 384 0 1 1 74.965333-74.965333l147.370667 147.370667a53.034667 53.034667 0 0 1-74.965333 74.965333l-147.370667-147.370667zM469.333333 768a298.666667 298.666667 0 1 0 0-597.333333 298.666667 298.666667 0 0 0 0 597.333333z"
                                p-id="2778"
                                fill="#8d8e99"
                                data-spm-anchor-id="a313x.7781069.0.i3"
                            ></path>
                        </svg>
                        <!-- eslint-enable -->
                    </slot>
                </template>
                <template #suffix>
                    <slot name="suffix"></slot>
                </template>
            </som-input>
            <div
                v-if="isCancel || $slots.right"
                class="som-searchbar__cancel"
                @click="cancel"
            >
                <slot name="right">{{cancelText}}</slot>
            </div>
        </form>
        <div
            v-if="isSearching"
            class="overflow-y-auto"
        >
            <template v-if="modelValue">
                <!-- 结果页面 -->
                <div
                    v-if="comLoading"
                    class="text-center mt24 fs12"
                >loading...</div>
                <slot
                    v-else-if="result && result.length"
                    name="result"
                >
                    <som-list>
                        <som-list-item
                            v-for="(i, index) in result"
                            :key="index"
                            :label="i.key"
                            @click="$emit('result-click', i)"
                        ></som-list-item>
                    </som-list>
                </slot>
                <slot
                    v-else
                    name="noResult"
                >
                    <div class="text-center mt24">{{noResultMsg}}</div>
                </slot>
            </template>
            <!-- 预设页面 -->
            <div
                v-else-if="$slots.preset || preset"
                class="som-searchbar__preset"
            >
                <slot name="preset">
                    <div
                        v-for="(presetInfo, index) in preset"
                        :key="index"
                        class="som-searchbar__preset-item"
                    >
                        <div class="som-searchbar__preset-item__title fs16 line-height padding-x-20 pt24 pb2">
                            <span class="fs16 fw-600">{{presetInfo.title}}</span>
                        </div>
                        <som-tag-group>
                            <som-tag
                                v-for="(item, index) in presetInfo.list"
                                :key="index"
                                size="medium"
                                half-radius
                                @click="$emit('preset-click', item)"
                            >{{item.key}}</som-tag>
                        </som-tag-group>
                    </div>
                </slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, ref, ComponentPublicInstance } from 'vue';
import { pick } from '@souche-vue3/souche-util-vue';
import SomInput from '@/components/input/input.vue';
import { preventDefault } from '@/common/utils/events';
import SomTagGroup from '@/components/tag/tag-group.vue';
import SomTag from '@/components/tag/tag.vue';
import SomList from '@/components/list/list.vue';
import SomListItem from '@/components/list/list-item.vue';
import { SearchbarName, SearchbarProps } from './searchbar-types';
import { InputMethods } from '../input/input-types';

/**
 * @param Slots.left
 * @param Slots.right
 * @param Slots.prefix
 * @param Slots.suffix
 * @param Slots.result
 * @param Slots.noResult
 * @param Slots.preset
 * @param Methods.focus
 * @param Methods.blur
 */
export default {
    name: SearchbarName,
    props: SearchbarProps,
    components: {
        SomInput,
        SomTagGroup,
        SomTag,
        SomList,
        SomListItem
    },
    emits: [
        'update:modelValue',
        'submit',
        'cancel', // 点击 取消 按钮时触发 —
        'input', // 输入文字变化时触发 value
        'result-click', // 点击结果条目时触发 item
        'focus', // 输入框获取到焦点时触发 —
        'blur',
        'preset-click'
    ],
    setup(props, { emit }) {
        const waitingChange = ref(false);
        const comLoading = computed(() => waitingChange.value || props.loading);
        // 是否在搜索状态：autoFixed下，展开为搜索状态
        const isSearching = ref(false);
        const inputVm = ref<ComponentPublicInstance & InputMethods | null>(null);
        const inputProps = computed(() => pick(props, [
            'modelValue',
            'theme',
            'placeholder',
            'clearable',
            'prefixIcon',
            'suffixIcon'
        ]));
        const searchbarStyle = computed(() => {
            const classList = [
                'som-searchbar',
                `som-searchbar--${props.theme}`,
                'flex',
                'flex-col',
                { 'fixed cover': isSearching.value }
            ];

            return {
                class: classList
            };
        });

        // 输入的值改变
        function updateModelValue(val) {
            emit('update:modelValue', val);
            props.debounce && (waitingChange.value = true);
        }
        // 聚焦
        function focusInput() {
            if (props.autoFixed) {
                isSearching.value = true;
            }
        }
        // input事件，收debounce影响
        function onInput(value: string, e: Event) {
            emit('input', value, e);
            waitingChange.value = false;
        }

        // 点击搜索
        function submit(e: Event) {
            preventDefault(e);
            emit('submit');
            cancel();
        }

        // 点击取消
        function cancel() {
            isSearching.value = false;
            emit('cancel');
        }

        // 获取 input 焦点
        function focus() {
            focusInput();
            inputVm.value?.focus();
        }

        // 取消搜索状态
        function blur() {
            isSearching.value = false;
        }

        const inputEvents: any = {
            'onUpdate:modelValue': updateModelValue,
            onInput
        };

        return {
            waitingChange,
            comLoading,
            isSearching,
            inputVm,
            inputProps,
            searchbarStyle,
            updateModelValue,
            focusInput,
            onInput,
            submit,
            cancel,
            focus,
            blur,
            inputEvents
        };
    }
};
</script>
