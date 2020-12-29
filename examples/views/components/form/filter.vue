<template>
    <div class="pg-component-filter bg-page pb32">
        <co-wrapper title="基本使用">
            <som-filter :model="model">
                <som-filter-item
                    :options="options1"></som-filter-item>
                <som-filter-item
                    :options="options2"></som-filter-item>
            </som-filter>
        </co-wrapper>

        <co-wrapper title="多项样式">
            <som-filter :model="model" class="mb12">
                <som-filter-item
                    :options="options1"></som-filter-item>
                <som-filter-item
                    :options="options2"></som-filter-item>
            </som-filter>

            <som-filter :model="model" class="mb12">
                <som-filter-item
                    :options="options1"></som-filter-item>
                <som-filter-item
                    :options="options2"></som-filter-item>
                <som-filter-item
                    multiple
                    :options="options3"></som-filter-item>
            </som-filter>

            <som-filter :model="model">
                <som-filter-item
                    :options="options1"></som-filter-item>
                <som-filter-item
                    :options="options2"></som-filter-item>
                <som-filter-item
                    multiple
                    :options="options3"></som-filter-item>
                <som-filter-item
                    :options="options4"
                    full></som-filter-item>
            </som-filter>
        </co-wrapper>

        <co-wrapper title="多项样式">
            <som-filter :model="model">
                <som-filter-item
                    label="四字选项"
                    prop="value1"
                    :options="[
                        {
                            key: '选项一',
                            value: '1'
                        },
                        {
                            key: '选项二',
                            value: '2'
                        }
                    ]"></som-filter-item>
                <som-filter-item
                    :options="options2"></som-filter-item>
                <som-filter-item
                    multiple
                    :options="options3"></som-filter-item>
                <som-filter-item
                    :options="options4"
                    full></som-filter-item>
            </som-filter>
        </co-wrapper>
    </div>
</template>

<script>
import CoWrapper from '../common/wrapper.vue';

export default {
    data() {
        return {
            model: {
                value1: '',
                value2: '',
                value3: [],
                group1: [],
                group2: []

            },
            options1: {
                label: '选项1',
                prop: 'value1',
                options: [
                    {
                        key: '选项一',
                        value: '1'
                    },
                    {
                        key: '选项二',
                        value: '2'
                    }
                ]
            },
            options2: {
                label: '选项2',
                prop: 'value2',
                options: [
                    {
                        key: '选项一',
                        value: '1'
                    },
                    {
                        key: '选项二',
                        value: '2'
                    }
                ]
            },
            options3: {
                label: '选项3',
                prop: 'value3',
                options: [
                    {
                        key: '选项一',
                        value: '1'
                    },
                    {
                        key: '选项二',
                        value: '2'
                    },
                    {
                        key: '选项三',
                        value: '3'
                    },
                    {
                        key: '选项四',
                        value: '4'
                    }
                ]
            },
            options4: {
                label: '筛选',
                group: true,
                options: [
                    {
                        label: '分组一',
                        prop: 'group1',
                        options: [
                            {
                                key: '选项一',
                                value: '1'
                            },
                            {
                                key: '选项二',
                                value: '2'
                            },
                            {
                                key: '选项三',
                                value: '3'
                            },
                            {
                                key: '选项四',
                                value: '4'
                            }
                        ]
                    },
                    {
                        label: '分组二',
                        prop: 'group2',
                        options: [
                            {
                                key: '选项一',
                                value: '1'
                            },
                            {
                                key: '选项二',
                                value: '2'
                            },
                            {
                                key: '选项三',
                                value: '3'
                            },
                            {
                                key: '选项四',
                                value: '4'
                            },
                            {
                                key: '选项五',
                                value: '5'
                            },
                            {
                                key: '选项六',
                                value: '6'
                            }
                        ]
                    }
                ]
            }
        };
    },
    watch: {
        model: {
            deep: true,
            handler() {
                console.log('model change:', this.model);
            }
        }
    },
    components: {
        CoWrapper
    }
};
</script>
