<template>
    <div class="som-form">
        <som-list v-bind="listProps">
            <slot></slot>
        </som-list>
        <slot name="bottom"></slot>
    </div>
</template>

<script lang="ts">
import { ComponentPublicInstance, watch } from 'vue';
import { pick } from '@souche-vue3/souche-util-vue';
import { noop } from '@/common/utils';
import { provideParent, collectChildren } from '@/common/composition/communicate';
import { ItemOrArray } from '@/common/types';
import SomList from '@/components/list/list.vue';
import { FormName, FormProps, FormValidateTrigger } from './form-types';
import { FormItemMethods } from '../form-item/form-item-types';

/**
 * @param Methods.validate
 * @param Methods.validateField
 * @param Methods.addFormItem
 * @param Methods.rmFormItem
 * @param Methods.submit
 * @param Methods.resetField
 * @param Slots.bottom
 */
export default {
    name: FormName,
    props: FormProps,
    emits: [
        'submit'
    ],
    components: {
        SomList
    },
    setup(props, { emit }) {
        // 提供form实例
        provideParent(FormName);
        const { publicChildren: formItemChildrenPub } = collectChildren<FormItemMethods>();

        // 提取list的props
        const listProps = pick(
            props,
            [
                'labelWidth',
                'labelAlign',
                'labelMarginRight',
                'align',
                'borderIndent',
                'itemClass',
                'labelAlignVertical'
            ]
        );

        // ! validateOnRuleChange只有首次赋值有效
        if (props.validateOnRuleChange) {
            watch(() => props.rules, () => {
                validate();
            });
        }

        // 滚动到报错位置
        function scrollToErrorEl(el: HTMLElement) {
            props.scrollToError && el.scrollIntoView();
        }

        /**
         * 校验指定的prop
         * @param ps props列表
         * @param cb 回调函数
         * @param trigger 触发器
         */
        async function validateField(ps: string[], cb = noop, trigger: ItemOrArray<FormValidateTrigger> = '') {
            const errorFormItem: ComponentPublicInstance[] = [];
            const errorList: any[] = [];
            const fieldList: any[] = [];
            for (const formItem of formItemChildrenPub.value.filter(i => ps.includes(i.prop))) {
                try {
                    await formItem.validate(noop, trigger);
                } catch (e) {
                    const { errors, fields } = e;
                    errorFormItem.push(formItem);
                    errorList.push(errors);
                    fieldList.push(fields);
                    // 如果第一次报错则退出
                    if (props.validateFirst) {
                        break;
                    }
                }
            }
            const result = { errors: errorList, fields: fieldList };

            if (errorList.length) {
                // 校验失败
                cb(result);
                scrollToErrorEl(errorFormItem[0].$el);
                return Promise.reject(result);
            } else {
                // 校验成功
                cb();
                return Promise.resolve();
            }
        }
        async function validate(cb = noop, trigger: ItemOrArray<FormValidateTrigger> = '') {
            return validateField(formItemChildrenPub.value.map(i => i.prop), cb, trigger);
        }
        // 重置校验错误
        function resetFields() {
            formItemChildrenPub.value.forEach(i => i.resetFiled());
        }
        // button中会用到
        function submit() {
            validate((result => emit('submit', result, props.model)));
        }

        return {
            listProps,
            validate,
            validateField,
            submit,
            resetFields
        };
    }
};
</script>
