<style lang="less">
.pg-component-form {
    .verification-code {
        line-height: 22px;
        padding-left: 14px;
        .border-left(#ebedf0);
        color: var(--primary);
    }
    .custom-error-class {
        input,
        input::placeholder {
            color: var(--primary);
        }
    }
}
</style>

<template>
    <div class="pg-component-form bg-page pb32">
        <co-wrapper title="基本使用">
            <som-form :model="baseForm" errorClass="custom-error-class">
                <som-form-item
                    prop="name1"
                    label="用户输入"
                    validateTrigger="blur"
                    :rules="[
                        {
                            type: 'string',
                            required: true
                        }
                    ]">
                    <som-input type="text" v-model="baseForm.name1"/>
                </som-form-item>
                <som-form-item label="用户输入">
                    <som-input type="text" v-model="baseForm.name2"/>
                </som-form-item>
                <template #bottom>
                    <div class="padding-x-16 padding-y-12">
                        <som-button action-type="submit">确认</som-button>
                    </div>
                </template>
            </som-form>
        </co-wrapper>

        <co-wrapper title="规则校验">
            <som-form
                :model="form"
                :rules="rules"
                @submit="submit(true, $event)">
                <som-form-item
                    label="姓名"
                    prop="name">
                    <som-input type="text" v-model="form.name"/>
                </som-form-item>
                <som-form-item
                    label="性别"
                    prop="gender">
                    <som-radio-group v-model="form.gender">
                        <som-radio value="0">男</som-radio>
                        <som-radio value="1">女</som-radio>
                    </som-radio-group>
                </som-form-item>
                <som-form-item
                    label="喜好"
                    prop="hobbies">
                    <som-checkbox-group v-model="form.hobbies" direction="vertical">
                        <som-checkbox value="0">🐈🐈🐈🐈🐈🐈</som-checkbox>
                        <som-checkbox value="1">🐩🐩🐩🐩🐩🐩</som-checkbox>
                        <som-checkbox value="2">🐎🐎🐎🐎🐎🐎</som-checkbox>
                    </som-checkbox-group>
                </som-form-item>
                <som-form-item
                    label="备注"
                    prop="ext">
                    <som-input type="textarea" v-model="form.ext"></som-input>
                </som-form-item>
                <template #bottom>
                    <div class="padding-x-16 padding-y-12">
                        <som-button action-type="submit">确认</som-button>
                    </div>
                </template>
            </som-form>
        </co-wrapper>

        <co-wrapper title="报错样式">
            <som-form
                validateTrigger=""
                :model="errorStyleForm"
                :rules="errorStyleRules"
                ref="errorStyleForm">
                <som-form-item
                    errorClass="custom-error-class"
                    label="警告样式"
                    prop="name">
                    <som-input type="text" v-model="errorStyleForm.name"/>
                </som-form-item>
                <som-form-item
                    errorClass="custom-error-class"
                    label="内联提示"
                    prop="name2"
                    :ifError="true">
                    <som-input type="text" v-model="errorStyleForm.name2"/>
                </som-form-item>
            </som-form>
        </co-wrapper>

        <co-wrapper title="表单类型">
            <som-form>
                <som-form-item label="输入框">
                    <som-input type="text" v-model="typesForm.name" />
                </som-form-item>
                <som-form-item label="单选">
                    <som-radio-group v-model="typesForm.radio">
                        <som-radio value="1">单选项1</som-radio>
                        <som-radio value="2">单选项1</som-radio>
                    </som-radio-group>
                </som-form-item>
                <som-form-item label="复选">
                    <som-checkbox-group v-model="typesForm.checkbox">
                        <som-checkbox value="1">复选项1</som-checkbox>
                        <som-checkbox value="2">复选项1</som-checkbox>
                    </som-checkbox-group>
                </som-form-item>
                <som-form-item label="选择项" isLink>
                    <som-input
                        type="text"
                        :modelValue="typesForm.select"
                        readonly
                        placeholder="点击选择"
                        @click="showInfo.select = true" />
                </som-form-item>
                <som-form-item label="选择日期" isLink>
                    <som-input
                        type="text"
                        :modelValue="typesForm.time"
                        readonly
                        placeholder="点击选择"
                        @click="showInfo.time = true" />
                </som-form-item>
            </som-form>
            <som-popup v-model:show="showInfo.select">
                <som-picker
                    :columns="selectList"
                    @cancel="selectCancel('select')"
                    @confirm="selectConfirm($event, 'select')"></som-picker>
            </som-popup>
            <som-popup v-model:show="showInfo.time">
                <som-date-picker
                    @cancel="selectCancel('time')"
                    @confirm="selectConfirm($event, 'time')"
                    title="选择年月日"></som-date-picker>
            </som-popup>
        </co-wrapper>

        <co-wrapper title="禁用">
            <som-form
                :model="form3"
                disabled>
                <som-form-item label="地址">
                    <som-input type="text" v-model="form3.address" />
                </som-form-item>
                <som-form-item label="接送方式">
                    <som-radio-group v-model="form3.way">
                        <som-radio value="0">直升机</som-radio>
                        <som-radio value="1">三轮车</som-radio>
                    </som-radio-group>
                </som-form-item>
                <som-form-item label="额外需求">
                    <som-checkbox-group v-model="form3.ext"  direction="vertical">
                        <som-checkbox value="0">🐈🐈🐈🐈🐈🐈</som-checkbox>
                        <som-checkbox value="1">🐩🐩🐩🐩🐩🐩</som-checkbox>
                        <som-checkbox value="2">🐎🐎🐎🐎🐎🐎</som-checkbox>
                    </som-checkbox-group>
                </som-form-item>
            </som-form>
        </co-wrapper>
    </div>
