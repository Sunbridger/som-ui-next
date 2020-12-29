<style lang="less">
@import '~@/styles/components/input/var.less';
@block: som-input;

.@{block} {
    &--theme-dark,
    &--theme-light {
        .@{block}__input-wrapper {
            border-radius: 100px;
            padding: 4px 16px;
        }
        .@{block}__textarea-wrapper {
            padding-top: 16px;
        }
        .@{block}__textarea {
            padding: 0 16px;
            &-wordlimit {
                padding: 8px 18px 8px;
            }
        }
        .@{block}__input,
        .@{block}__textarea {
            font-size: var(--input-theme-fs);
        }
    }
    &--theme-dark {
        .@{block}__input-wrapper {
            background: var(--background-page);
        }
        .@{block}__textarea-wrapper {
            background: var(--background-page);
        }
        
    }
    &--theme-light {
        .@{block}__input-wrapper {
            background: #fff;
        }
        .@{block}__textarea-wrapper {
            background: #fff;
        }
    }

    &__input,
    &__textarea {
        padding: 0;
        border: 0;
        outline: 0;
        font-size: var(--input-fs);
        line-height: 22px;
        display: inline-block;
        width: 100%;
        background: transparent;
    }

    &__textarea-wrapper {
        position: relative;
        border-radius: 12px; // todo
    }
    &__textarea {
        display: block;

        &-wordlimit {
            line-height: 1;
            padding-top: 10px;
            text-align: right;
            font-size: 12px;
            &-count {
                font-style: normal;
            }
        }
    }

    input[type="search"]::-webkit-search-cancel-button{
        display: none;
    }
    input, textarea {
        color: var(--input-color);
        caret-color: var(--input-caret-color);
        &::placeholder {
            color: var(--input-placeholder-color);
        }
        &:disabled {
            opacity: 1;
            color: var(--input-disabled-color);
            -webkit-text-fill-color: var(--input-disabled-color);
        }
    }
    textarea {
        resize: none;
    }
}
</style>

