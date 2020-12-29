<style lang="less">
@block: som-form-item;

.@{block} {
    &__bottom--error {
        padding-left: var(--list-label-mr);
    }
    &__asterisk {
        .@{block}__label {
            &:before {
                content: '*';
                color: #ff1c24;
                font-size: 16px;
                width: 9px;
                margin-left: -9px;
                line-height: 22px;
            }
        }
    }
}
</style>

<template>
    <som-list-item
        :class="{
            'som-form-item': true,
            'som-form-item--error': isErrorStatus,
            'som-form-item__asterisk': showAsterisk,
            [comErrorClass]: isErrorStatus,
        }"
        v-bind="listItemProps"
        :isEllipsis="false"
        ref="listItem"
    >
        <template
            v-for="slot of Object.keys($slots)"
            #[slot]="data"
        >
            <slot
                :name="slot"
                v-bind="data"
            ></slot>
        </template>
        <template #bottom>
            <div
                v-if="comIfError && isErrorStatus"
                class="som-form-item__bottom--error warning mt4"
                :style="errorStyle"
            >
                <slot
                    name="error"
                    v-bind="validateErrInfo"
                >
                    {{ error || validateErrInfo.errors[0].message }}
                </slot>
            </div>
        </template>
    </som-list-item>
</template>

<script lang="ts">
import { ref, computed, CSSProperties } from 'vue';
import { pick, getDeepProp, isBoolean, isArray } from '@souche-vue3/souche-util-vue';
import Schema, { Rules, RuleItem } from 'async-validator';
import { ItemOrArray } from '@/common/types';
import { getPropsArr, noop } from '@/common/utils';
import { provideParent, joinChild, injectParent, comProps } from '@/common/composition/communicate';
import SomListItem from '@/components/list/list-item.vue';
import { FormItemName, FormItemProps, getEmptyErrInfo, IErrorInfo, ValidateResult } from './form-item-types';
import { FormName, FormValidateTrigger } from '../form/form-types';

/**
 * @param Slots.default
 * @param Slots.label
 * @param Slots.error
 * @param Slots.labelLeftIcon
 * @param Slots.labelRightIcon
 * @param Slots.rightIcon
 * @param Methods.validate
 * @param Methods.onFieldChange, // 表单组件change触发
 * @param Methods.onFieldBlur
 * @param Methods.resetField
 */
