<style lang="less"></style>
<template>
    <div
        class="som-picker-column"
        :class="className"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
        @touchcancel="onTouchEnd"
    >
        <ul
            class="som-picker-column__wrapper"
            ref="wrapper"
            :style="wrapperStyle"
            @transitionend="stopMomentum"
        >
            <li
                class="flex flex-align-center flex-justify-center"
                v-for="(item, index) in pickerDatas"
                :key="index"
                v-bind="item.bindData"
                @click="onClickItem(index)"
            >
                <slot
                    name="option"
                    :option="item.option"
                >
                    <div
                        class="ellipsis"
                        v-html="item.text"
                    ></div>
                </slot>
            </li>
        </ul>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from 'vue';
// Utils
import { cloneDeep, isObject } from '@souche-vue3/souche-util-vue';
// Composition
import { useParent } from '@/common/composition/useRelation';
import { useTouch } from '@/common/composition/useTouch';
import { useExpose } from '@/common/composition/useExpose';
import { preventDefault } from '@/common/utils/events';

import { range, isOptionDisabled, getElementTranslateY } from '@/common/utils/picker';

const DEFAULT_DURATION = 200;

// 惯性滑动思路:
// 在手指离开屏幕时，如果和上一次 move 时的间隔小于 `MOMENTUM_LIMIT_TIME` 且 move
// 距离大于 `MOMENTUM_LIMIT_DISTANCE` 时，执行惯性滑动
const MOMENTUM_LIMIT_TIME = 300;
const MOMENTUM_LIMIT_DISTANCE = 15;

