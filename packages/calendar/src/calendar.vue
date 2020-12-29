<style lang="less">
@import './var.less';

.som-calendar {

}
</style>

<template>
    <div class="som-calendar">
        zzzzz
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { compareMonth, getMonthEndDay } from '../utils';
import Month from './month.vue';

export default defineComponent({
    name: 'SomCalendar',
    components: {
        Month
    },
    props: {
        minDate: {
            type: Date,
            default: () => new Date(2018, 0, 1)
        },
        maxDate: {
            type: Date,
            default: () => new Date(2024, 0, 1)
        }
    },

    setup(props) {

        const months = computed(() => {
            const months: Array<Date> = [];
            const cursor = new Date(props.minDate);

            cursor.setDate(1);

            do {
                months.push(new Date(cursor));
                cursor.setMonth(cursor.getMonth() + 1);
            } while (compareMonth(cursor, new Date(props.maxDate)) !== 1);

            return months;
        });



    }
});
</script>
