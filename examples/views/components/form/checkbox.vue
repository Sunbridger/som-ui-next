<template>
    <div class="pg-component-checkbox bg-page pb32">
        <co-wrapper title="基本使用">
            <som-list-item labelWidth="0">
                <som-checkbox v-model="baseCheckbox">复选框</som-checkbox>
            </som-list-item>
        </co-wrapper>

        <co-wrapper title="布局">
            <som-form>
                <som-form-item label="水平布局">
                    <som-checkbox-group v-model="layoutCheckboxs[0]">
                        <som-checkbox value="0">男</som-checkbox>
                        <som-checkbox value="1">女</som-checkbox>
                    </som-checkbox-group>
                </som-form-item>
                <som-form-item label="纵向布局">
                    <som-checkbox-group v-model="layoutCheckboxs[1]" direction="vertical">
                        <som-checkbox value="0">🐥🐥🐥🐥🐥</som-checkbox>
                        <som-checkbox value="1">🦆🦆🦆🦆🦆</som-checkbox>
                        <som-checkbox value="2">🐱🐱🐱🐱🐱</som-checkbox>
                    </som-checkbox-group>
                </som-form-item>
            </som-form>
        </co-wrapper>

        <co-wrapper title="数量限制">
            <som-form>
                <som-form-item label="特长" inlineDesc="1~2个">
                    <som-checkbox-group
                        v-model="limitCheckboxs[0]"
                        direction="vertical"
                        :min="1"
                        :max="2">
                        <som-checkbox value="0">手</som-checkbox>
                        <som-checkbox value="1">腿</som-checkbox>
                        <som-checkbox value="2">脖子</som-checkbox>
                    </som-checkbox-group>
                </som-form-item>
            </som-form>
        </co-wrapper>

        <co-wrapper title="传参形式">
            <som-checkbox-group
                :options="options1"
                v-model="styleCheckboxs[0]"
                mode="icon"></som-checkbox-group>
        </co-wrapper>

        <co-wrapper title="mode=icon内置样式(style2)">
            <som-checkbox-group
                :options="options2"
                v-model="styleCheckboxs[1]"
                mode="icon"
                inlineStyle="style2"></som-checkbox-group>
        </co-wrapper>

        <co-wrapper title="mode=icon内置样式(style3)">
            <som-checkbox-group
                :options="options2"
                v-model="styleCheckboxs[2]"
                mode="icon"
                inlineStyle="style3"></som-checkbox-group>
        </co-wrapper>

        <co-wrapper title="CheckboxGroup自定义slots">
            <som-checkbox-group
                :options="new Array(2).fill('').map((i, idx) => `选项${idx + 1}`)"
                direction="horizontal"
                mode="icon"
                inlineStyle="style1"
                v-model="customCheckboxs[0]">
                <template #itemKey="info">自定义标签: {{info.key}}</template>
                <template #icon>
                    <img
                        width="20"
                        src="https://assets.souche.com/assets/sccimg/BorderCollie.jpg" alt="">
                </template>
                <template #checkedIcon="{ checked }">{{checked}}</template>
            </som-checkbox-group>
        </co-wrapper>

        <co-wrapper title="Checkbox自定义slots">
            <som-checkbox-group
                direction="horizontal"
                mode="icon"
                inlineStyle="style1"
                v-model="customCheckboxs[1]">
                <som-checkbox value="1">
                    选项一
                    <template #icon>
                        <img
                            width="20"
                            src="https://assets.souche.com/assets/sccimg/BorderCollie.jpg" alt="">
                    </template>
                    <template #checkedIcon="{ checked }">
                        {{checked}}
                    </template>
                </som-checkbox>
                <som-checkbox value="2" inlineDesc="慎重选择">
                    选项二
                    <template #icon>
                        <img
                            width="20"
                            src="https://assets.souche.com/assets/sccimg/BorderCollie.jpg" alt="">
                    </template>
                    <template #checkedIcon="{ checked }">
                        {{checked}}
                    </template>
                </som-checkbox>
            </som-checkbox-group>
        </co-wrapper>

        <co-wrapper title="自定义标签" class="mb12">
            <som-checkbox-group v-model="customCheckboxs[2]" style="background: #fff;">
                <som-tag-group>
                    <som-checkbox
                        v-for="i in 4"
                        :key="i"
                        :value="i">
                        <template #fullItem="{ checked }">
                            <som-tag :type="checked ? 'selected' : ''">标签{{i}}</som-tag>
                        </template>
                    </som-checkbox>
                </som-tag-group>
            </som-checkbox-group>
        </co-wrapper>
    </div>
</template>
<script>
import CoWrapper from '../common/wrapper.vue';

export default {
    data() {
        return {
            baseCheckbox: '',
            layoutCheckboxs: new Array(10).fill([]),
            limitCheckboxs: new Array(10).fill([]),
            styleCheckboxs: new Array(10).fill([]),
            customCheckboxs: new Array(10).fill([]),
            checkboxs: new Array(10).fill([]),
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