export default defineComponent({
    name: 'SomPickerColumn',
    props: {
        valueKey: String,
        readonly: Boolean,
        allowHtml: Boolean,
        className: String,
        itemHeight: Number,
        defaultIndex: Number,
        columnIndex: Number,
        swipeDuration: [Number, String],
        visibleItemCount: [Number, String],
        initialOptions: {
            type: Array,
            default: () => [],
        },
    },

    emits: ['change'],
    setup(props, { emit }) {
        // composition封装逻辑
        const touch = useTouch();

        // data数据
        let moving: boolean;
        let startOffset: number;
        let touchStartTime: number;
        let momentumOffset: number;
        let transitionEndTrigger: any;

        const wrapper = ref();

        const state = reactive({
            index: props.defaultIndex,
            offset: 0,
            duration: 0,
            options: cloneDeep(props.initialOptions),
        });

        // 父子组件传递的数据

        // computed计算属性
        const count = computed(() => state.options.length);
        const baseOffset = computed(() => ((props.itemHeight as number) * ((props.visibleItemCount as number) - 1)) / 2);

        const wrapperStyle = computed(() => ({
            transform: `translate3d(0, ${state.offset + baseOffset.value}px, 0)`,
            transitionDuration: `${state.duration}ms`,
            transitionProperty: state.duration ? 'all' : 'none',
        }));
        const pickerDatas = computed(() => {
            const optionStyle = {
                height: `${props.itemHeight}px`,
            };
            return state.options.map((option: any, index: number) => {
                // eslint-disable-next-line @typescript-eslint/no-use-before-define
                const text = getOptionText(option);
                const disabled = isOptionDisabled(option);

                const data = {
                    role: 'button',
                    style: optionStyle,
                    tabindex: disabled ? -1 : 0,
                    class: ['som-picker-column__item', { 'som-picker-column__item--disabled': disabled }, { 'som-picker-column__item--selected': index === state.index }],
                };

                return {
                    bindData: data,
                    text,
                    option,
                };
            });
        });
        // methods方法

        // 获取适用的index索引
        const adjustIndex = (index: number) => {
            // index 不能超过可选范围
            index = range(index, 0, count.value);
            // 找到离index最近的非disabled node
            // 先向下寻找
            for (let i = index; i < count.value; i++) {
                if (!isOptionDisabled(state.options[i])) return i;
            }
            // 再向前寻找
            for (let i = index - 1; i >= 0; i--) {
                // eslint-disable-line
                if (!isOptionDisabled(state.options[i])) return i;
            }
        };

        // 设置index索引
        const setIndex = (index: number, emitChange: boolean) => {
            index = adjustIndex(index) || 0;

            const offset = -index * (props.itemHeight as number);
            const trigger = () => {
                if (index !== state.index) {
                    state.index = index;

                    if (emitChange) {
                        emit('change', index, props.columnIndex);
                    }
                }
            };

            // trigger the change event after transitionend when moving
            // 动画完成之后触发trigger事件
            if (moving && offset !== state.offset) {
                transitionEndTrigger = trigger;
            } else {
                trigger();
            }

            state.offset = offset;
        };

        const setOptions = (options: any) => {
            if (JSON.stringify(options) !== JSON.stringify(state.options)) {
                state.options = cloneDeep(options);
                setIndex(props.defaultIndex as number, false);
            }
        };

        // 从options中取出text
        const getOptionText = (option: any) => {
            if (isObject(option) && (props.valueKey as string) in option) {
                return option[props.valueKey as string];
            }
            return option;
        };

        const setValue = (value: any) => {
            const { options } = state;
            for (let i = 0; i < options.length; i++) {
                // eslint-disable-line
                if (getOptionText(options[i]) === value) {
                    return setIndex(i, false);
                }
            }
        };

        const getValue = () => state.options[state.index as number];

        // 根据offset去推算出现在的index
        const getIndexByOffset = (offset: number) => {
            return range(Math.round(-offset / (props.itemHeight as number)), 0, count.value - 1);
        };

        // 动画相关
        const momentum = (distance: number, duration: number) => {
            const speed = Math.abs(distance / duration);

            distance = state.offset + (speed / 0.003) * (distance < 0 ? -1 : 1); // eslint-disable-line

            const index = getIndexByOffset(distance);

            state.duration = +(props.swipeDuration as number);
            setIndex(index, true);
        };

        const stopMomentum = () => {
            moving = false;
            state.duration = 0;

            if (transitionEndTrigger) {
                transitionEndTrigger();
                transitionEndTrigger = null;
            }
        };

        // touch 的监听事件
        const onTouchStart = (event: any) => {
            if (props.readonly) {
                return;
            }
            // 初始化touch的左边信息
            touch.start(event);

            if (moving) {
                const translateY = getElementTranslateY(wrapper.value);
                state.offset = Math.min(0, translateY - baseOffset.value);
                startOffset = state.offset;
            } else {
                startOffset = state.offset;
            }

            state.duration = 0;
            touchStartTime = Date.now();
            momentumOffset = startOffset;
            transitionEndTrigger = null;
        };

        const onTouchMove = (event: any) => {
            if (props.readonly) {
                return;
            }

            touch.move(event);

            if (touch.isVertical()) {
                moving = true;
                preventDefault(event, true);
            }

            state.offset = range(startOffset + touch.deltaY.value, -(count.value * (props.itemHeight as number)), props.itemHeight as number);

            const now = Date.now();
            if (now - touchStartTime > MOMENTUM_LIMIT_TIME) {
                touchStartTime = now;
                momentumOffset = state.offset;
            }
        };

        const onTouchEnd = () => {
            if (props.readonly) {
                return;
            }

            const distance = state.offset - momentumOffset;
            const duration = Date.now() - touchStartTime;
            const allowMomentum: boolean = duration < MOMENTUM_LIMIT_TIME && Math.abs(distance) > MOMENTUM_LIMIT_DISTANCE;

            if (allowMomentum) {
                momentum(distance, duration);
                return;
            }

            const index = getIndexByOffset(state.offset);
            state.duration = DEFAULT_DURATION;
            setIndex(index, true);

            // compatible with desktop scenario
            // use setTimeout to skip the click event Emitted after touchstart
            setTimeout(() => {
                moving = false;
            }, 0);
        };

        const onClickItem = (index: number) => {
            if (moving || props.readonly) {
                return;
            }

            transitionEndTrigger = null;
            state.duration = DEFAULT_DURATION;
            setIndex(index, true);
        };

        // watch状态监听

        watch(() => props.initialOptions, setOptions);

        watch(
            () => props.defaultIndex,
            (value) => {
                setIndex(value as number, false);
            },
        );

        // lifecycle生命周期
        setIndex(state.index as number, false);
        // 建立和parent的连接
        useParent('SomPicker');
        // 把方法和数据绑定到实例上去
        useExpose({
            state,
            setIndex,
            getValue,
            setValue,
            setOptions,
            stopMomentum,
        });

        return {
            wrapper,
            wrapperStyle,
            onTouchStart,
            onTouchMove,
            onTouchEnd,
            stopMomentum,
            pickerDatas,
            onClickItem,
        };
    },
});
</script>
