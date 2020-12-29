<style lang="less">
@import '~@/styles/components/picker/var.less';

@block: som-picker;
@columns: som-picker-columns;
@column: som-picker-column;

.@{block} {
    background-color: #fff;
    user-select: none;
    height: var(--picker-height);
    border-top-right-radius: 12px;
    border-top-left-radius: 12px;
    &__toolbar {
        font-size: 16px;
        height: 48px;
        line-height: 48px;
        padding: 0 16px;
        box-sizing: border-box;
        .@{block}__cancel {
            color: #5e5e66;
        }
        .@{block}__title {
            font-weight: 600;
            color: #000;
        }
        .@{block}__confirm {
            color: red;
        }
    }
    &__columns {
        position: relative;
        cursor: grab;
        .@{column} {
            position: relative;
            overflow: hidden;
            cursor: grab;
            &__wrapper {
                .@{column}__item {
                    outline: none;
                    text-align: center;
                    font-size: var(--picker-text-fs);
                    color: var(--picker-text-color);
                }
                .@{column}__item--selected {
                    font-size: var(--picker-text-selected-fs);
                    color: var(--picker-text-color);
                }
            }
        }
        .som-hairLine--top--bottom {
            border-width: 1px 0;
            &::after {
                position: absolute;
                box-sizing: border-box;
                content: ' ';
                pointer-events: none;
                top: -50%;
                right: -50%;
                bottom: -50%;
                left: -50%;
                border: 0 solid #ebedf0;
                transform: scale(0.5);
                border-width: 1px 0;
            }
        }
    }
    &__mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        background-image: linear-gradient(180deg, hsla(0, 0%, 100%, 0.9), hsla(0, 0%, 100%, 0.8)), linear-gradient(0deg, hsla(0, 0%, 100%, 0.9), hsla(0, 0%, 100%, 0.8));
        background-repeat: no-repeat;
        background-position: top, bottom;
        transform: translateZ(0);
        pointer-events: none;
    }
    &__frame {
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        height: 50px;
        background: transparent;
        transform: translate(0, -50%);
        pointer-events: none;
    }
}
</style>

<template>
    <div class="som-picker">
        <div
            v-if="showToolbar"
            class="som-picker__toolbar flex flex-align-center flex-justify-between"
        >
            <div
                class="som-picker__cancel"
                @click="cancel"
            >
                {{cancelText}}
            </div>
            <slot>
                <div class="som-picker__title">{{title}}</div>
            </slot>
            <div
                class="som-picker__confirm"
                @click="confirm"
            >
                {{ confirmText }}
            </div>
        </div>
        <div
            class="som-picker__columns flex"
            :style="columnsStyle"
        >
            <picker-column
                class='flex1'
                v-for="(column, i) in formattedColumns"
                :visibleItemCount='visibleItemCount'
                :itemHeight='itemHeight'
                :key="i"
                :column='column'
                :swipeDuration="swipeDuration"
                :valueKey="valueKey"
                :columnIndex="i"
                :initialOptions="column.values"
                @change="onChange"
            ></picker-column>
            <div
                :style="maskStyle"
                class="som-picker__mask"
            ></div>
            <div
                :style='{height: `${itemHeight}px`}'
                class="som-picker__frame som-hairLine--top--bottom"
            ></div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, provide, ref, watch, computed, PropType } from 'vue';
import { IColumnObject } from 'types/components/picker';
import { useExpose } from '@/common/composition/useExpose';
import { useChildren, useParent } from '@/common/composition/useRelation';
import { pickerProps } from './shared';
import { useColumnsUtils, getColumnDataType, useformatCascadeTypeColumnsUtil } from '@/common/utils/picker';
import PickerColumn from './picker-column.vue';

interface ColumnObject {
    statte?: object;
    defaultIndex?: number;
    values: any[];
    text: string;
}
interface CursorObject {
    defaultIndex?: number;
    children: CursorObject[];
    text?: string;
}

export default defineComponent({
    name: 'SomPicker',
    components: {
        PickerColumn,
    },
    props: {
        ...pickerProps,
        valueKey: {
            type: String,
            default: 'text',
        },
        columns: {
            type: Array as PropType<IColumnObject[] | string[]>,
            default: () => [],
        },
    },
    emits: ['confirm', 'cancel', 'change'],
    setup(props, { emit }) {
        // composition封装逻辑
        const { children, linkChildren } = useChildren('SomPicker');
        useParent('picker');


        // 父子组件传递的数据(接收)
        linkChildren();

        // data数据
        const formattedColumns: any = ref([]);
        const wrapHeight: number = +props.itemHeight * +props.visibleItemCount;
        const columnsStyle: object = { height: `${wrapHeight}px` };
        const maskStyle = {
            backgroundSize: `100% ${(wrapHeight - +props.itemHeight) / 2}px`,
        };
        let useFormatCascadeTypeColumnsUtil;

        // computed计算属性
        // columns 类型判断
        const dataType = computed(() => {
            const type = getColumnDataType(props.columns);
            if (type === 'cascade') {
                //  封装对级联数据的格式化
                useFormatCascadeTypeColumnsUtil = useformatCascadeTypeColumnsUtil(props.columns as IColumnObject[]);
            }
            return type;
        });

        // watch状态监听
        watch(
            () => props.columns,
            () => {
                const { columns } = props;
                switch (dataType.value) {
                    case 'text':
                        formattedColumns.value = [{ values: columns }];
                        break;
                    case 'object':
                        formattedColumns.value = columns;
                        break;
                    case 'cascade':
                        formattedColumns.value = useFormatCascadeTypeColumnsUtil && useFormatCascadeTypeColumnsUtil.formatCascadeTypeColumns();
                        break;
                    default:
                        break;
                }
            },
            { immediate: true },
        );

        // methods方法
        //  封装对picker columns的操作
        const columnsUtil = useColumnsUtils(children, props, dataType);
        const { getColumnValue, getColumnIndex, setValues, getValues, getIndexes } = columnsUtil;

        const onChange = (index: number, columnIndex: number) => {
            if (dataType.value === 'cascade') {
                // updateFormatCascade(index, columnIndex);
                useFormatCascadeTypeColumnsUtil && useFormatCascadeTypeColumnsUtil.updateFormatCascadeTypeColumns(index, columnIndex, formattedColumns.value);
            }
            if (dataType.value === 'text') {
                emit('change', getColumnValue(0), getColumnIndex(0));
            } else {
                emit('change', getValues(), columnIndex);
            }
        };
        const emitAction = (event) => {
            if (dataType.value === 'text') {
                emit(event, getColumnValue(0), getColumnIndex(0));
            } else {
                emit(event, getValues(), getIndexes());
            }
        };
        const confirm = () => {
            children.forEach((child: any) => child.stopMomentum());
            emitAction('confirm');
        };

        const cancel = () => {
            emitAction('cancel');
        };

        // lifecycle生命周期
        // 给实例绑定一些方法，方便调用
        useExpose({
            confirm,
            ...columnsUtil,
        });
        provide('setValues', setValues);

        return {
            cancel,
            confirm,
            onChange,
            maskStyle,
            columnsStyle,
            formattedColumns,
        };
    },
});
</script>
