<!--
 * @Author: your name
 * @Date: 2020-11-23 19:11:58
 * @LastEditTime: 2020-11-27 13:38:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /som-ui-next/examples/views/components/form/date-picker.vue
-->
<template>
    <div class="pg-component-date-picker">
        <section class="area">
            <h3 class="pt4 pb12">年份选择器</h3>
            <som-date-picker
                type="year"
                title="选择年"
                v-model="currentDate"
                :formatter="formatter"
            ></som-date-picker>
        </section>
        <section class="area">
            <h3 class="pt4 pb12">年月选择器</h3>
            <som-date-picker
                type="year-month"
                title="选择年月"
                v-model="currentDate2"
                :formatter="formatter"
            ></som-date-picker>
        </section>
        <section class="area">
            <h3 class="pt4 pb12">年月日选择器</h3>
            <som-date-picker
                @cancel='onCancel'
                @confirm='onConfirm'
                @change='onChange'
                v-model="currentDate3"
                title="选择年月日"
                ref="curPicker"
                :formatter="formatter"
            ></som-date-picker>
        </section>
        <section class="area">
            <h3 class="pt4 pb12">月日时间选择器</h3>
            <som-date-picker
                v-model="currentTime"
                type="month-date-time"
                title="选择月日时间"
                :formatter="formatter"
            ></som-date-picker>
        </section>
    </div>
</template>
<script>
export default {
    data() {
        return {
            currentDate: new Date(),
            currentDate2: new Date(),
            currentDate3: new Date(),
            currentTime: new Date(),
        };
    },
    methods: {
        onCancel(e) {
            console.log('onCancel', e);
        },
        onConfirm(e) {
            console.log('onconfirm', e);
        },
        onChange(e) {
            console.log('onchange', e);
        },
        formatter(type, val) {
            if (type === 'year') {
                return `${val}年`;
            } else if (type === 'month') {
                return `${val}月`;
            } else if (type === 'day') {
                return `${val}日`;
            }
            return val;
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
