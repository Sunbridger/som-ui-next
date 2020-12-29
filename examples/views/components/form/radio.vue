<template>
    <div class="pg-component-radio bg-page pb32">
        <co-wrapper title="基本使用">
            <som-form>
                <som-form-item label="性别">
                    <som-radio-group v-model="baseRadios[0]">
                        <som-radio value="0">男</som-radio>
                        <som-radio value="1">女</som-radio>
                    </som-radio-group>
                </som-form-item>
            </som-form>
        </co-wrapper>

        <co-wrapper title="布局">
            <som-form>
                <som-form-item label="水平布局">
                    <som-radio-group v-model="layoutRadios[0]">
                        <som-radio value="0">选项一</som-radio>
                        <som-radio value="1">选项二</som-radio>
                        <som-radio value="2">选项三</som-radio>
                        <som-radio value="3">选项四</som-radio>
                    </som-radio-group>
                </som-form-item>
                <som-form-item label="纵向布局">
                    <som-radio-group v-model="layoutRadios[1]" direction="vertical">
                        <som-radio value="0">🐥🐥🐥🐥🐥</som-radio>
                        <som-radio value="1">🦆🦆🦆🦆🦆</som-radio>
                        <som-radio value="2">🐱🐱🐱🐱🐱</som-radio>
                    </som-radio-group>
                </som-form-item>
            </som-form>
        </co-wrapper>

        <co-wrapper title="传参形式">
            <som-radio-group
                :options="options1"
                v-model="styleRadios[0]"
                mode="icon"></som-radio-group>
        </co-wrapper>

        <co-wrapper title="mode=icon内置样式(style2)">
            <som-radio-group
                :options="options2"
                v-model="styleRadios[1]"
                mode="icon"
                inlineStyle="style2"></som-radio-group>
        </co-wrapper>

        <co-wrapper title="mode=icon内置样式(style3)">
            <som-radio-group
                :options="options2"
                v-model="styleRadios[2]"
                mode="icon"
                inlineStyle="style3"></som-radio-group>
        </co-wrapper>

        <co-wrapper title="RadioGroup自定义slots">
            <som-radio-group
                :options="new Array(2).fill('').map((i, idx) => `选项${idx + 1}`)"
                direction="horizontal"
                mode="icon"
                inlineStyle="style1"
                v-model="customRadios[0]">
                <template #itemKey="{ key }">自定义标签: {{key}}</template>
                <template #icon>
                    <img
                        width="20"
                        src="https://assets.souche.com/assets/sccimg/BorderCollie.jpg" alt="">
                </template>
                <template #checkedIcon="{ checked }">{{checked}}</template>
            </som-radio-group>
        </co-wrapper>

        <co-wrapper title="Radio自定义slots">
            <som-radio-group
                direction="horizontal"
                mode="icon"
                inlineStyle="style1"
                v-model="customRadios[1]">
                <som-radio value="1">
                    选项一
                    <template #icon>
                        <img
                            width="20"
                            src="https://assets.souche.com/assets/sccimg/BorderCollie.jpg" alt="">
                    </template>
                    <template #checkedIcon="{ checked }">
                        {{checked}}
                    </template>
                </som-radio>
                <som-radio value="2" inlineDesc="慎重选择">
                    选项二
                    <template #icon>
                        <img
                            width="20"
                            src="https://assets.souche.com/assets/sccimg/BorderCollie.jpg" alt="">
                    </template>
                    <template #checkedIcon="{ checked }">
                        {{checked}}
                    </template>
                </som-radio>
            </som-radio-group>
        </co-wrapper>

        <co-wrapper title="自定义标签">
            <som-radio-group v-model="customRadios[2]" mode="icon" style="background: #fff;">
                <som-tag-group>
                    <som-radio
                        v-for="i in 4"
                        :key="i"
                        :value="i">
                        <template #fullItem="{ checked }">
                            <som-tag :type="checked ? 'selected' : ''">标签{{i}}</som-tag>
                        </template>
                    </som-radio>
                </som-tag-group>
            </som-radio-group>
        </co-wrapper>

        <co-wrapper title="disabled">
            <som-radio-group
                :options="new Array(2).fill('').map((i, idx) => `选项${idx + 1}`)"
                direction="horizontal"
                mode="icon"
                inlineStyle="style1"
                modelValue="选项1"
                disabled></som-radio-group>
        </co-wrapper>
    </div>
</template>

<script>
import CoWrapper from '../common/wrapper.vue';

export default {
    data() {
        return {
            baseRadios: [],
            layoutRadios: [],
            styleRadios: [],
            customRadios: [],
            options1: [
                {
                    key: '选项一',
                    value: 1,
                    icon: 'icon'
                },
                {
                    key: '选项二',
                    value: 2,
                    icon: 'icon'
                }
            ],
            options2: [
                {
                    key: '选项一',
                    value: 1
                },
                {
                    key: '选项二',
                    value: 2
                }
            ]
        };
    },
    components: {
        CoWrapper
    }
};
</script>