export default {
    name: FormItemName,
    props: FormItemProps,
    components: {
        SomListItem,
    },
    setup(props) {
        joinChild(FormName);
        provideParent(FormItemName);
        // todo: Form类型
        const { publicParent: formPub } = injectParent(FormName);
        const listItem = ref(null);
        const validateStatus = ref<ValidateResult>(''); // 校验状态
        const validateErrInfo = ref<IErrorInfo>(getEmptyErrInfo()); // 校验的错误信息
        // 合计属性
        const getComProp = comProps(props, formPub);
        const comLabelWidth = getComProp('labelWidth');
        const comHideRequiredAsterisk = getComProp('hideRequiredAsterisk', false, isBoolean);
        const comValidateTrigger = getComProp('validateTrigger', '');
        const comLabelMarginRight = getComProp('labelMarginRight');
        const comIfError = getComProp('ifError', false, isBoolean);
        const comErrorClass = getComProp('errorClass', '');
        const isErrorStatus = computed(() => props.error || validateStatus.value === 'error');
        const isRequired = computed(() => {
            const rules = getRules('');
            return rules.some((ruleItem) => ruleItem.required);
        });
        const showAsterisk = computed(() => isRequired.value && !comHideRequiredAsterisk.value);
        const errorStyle = computed(() => {
            const style: CSSProperties = {
                marginLeft: comLabelWidth.value,
            };

            if (comLabelMarginRight.value) {
                style.paddingLeft = comLabelMarginRight.value;
            }
            return style;
        });

        /**
         * @desc Methods
         */
        function setValidateResult(result: ValidateResult = '', errInfo: IErrorInfo = getEmptyErrInfo()) {
            validateStatus.value = result;
            validateErrInfo.value = errInfo;
        }

        function resetFiled() {
            setValidateResult();
        }

        /**
         * 获取过滤后的规则
         * 如果配置了允许的触发器validateTrigger, trigger需要和其一致
         * validateTrigger=submit 只有点击button（type=submit才能触发）或者手动传trigger=[submit|'']
         * @param trigger
         */
        function getRules(trigger: FormValidateTrigger) {
            let rules: RuleItem[] = [];
            if (props.required) {
                // 必填
                rules.push({
                    required: true,
                    message: props.errorMessage,
                });
            }
            if (props.rules) {
                rules = rules.concat(props.rules as ItemOrArray<RuleItem>);
            } else if (props.prop && formPub) {
                // 如果不存在则从formRules获取
                const formRules: Rules = formPub.rules;
                const propsArr = getPropsArr(props.prop);
                const selfRules = propsArr.reduce((result, prop) => {
                    const rule = result[prop];
                    return ((rule as RuleItem)?.fields as Rules) || rule;
                }, formRules);
                rules = rules.concat(selfRules || []);
            }

            // todo: 优化
            // todo: trigger过滤操作
            // 规则默认触发条件submit，submit表示都会触发；
            return rules.filter((rule) => {
                if (comValidateTrigger.value === 'submit') {
                    // 允许提交触发器，则过滤的触发器必须是空
                    return trigger === '' || trigger === 'submit';
                } else if (comValidateTrigger.value === '' || trigger === '' || comValidateTrigger.value === trigger) {
                    // 如果允许的触发器是空，则所有触发器都可以
                    if (!rule.trigger || !trigger) return true;
                    const ruleTrigger = isArray(rule.trigger) ? rule.trigger : [rule.trigger];
                    return ruleTrigger.includes(trigger);
                }
                return false;
            });
        }

        /**
         * 校验
         * @param cb
         */
        async function validate(cb = noop, trigger: FormValidateTrigger = '') {
            const rules = getRules(trigger);
            if (!rules.length) {
                resetFiled();
                return false;
            }

            const descriptor = { [props.prop]: rules };
            const validator = new Schema(descriptor);

            const model = {
                ...formPub.model, // emmm 这里方便自定义校验拿到source
                [props.prop]: getDeepProp(formPub.model, props.prop),
            };
            try {
                await validator.validate(model, { first: true });
                cb();
                setValidateResult();
                return Promise.resolve();
            } catch (e) {
                const { errors, fields } = e;
                // 内部错误
                if (!errors) {
                    console.error(e);
                    throw e;
                }
                const errInfo = { errors, fields };
                // 校验失败
                cb(errInfo);
                setValidateResult('error', errInfo);
                return Promise.reject(errInfo);
            }
        }

        /**
         * ! 自动校验逻辑
         * 内部的表单组件需要在对应实际出发这两个方法
         */
        function onFieldChange() {
            validate(noop, 'change').catch(() => { });
        }
        function onFieldBlur() {
            validate(noop, 'blur').catch(() => { });
        }

        const listItemProps = pick(props, [
            'label',
            'labelWidth',
            'labelMarginRight',
            'labelAlign',
            'labelLeftIcon',
            'labelRightIcon',
            'rightIcon',
            'inlineDesc',
            'align',
            'itemClass',
            'labelAlignVertical',
            'isLink'
        ] as any);

        return {
            listItem,
            validate, // 校验
            onFieldChange, // 表单组件change触发
            onFieldBlur, // 表单组件blur触发
            resetFiled, // 重置校验错误
            listItemProps,
            errorStyle,
            validateStatus,
            validateErrInfo,
            comLabelWidth,
            comHideRequiredAsterisk,
            comValidateTrigger,
            comLabelMarginRight,
            comIfError,
            comErrorClass,
            isErrorStatus,
            isRequired,
            showAsterisk,
        };
    },
};
</script>
