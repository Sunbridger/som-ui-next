<template>
    <Picker
        class="som-date-picker"
        :title="title"
        :cancelText="cancelText"
        :confirmText="confirmText"
        :itemHeight="itemHeight"
        :showToolbar="showToolbar"
        :visibleItemCount="visibleItemCount"
        :swipeDuration="swipeDuration"
        :columns="columns"
        @cancel="onCancel"
        @confirm="onConfirm"
        @change="onChange"
    ></Picker>
</template>

<script lang="ts">
import { isDate } from '@/common/utils';
import { defineComponent, getCurrentInstance, ref, computed, watch, onMounted, nextTick } from 'vue';
import { useChildren } from '@/common/composition/useRelation';
import { useExpose } from '@/common/composition/useExpose';
import { times, sharedProps, getTrueValue, getMonthEndDay, padZero } from '@/common/utils/date-picker';
import Picker from '../picker/picker.vue';

const currentYear = new Date().getFullYear();

export default defineComponent({
    name: 'SomDatePicker',
    components: { Picker },
    props: {
        ...sharedProps,
        type: {
            type: String,
            default: 'date',
        },
        minDate: {
            type: Date,
            default: () => new Date(currentYear - 10, 0, 1),
            validator: isDate,
        },
        maxDate: {
            type: Date,
            default: () => new Date(currentYear + 10, 11, 31),
            validator: isDate,
        },
    },
    setup(props, { emit }) {
        const { children, linkChildren } = useChildren('picker');
        linkChildren();

        // data数据块
        const currentDate = ref();
        currentDate.value = formatValue(props.modelValue);
        // computed计算属性块
        // 计算当前时间类型范围
        const ranges = computed(() => {
            const { maxYear, maxDate, maxMonth, maxHour, maxMinute } = getBoundary('max', currentDate.value);

            const { minYear, minDate, minMonth, minHour, minMinute } = getBoundary('min', currentDate.value);

            let result = [
                {
                    type: 'year',
                    range: [minYear, maxYear],
                },
                {
                    type: 'month',
                    range: [minMonth, maxMonth],
                },
                {
                    type: 'day',
                    range: [minDate, maxDate],
                },
                {
                    type: 'hour',
                    range: [minHour, maxHour],
                },
                {
                    type: 'minute',
                    range: [minMinute, maxMinute],
                },
            ];

            switch (props.type) {
                case 'date':
                    result = result.slice(0, 3);
                    break;
                case 'year':
                    result = result.slice(0, 1);
                    break;
                case 'year-month':
                    result = result.slice(0, 2);
                    break;
                case 'month-day':
                    result = result.slice(1, 3);
                    break;
                case 'month-date-time':
                    result = result.slice(1, 5);
                    break;
                case 'datehour':
                    result = result.slice(0, 4);
                    break;
                default:
                    break;
            }

            if (props.columnsOrder) {
                const columnsOrder = props.columnsOrder.concat(result.map((column: any) => column.type));
                result.sort((a, b) => columnsOrder.indexOf(a.type) - columnsOrder.indexOf(b.type));
            }

            return result;
        });
        // 时间范围原数据
        const originColumns = computed(() =>
            ranges.value.map(({ type, range: rangeArr }) => {
                // eslint-disable-next-line no-mixed-operators
                let values = times(rangeArr[1] - rangeArr[0] + 1, (index) => {
                    // eslint-disable-next-line no-undef
                    const value: any = padZero(rangeArr[0] + index);
                    return value;
                });

                if (props.filter) {
                    values = props.filter(type, values);
                }

                return {
                    type,
                    values,
                };
            }),
        );
        const columns = computed(() =>
            originColumns.value.map((column: any) => ({
                values: column.values.map((value: any) => props.formatter(column.type, value)),
            })),
        );
        // watch状态监听块
        // 监听props的columns，并对数据进行更新
        watch(columns, updateColumnValue);
        // 监听当前时间改变，并emit modelValue
        watch(currentDate, (value) => {
            emit('update:modelValue', value);
        });
        // 监听props的filter,minDate,maxDate，并跟新内部时间数据
        watch([() => props.filter, () => props.minDate, () => props.maxDate], updateInnerValue);
        // 监听props的modelValue，格式化数据，并绑定到currentDate
        watch(
            () => props.modelValue,
            (value) => {
                value = formatValue(value);

                if (value.valueOf() !== currentDate.value.valueOf()) {
                    currentDate.value = value;
                }
            },
        );
        // methods方法块

        /**
         * @description 时间格式化
         * @param value any 待格式化时间
         * @returns Date时间
         */
        function formatValue(value: any) {
            if (!isDate(value)) {
                value = props.minDate;
            }
            const minDate: any = props.minDate;
            const maxDate: any = props.maxDate;
            value = Math.max(value, minDate.getTime());
            value = Math.min(value, maxDate.getTime());

            return new Date(value);
        }
        /**
         * @description 计算时间的最小年，月，日，时，分
         * @param type String 'min' 'max' 计算数据类型
         * @param value Date 原始数据
         * @returns Object 枚举响应的年，月，日，时，分
         */
        function getBoundary(type, value) {
            const boundary = props[`${type}Date`];
            const year = boundary.getFullYear();
            let month = 1;
            let date = 1;
            let hour = 0;
            let minute = 0;

            if (type === 'max') {
                month = 12;
                date = getMonthEndDay(value.getFullYear(), value.getMonth() + 1);
                hour = 23;
                minute = 59;
            }

            if (value.getFullYear() === year) {
                month = boundary.getMonth() + 1;
                if (value.getMonth() + 1 === month) {
                    date = boundary.getDate();
                    if (value.getDate() === date) {
                        hour = boundary.getHours();
                        if (value.getHours() === hour) {
                            minute = boundary.getMinutes();
                        }
                    }
                }
            }

            return {
                [`${type}Year`]: year,
                [`${type}Month`]: month,
                [`${type}Date`]: date,
                [`${type}Hour`]: hour,
                [`${type}Minute`]: minute,
            };
        }
        /**
         * @description 更新picker的展示数据
         * @returns void
         */
        function updateColumnValue() {
            const { value } = currentDate;
            const { formatter } = props;

            const values = originColumns.value.map((column) => {
                switch (column.type) {
                    case 'year':
                        return formatter('year', `${value.getFullYear()}`);
                    case 'month':
                        return formatter('month', padZero(value.getMonth() + 1));
                    case 'day':
                        return formatter('day', padZero(value.getDate()));
                    case 'hour':
                        return formatter('hour', padZero(value.getHours()));
                    case 'minute':
                        return formatter('minute', padZero(value.getMinutes()));
                    default:
                        // no default
                        return null;
                }
            });

            nextTick(() => {
                const picker: any = children[0];
                picker.setValues(values);
            });
        }
        /**
         * @description 更新组件内currentDate数据
         * @returns void
         */
        function updateInnerValue() {
            const picker: any = children[0];
            const { type } = props;
            const indexes = picker.getIndexes();

            const getValue = (types) => {
                //FIXME: 解决bug
                let index;
                originColumns.value.forEach((column, columnIndex) => {
                    if (types === column.type) {
                        index = columnIndex;
                    }
                });
                if (index !== undefined) {
                    const { values } = originColumns.value[index];
                    return getTrueValue(values[indexes[index]]);
                } else {
                    return 1;
                }

            };

            let year;
            let month;
            let day;
            if (type === 'month-day') {
                year = currentDate.value.getFullYear();
                month = getValue('month');
                day = getValue('day');
            } else if (type === 'month-date-time') {
                year = currentDate.value.getFullYear();
                month = getValue('month');
                day = getValue('day');
            } else {
                year = getValue('year');
                month = getValue('month');
                day = type === 'year-month' ? 1 : getValue('day');
            }

            const maxDay = getMonthEndDay(year, month);
            day = day > maxDay ? maxDay : day;

            let hour = 0;
            let minute = 0;

            if (type === 'datehour') {
                hour = getValue('hour');
            }

            if (type === 'datetime' || type === 'month-date-time') {
                hour = getValue('hour');
                minute = getValue('minute');
            }
            const value = new Date(year, month - 1, day, hour, minute);
            currentDate.value = formatValue(value);
        }
        /**
         * @description emit confirm event
         * @returns void
         */
        const onConfirm = () => {
            emit('confirm', currentDate.value);
        };
        /**
         * @description emit cancel event
         * @returns void
         */
        const onCancel = () => {
            emit('cancel');
        };
        /**
         * @description emit change event
         * @returns void
         */
        const onChange = () => {
            updateInnerValue();
            nextTick(() => {
                nextTick(() => {
                    emit('change', currentDate.value);
                });
            });
        };
        // lifecycle生命周期块
        useExpose({
            getPicker: () => getCurrentInstance(),
        });
        onMounted(() => {
            updateColumnValue();
            nextTick(updateInnerValue);
        });

        return {
            onCancel,
            onConfirm,
            onChange,
            columns,
        };
    },
});
</script>