<template>
    <div :class="[
        'som-input lh20',
        `som-input--theme-${theme}`,
    ]">
        <div
            v-if="isTextarea"
            class="som-input__textarea-wrapper"
        >
            <textarea
                class="som-input__textarea"
                v-bind="commonAttr"
                :value="modelValue"
                ref="textareaVm"
            ></textarea>
            <div class="som-input__textarea-wordlimit">
                <div
                    v-if="showWordLimit"
                    class="som-input__textarea-wordlimit-wrapper"
                >
                    <i class="som-input__textarea-wordlimit-count">{{modelValue ? modelValue.length : 0}}</i>{{maxStr}}
                </div>
            </div>
        </div>
        <div
            v-else
            class="som-input__input-wrapper flex flex-align-center"
        >
            <custom-icon
                class="mr4"
                :icon="prefixIcon"
            >
                <slot name="prefix"></slot>
            </custom-icon>
            <input
                class="som-input__input flex1"
                v-bind="commonAttr"
                :value="modelValue"
                :type="inputType"
                ref="inputVm"
                @keyup="onKeyup"
            />
            <custom-icon
                class="ml4"
                :icon="suffixIcon"
            >
                <slot name="suffix"></slot>
            </custom-icon>
            <custom-icon
                v-if="type === 'password' && showPassword && modelValue"
                @click="togglePasswordVisiable"
            >
                <!-- eslint-disable -->
                <svg
                    v-if="passwordVisiable"
                    t="1606112487127"
                    class="icon"
                    style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden; color: black"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="2969"
                >
                    <path
                        d="M941.677 391.71c9.338-14.006 6.225-32.681-6.225-43.575-14.006-10.894-32.681-7.781-43.575 6.225-1.557 1.556-174.3 205.426-379.728 205.426-199.2 0-379.727-205.426-381.283-206.982-10.895-12.45-31.125-14.006-43.576-3.113-12.45 10.894-14.006 31.125-3.113 43.576 3.113 4.668 40.463 46.687 99.6 93.375l-79.37 82.482c-12.45 12.45-10.893 32.681 1.557 43.575 3.113 6.225 10.894 9.338 18.676 9.338 7.78 0 15.562-3.113 21.787-9.338l85.594-88.706c40.463 28.013 88.707 54.47 141.62 73.144l-32.682 110.495c-4.668 17.118 4.67 34.237 21.788 38.906h9.337c14.006 0 26.457-9.338 29.569-23.344l32.681-110.495c24.9 4.669 51.357 7.782 77.813 7.782s52.913-3.113 77.814-7.782l32.68 108.939c3.114 14.006 17.12 23.343 29.57 23.343 3.113 0 6.225 0 7.782-1.556 17.118-4.67 26.456-21.787 21.788-38.906L649.099 595.58c52.914-18.676 101.157-45.132 141.62-73.144l84.038 87.15c6.225 6.225 14.006 9.338 21.787 9.338 7.781 0 15.563-3.113 21.787-9.337 12.45-12.451 12.45-31.125 1.557-43.576l-79.37-82.481c63.808-46.689 101.16-91.82 101.16-91.82z"
                        p-id="2970"
                        fill="#2c2c2c"
                    ></path>
                </svg>
                <svg
                    v-else
                    t="1606111201794"
                    class="icon"
                    style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden; color: black"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="2631"
                >
                    <path
                        d="M512 170.666667C298.666667 170.666667 116.48 303.36 42.666667 490.666667 116.48 677.973333 298.666667 810.666667 512 810.666667s395.52-132.693333 469.333333-320C907.52 303.36 725.333333 170.666667 512 170.666667z m0 533.333333c-117.76 0-213.333333-95.573333-213.333333-213.333333s95.573333-213.333333 213.333333-213.333334 213.333333 95.573333 213.333333 213.333334-95.573333 213.333333-213.333333 213.333333z m0-341.333333c-70.826667 0-128 57.173333-128 128s57.173333 128 128 128 128-57.173333 128-128-57.173333-128-128-128z"
                        fill="#959BA7"
                        p-id="2632"
                    ></path>
                </svg>
                <!-- eslint-enable -->
            </custom-icon>
            <custom-icon
                v-if="!comDisabled && clearable && modelValue"
                class="ml4"
                @click="$emit('update:modelValue', '')"
            >
                <!-- eslint-disable -->
                <svg
                    t="1606197714985"
                    class="icon"
                    style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="1813"
                >
                    <path
                        d="M512 85.333333C276.48 85.333333 85.333333 276.48 85.333333 512S276.48 938.666667 512 938.666667 938.666667 747.52 938.666667 512 747.52 85.333333 512 85.333333z m136.533333 531.342223c11.377778 11.377778 11.377778 29.582222 0 39.822222-5.688889 5.688889-12.515556 7.964444-20.48 7.964444s-14.791111-2.275556-20.48-7.964444L512 559.786667l-96.711111 96.711111c-5.688889 5.688889-12.515556 7.964444-20.48 7.964444s-14.791111-2.275556-20.48-7.964444c-11.377778-11.377778-11.377778-29.582222 0-39.822222l96.711111-96.711112-104.675556-104.675555c-11.377778-11.377778-11.377778-29.582222 0-39.822222 11.377778-11.377778 29.582222-11.377778 39.822223 0l104.675555 104.675555 104.675556-104.675555c11.377778-11.377778 29.582222-11.377778 39.822222 0 11.377778 11.377778 11.377778 29.582222 0 39.822222l-104.675556 104.675555 97.848889 96.711112z"
                        p-id="1814"
                        fill="#515151"
                        data-spm-anchor-id="a313x.7781069.0.i0"
                    ></path>
                </svg>
                <!-- eslint-enable -->
            </custom-icon>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, InputHTMLAttributes, ref, CSSProperties, watchEffect, nextTick, computed, watch, onMounted } from 'vue';
import { isBoolean, debounce } from '@souche-vue3/souche-util-vue';
import { CustomIcon } from '@/common/utils/form';
import { injectParent } from '@/common/composition/communicate';
import { asserts } from '@/common/utils';
import { InputName, InputProps } from './input-types';
import { FormName } from '../form/form-types';
import { FormItemMethods, FormItemName } from '../form-item/form-item-types';

/**
 * @params Slots.prefix
 * @params Slots.suffix
 * @params Events.blur
 * @params Events.focus
 * @params Events.change 仅在输入框失去焦点或用户按下回车时触发
 * @params Events.input 在值改变时触发，受debounce影响
 * @params Methods.focus
 * @params Methods.blur
 * @params Methods.select
 * @params Attrs.maxlength // textarea特殊处理
 * @params Attrs.rows // type=textarea
 */
