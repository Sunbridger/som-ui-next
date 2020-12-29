<style lang="less">
.pg-component-input {
    .double-input-wrapper {
        margin: -5px 0;
    }
    .double-input {
        width: 70px;
        box-sizing: border-box;
        padding: 4px 4px;
        border-radius: 8px;
        border: 1px solid #d7d7db;
    }
    .double-line {
        margin: 0 4px;
        width: 8px;
        height: 1px;
        background: #d7d7db;
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
    <div class="pg-component-input bg-page pb24">
        <co-wrapper title="基本使用">
            <som-form>
                <som-form-item label="文本">
                    <som-input type="text" v-model="baseIpts[0]"></som-input>
                </som-form-item>
                <som-form-item label="带单位">
                    <som-input type="text" v-model="baseIpts[1]"></som-input>
                    <template #rightIcon>
                        <div class="fs16 text-title">单位</div>
                    </template>
                </som-form-item>
                <som-form-item label="多行文本多行文本">
                    <som-input type="text" v-model="baseIpts[2]"></som-input>
                </som-form-item>
            </som-form>
        </co-wrapper>

        <co-wrapper title="必填提示">
            <som-form>
                <som-form-item
                    label="文本"
                    errorClass="custom-error-class"
                    required
                    error>
                    <som-input v-model="requiredIpts[0]"></som-input>
                </som-form-item>
            </som-form>
        </co-wrapper>

        <co-wrapper title="自定义类型">
            <som-form>
                <som-form-item label="文本">
                    <som-input
                        type="text"
                        placeholder="请输入文本"
                        v-model="customTypeIpts[0]"></som-input>
                </som-form-item>
                <som-form-item label="手机号">
                    <som-input
                        type="tel"
                        placeholder="请输入手机号"
                        maxlength="11"
                        v-model="customTypeIpts[1]"></som-input>
                </som-form-item>
                <som-form-item label="数字">
                    <som-input
                        type="number"
                        placeholder="请输入数字（支持小数）"
                        v-model="customTypeIpts[2]"
                        v-format="formatNum"></som-input>
                </som-form-item>
                <som-form-item label="密码">
                    <som-input
                        type="password"
                        placeholder="请输入密码"
                        v-model="customTypeIpts[3]"
                        showPassword></som-input>
                </som-form-item>
                <som-form-item label="选择" isLink>
                    <div class="text-title">选择待接入</div>
                </som-form-item>
                <som-form-item label="多段文本框" labelAlignVertical="center">
                    <div class="double-input-wrapper flex flex-align-center">
                        <som-input type="tel" class="double-input" placeholder=""></som-input>
                        <div class="double-line"></div>
                        <som-input type="tel" class="double-input" placeholder=""></som-input>
                        <span class="ml16 text-title">万</span>
                    </div>
                </som-form-item>
                <som-form-item label="文本框">
                    <som-input
                        type="textarea"
                        v-model="customTypeIpts[4]"
                        maxlength="100"
                        showWordLimit></som-input>
                </som-form-item>
            </som-form>
        </co-wrapper>

        <co-wrapper title="禁用输入框">
            <som-form>
                <som-form-item label="只读">
                    <som-input
                        type="text"
                        placeholder="请输入文本"
                        modelValue="输入框只读"
                        readonly></som-input>
                </som-form-item>
                <som-form-item label="禁用">
                    <som-input
                        placeholder="输入框禁用"
                        disabled></som-input>
                </som-form-item>
            </som-form>
        </co-wrapper>

        <co-wrapper title="自适应文本">
            <div class="padding-x-16">
                <som-input
                    type="textarea"
                    v-model="resizeIpts[0]"
                    theme="light"
                    rows="1"
                    autosize></som-input>
            </div>
        </co-wrapper>

        <co-wrapper title="文本框字数统计">
            <div class="padding-x-16 padding-y-12" style="background: #fff">
                <som-input
                    type="textarea"
                    v-model="countIpts[0]"
                    theme="dark"
                    showWordLimit
                    maxlength="100"></som-input>
            </div>
        </co-wrapper>

        <co-wrapper title="输入框事件">
            <som-form>
                <som-form-item label="文本">
                    <som-input
                        v-model="eventIpts[0]"
                        @focus="log('触发focus')"
                        @blur="log('触发blur')"
                        @input="(...args) => log('触发input', args)"
                        @change="(...args) => log('触发change', args)"
                        @enter="(...args) => log('触发enter', args)"></som-input>
                </som-form-item>
            </som-form>
        </co-wrapper>

        <co-wrapper title="输入延迟触发 debounce">
            <som-form>
                <som-form-item label="文本">
                    <som-input
                        v-model="debounceIpts[0]"
                        :debounce="1000"
                        @input="(...args) => log('debounce', args)"></som-input>
                </som-form-item>
            </som-form>
        </co-wrapper>
    </div>
</template>
<script>
import CoWrapper from '../common/wrapper.vue';

export default {
    data() {
        return {
            baseIpts: [],
            requiredIpts: [],
            customTypeIpts: [],
            resizeIpts: [],
            countIpts: [],
            eventIpts: [],
            debounceIpts: []
        };
    },
    components: {
        CoWrapper
    },
    methods: {
        log(...args) {
            console.log(...args);
        },
        formatNum(v) {
            return v.replace(/^([0-9][.\d]*)?.*/, '$1');
        }
    }
};
</script>