</template>

<script lang="ts">
import { isPhone, remainTime } from '@souche-vue3/souche-util-vue';
import CoWrapper from '../common/wrapper.vue';
import { Form } from '../../../../types';

export default {
    data() {
        return {
            baseForm: {},
            form: {
                name: '',
                gender: '',
                hobbies: [],
                ext: ''
            },
            form2: {
                phone: '',
                password: '',
                surePassword: '',
                code: ''
            },
            form3: {
                address: '中国浙江省杭州市',
                way: '0',
                ext: ['0', '1']
            },
            rules: {
                name: {
                    type: 'string',
                    required: true,
                    message: '请输入姓名'
                },
                gender: {
                    type: 'string',
                    required: true,
                    message: '请选择性别'
                },
                hobbies: {
                    type: 'array',
                    // min: 1,
                    required: true,
                    message: '请选择喜好'
                }
            },
            rules2: {
                phone: [
                    {
                        type: 'string',
                        required: true,
                        message: '请输入手机号'
                    },
                    {
                        validator(rule, value, cb) {
                            cb(isPhone(value) ? '' : '请输入正确的手机号');
                        }
                    }
                ],
                password: {
                    type: 'string',
                    required: true,
                    message: '请输入密码'
                },
                surePassword: [
                    {
                        type: 'string',
                        required: true,
                        message: '请输入密码'
                    },
                    {
                        trigger: 'submit',
                        validator(rule, value, cb, source) {
                            cb(source.password === source.surePassword ? '' : '两次密码不一样');
                        }
                    }
                ]
            },
            errorStyleForm: {
                name: '',
                name2: ''
            },
            errorStyleRules: {
                name: [
                    {
                        type: 'string',
                        required: true,
                        message: '必填'
                    },
                    {
                        type: 'string',
                        min: 2,
                        message: '长度大于2'
                    }
                ],
                name2: [
                    {
                        type: 'string',
                        required: true,
                        message: '必填'
                    },
                    {
                        type: 'string',
                        min: 2,
                        message: '长度不小于2'
                    }
                ]
            },
            typesForm: {
                input: '',
                radio: '',
                checkbox: [],
                select: '',
                time: ''
            },
            selectList: new Array(8).fill('').map((i, idx) => `选择${idx + 1}`),
            count: 0,
            sendFlag: false,
            showInfo: {
                select: false,
                time: false
            }
        };
    },
    computed: {
        codeMsg() {
            if (this.count > 0) {
                return `${this.count}s后重发`;
            }
            return this.sendFlag ? '重新发送' : '发送验证码';
        }
    },
    components: {
        CoWrapper
    },
    methods: {
        submit(showToast, err) {
            if (err) {
                showToast && this.$som.toast.text(err.errors[0][0].message);
                return false;
            }
            this.$som.toast.text('提交成功');
        },
        send() {
            if (this.count > 0) {
                return false;
            }
            remainTime(0, 60000, (info) => {
                const { minutes, seconds } = info;
                this.count = minutes ? 60 : seconds;
            });
        },
        selectCancel(field) {
            this.showInfo[field] = false;
        },
        selectConfirm(v, field) {
            this.typesForm[field] = v.join?.('-') || v;
            this.selectCancel(field);
        }
    },
    mounted() {
        (this.$refs.errorStyleForm as Form).validate();
    }
};
</script>