export default defineComponent({
    name: InputName,
    props: InputProps,
    components: {
        CustomIcon
    },
    emits: [
        'input',
        'change',
        'blur',
        'focus',
        'enter',
        'update:modelValue'
    ],
    setup(props, { emit, attrs }) {
        const { publicParent: formPub } = injectParent(FormName);
        const { publicParent: formItemPub } = injectParent<FormItemMethods>(FormItemName);
        const textareaVm = ref<HTMLTextAreaElement | null>(null);
        const inputVm = ref<HTMLInputElement | null>(null);
        const passwordVisiable = ref(false);
        const isTextarea = computed(() => props.type === 'textarea');
        const targetEl = computed(() => (isTextarea.value ? textareaVm.value : inputVm.value));
        const inputType = computed(() => (props.showPassword && passwordVisiable.value ? 'text' : props.type));
        const comDisabled = computed(() => props.disabled || formPub?.disabled);
        // todo input attrs
        // style、class不继承到input上
        const inputAttrs = computed(() => Object.keys(attrs).reduce((result, attr) => {
            if (['style', 'class'].includes(attr)) {
                return result;
            }
            result[attr] = attrs[attr];
            return result;
        }, {}));
        const maxStr = computed(() => {
            const maxlength = attrs.maxlength;
            return maxlength ? `/${maxlength}` : '';
        });
        const computedStyle = ref<CSSProperties>({});

        watch(() => props.modelValue, () => {
            if (props.validateEvent) {
                formItemPub?.onFieldChange();
            }
        });

        watchEffect(() => {
            if (isTextarea.value && props.modelValue) {
                // 高度设置
                calcTextareaHeight();
            }
        });

        // 设置textarea的高度
        function calcTextareaHeight() {
            if (!props.autosize) return false;
            // 赋空是为了得到scrollHeight
            computedStyle.value.height = '';
            nextTick(() => {
                computedStyle.value.height = textareaVm.value ? `${textareaVm.value.scrollHeight}px` : '';
            });
        }

        // 限制文本框的高度范围
        function limitTextareaHeight() {
            // 确保textarea
            asserts(textareaVm.value);
            const style = computedStyle.value;
            if (isBoolean(props.autosize)) {
                // 高度自适应
            } else if (props.autosize.minHeight || props.autosize.maxHeight) {
                const { minHeight = '', maxHeight = '' } = props.autosize;
                style.minHeight = minHeight;
                style.maxHeight = maxHeight;
            } else if (props.autosize.minRows || props.autosize.maxRow) {
                // 根据行数设置文本框的高度范围
                const textareaComputedStyle = getComputedStyle(textareaVm.value);
                const [
                    lineHeight,
                    paddingTop,
                    paddingBottom,
                    borderTopWidth,
                    borderBottomWidth,
                    boxSizing
                ] = [
                    'line-height',
                    'padding-top',
                    'padding-bottom',
                    'border-top-width',
                    'border-bottom-width',
                    'box-sizing'
                ].map(prop => textareaComputedStyle.getPropertyValue(prop));

                // 根据盒子模型
                // border-box: 内容 + padding + border
                const baseHeight = boxSizing === 'border-box' ?
                    ` + ${borderTopWidth} + ${borderBottomWidth} + ${paddingTop} + ${paddingBottom}` :
                    '';

                if (props.autosize.minRows) {
                    style.minHeight = `calc(${props.autosize.minRows} * ${lineHeight}${baseHeight})`;
                }
                if (props.autosize.maxRows) {
                    style.maxHeight = `calc(${props.autosize.maxRows} * ${lineHeight}${baseHeight})`;
                }
            }
        }

        // debounce to input
        const emitIpt = (val: string, e?: Event) => emit('input', val, e);
        const triggerIpt = props.debounce === 0 ?
            emitIpt :
            debounce(props.debounce, emitIpt);

        /**
         * 输入框输入事件
         * @param value
         */
        function onInput(e: Event) {
            const value = (e.target as any).value;
            if (isTextarea.value) {
                calcTextareaHeight();
            }
            emit('update:modelValue', value);
            triggerIpt(value, e);
            // if (props.validateEvent) {
            //     formItemPub?.onFieldChange();
            // }
        }
        /**
         * @param value
         */
        function onChange(e: Event) {
            const value = (e.target as any).value;
            emit('change', value, e);
            // formItemPub?.onFieldBlur();
        }
        function onFocus(e: Event) {
            emit('focus', e);
        }
        function onBlur(e: Event) {
            emit('blur', e);
            formItemPub?.onFieldBlur();
        }
        function onEnter(e: Event) {
            const value = (e.target as any).value;
            emit('enter', value, e);
        }
        function onKeyup(e: KeyboardEvent) {
            if (e.key === 'Enter') {
                blur();
                onEnter(e);
            }
        }
        function focus() {
            targetEl.value?.focus();
        }
        function blur() {
            targetEl.value?.blur();
        }
        function select() {
            targetEl.value?.select();
        }
        // 切换密码的可视状态
        function togglePasswordVisiable() {
            passwordVisiable.value = !passwordVisiable.value;
        }

        const commonAttr: InputHTMLAttributes = {
            ...inputAttrs.value,
            style: computedStyle.value,
            placeholder: props.placeholder,
            disabled: comDisabled.value,
            // 无效
            // value: props.modelValue,
            onFocus,
            onBlur,
            onInput,
            onChange
        };

        onMounted(() => {
            // 限制textarea的高度
            watch(() => props.autosize, () => {
                if (isTextarea.value) {
                    limitTextareaHeight();
                }
            }, { immediate: true });
        });

        return {
            focus,
            blur,
            select,
            commonAttr,
            textareaVm,
            inputVm,
            passwordVisiable,
            isTextarea,
            targetEl,
            inputType,
            comDisabled,
            inputAttrs,
            maxStr,
            computedStyle,
            onKeyup,
            togglePasswordVisiable
        };
    }
});
</script>
