<!--
 * @Author: your name
 * @Date: 2020-11-17 22:25:05
 * @LastEditTime: 2020-11-27 13:36:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edi t
 * @FilePath: /som-ui-next/examples/views/components/form/picker.vue
-->
<template>
    <div class="pg-component-picker">
        <section class="area">
            <h3 class="pt4 pb12">基础选择器</h3>
            <som-picker
                ref="picker1"
                :columns="columns1"
                :defaultIndex='1'
                title="单列"
                @confirm="confirm"
                @cancel="cancel"
                @change="change"
            ></som-picker>
        </section>
        <section class="area">
            <h3 class="pt4 pb12">多列选择器</h3>
            <som-picker
                :columns="columns2"
                title="多列"
            ></som-picker>
        </section>
        <section class="area">
            <h3 class="pt4 pb12">级联选择器</h3>
            <som-picker
                :columns="columns3"
                title="级联选择"
            ></som-picker>
        </section>
        <section class="area">
            <h3 class="pt4 pb12">事件例子</h3>
            <som-button
                size='medium'
                inline
                class="mb12 mr6"
                @click="getValues"
            >getValues</som-button>
            <som-button
                size='medium'
                inline
                class="mb12 mr6"
                @click="setValues"
            >setValues</som-button>
            <som-button
                size='medium'
                inline
                class="mb12 mr6"
                @click="setIndexes"
            >setIndexes</som-button>
            <som-button
                size='medium'
                inline
                class="mb12 mr6"
                @click="setColumnIndex"
            >setColumnIndex</som-button>
            <som-button
                size='medium'
                inline
                class="mb12 mr6"
                @click="setColumnValue"
            >setColumnValue</som-button>
            <som-button
                size='medium'
                inline
                class="mb12 mr6"
                @click="setColumnValues"
            >setColumnValues</som-button>
        </section>
    </div>
</template>
<script>
export default {
    data() {
        return {
            show: false,
            columns1: ['1', '2', '3', '4', '5'],
            columns2: [
                {
                    values: ['周一', '周二', '周三', '周四', '周五'],
                    defaultIndex: 2
                },
                // 第二列
                {
                    values: ['上午', '下午', '晚上'],
                    defaultIndex: 1
                }
            ],
            columns3: [
                {
                    text: '浙江',
                    children: [
                        {
                            text: '杭州',
                            children: [{ text: '西湖区' }, { text: '余杭区' }]
                        },
                        {
                            text: '温州',
                            children: [{ text: '鹿城区' }, { text: '瓯海区' }]
                        }
                    ]
                },
                {
                    text: '福建',
                    children: [
                        {
                            text: '福州',
                            children: [{ text: '鼓楼区' }, { text: '台江区' }]
                        },
                        {
                            text: '厦门',
                            children: [{ text: '思明区' }, { text: '海沧区' }]
                        }
                    ]
                }
            ]
        };
    },
    mounted() {
        this.setIndexes();
    },
    methods: {
        confirm(v, i) {
            console.log('confirm', v, i);
        },
        cancel(v, i) {
            console.log('cancel', v, i);
        },
        change(v, i) {
            console.log('change', v, i);
        },
        getValues() {
            const v = this.$refs.picker1.getValues();
            const v1 = this.$refs.picker1.getIndexes();
            const v2 = this.$refs.picker1.getColumnIndex(0);
            const v3 = this.$refs.picker1.getColumnValue(0);
            const v4 = this.$refs.picker1.getColumnValues(0);
            console.log('getValues', v);
            console.log('getIndexes', v1);
            console.log('getColumnIndex', v2);
            console.log('getColumnValue', v3);
            console.log('getColumnValues', v4);
        },
        setValues() {
            this.$refs.picker1.setValues(['2']);
        },
        setIndexes() {
            this.$refs.picker1.setIndexes(['2']);
        },
        setColumnIndex() {
            this.$refs.picker1.setColumnIndex(0, '0');
        },
        setColumnValue() {
            this.$refs.picker1.setColumnValue(0, '2');
        },
        setColumnValues() {
            this.$refs.picker1.setColumnValues(0, ['a', 'b', '2']);
        }
    }
};
</script>

<style lang="less">
.area {
    h3 {
        font-size: 16px;
        font-weight: normal;
        color: #8d8e99;
    }
    background-color: #f7f8fa;
    padding: 12px;
}
</style>
