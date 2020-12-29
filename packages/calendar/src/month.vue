<style lang="less">

</style>

<template>

</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { compareMonth, getMonthEndDay } from '../utils';

export default defineComponent({
    props: {
        date: Date,
        type: String,
        color: String,
        minDate: Date,
        maxDate: Date,
        showMark: Boolean,
        rowHeight: [Number, String],
        formatter: Function,
        lazyRender: Boolean,
        currentDate: [Date, Array],
        allowSameDay: Boolean,
        showSubtitle: Boolean,
        realRowHeight: Number,
        showMonthTitle: Boolean,
        firstDayOfWeek: Number,
    },
    emits: ['click'],
    setup(props) {

        const totalDay = computed(() =>
            getMonthEndDay(props?.date?.getFullYear(), props?.date?.getMonth() + 1)
        );
        // months.value.forEach((date) => {
        //     aa.push(getMonthEndDay(date.getFullYear(), date.getMonth() + 1));
        // });
    }

});
</script>
