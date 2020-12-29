<style lang="less">
@import '~@/styles/components/steps/var.less';

@block: som-step;

.@{block} {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 60px;
    color: var(--step-inactive-content-color);
    font-size: var(--step-content-size);
    font-weight: var(--step-inactive-content-fw);

    &__title span {
        font-size: var(--step-content-size);
        font-weight: var(--step-active-content-fw);
    }
    &__line {
        top: calc(var(--step-icon-size) / 2 - 2px);
        left: calc(50% + var(--step-icon-size) / 2 - 2px);
        width: calc(100% - var(--step-icon-size) + 4px);
    }
    &__circle {
        width: var(--step-icon-size);
        height: var(--step-icon-size);
    }

    &.@{block}--active .@{block}__title span {
        color: var(--step-active-content-color);
    }
    & > [class^='som-icon'] {
        width: 100%;
    }
    &__circle {
        border-radius: 9px;
        align-items: center;
        justify-content: center;
        display: flex;
        font-weight: 500;
        box-sizing: border-box;
        z-index: 4;
        padding: 10px 0;
    }

    &__line {
        position: absolute;
        height: 4px;
    }

    &__title {
        margin-top: 8px;
        text-align: center;
        span {
            color: var(--step-inactive-content-color);
            word-break: break-all;
            display: inline-block;
        }
    }

    &:last-child {
        .@{block}__line {
            width: 0;
        }
    }
}
</style>
<template>
    <span
        :class="currentStatusClass"
        :style="{ width: itemWidth }"
        @click="onClickMethod"
    >
        <div
            class="som-step__circle"
            :style="circleStyle"
        >
            <!-- 取icon -->
            <!-- wait icon -->
            <slot
                v-if="currentStatus === 'wait'"
                name="inActiveIcon"
            >
                <component
                    v-if="parentSlots?.inActiveIcon"
                    :is="parentSlots?.inActiveIcon"
                ></component>
                <!-- TODO icon补全之后删除 -->
                <som-icon
                    v-else
                    department="base"
                    type="circle-unselect"
                    size="46px"
                ></som-icon>
                <!-- <svg
                    v-else
                    width="40px"
                    height="40px"
                    viewBox="0 0 40 40"
                >
                    <circle
                        stroke-width="8"
                        cx="20"
                        cy="20"
                        r="12"
                        fill="currentColor"
                        stroke="transparent"
                    ></circle>
                </svg> -->
            </slot>

            <!-- active icon -->
            <slot
                v-else-if="currentStatus === 'active'"
                name="activeIcon"
            >
                <component
                    v-if="parentSlots?.activeIcon"
                    :is="parentSlots?.activeIcon"
                ></component>
                <!-- TODO icon补全之后删除 -->
                <som-icon
                    v-else
                    department="base"
                    type="radio-select"
                    size="46px"
                    :color="iconActiveColor"
                ></som-icon>
                <!-- <svg
                    v-else
                    width="40px"
                    height="40px"
                    viewBox="0 0 40 40"
                >
                    <circle
                        stroke-width="8"
                        cx="20"
                        cy="20"
                        r="16"
                        stroke="currentColor"
                        fill="transparent"
                    ></circle>
                </svg> -->
            </slot>
            <!-- done icon -->
            <slot
                v-else
                name="doneIcon"
            >
                <component
                    v-if="parentSlots?.doneIcon"
                    :is="parentSlots?.doneIcon"
                ></component>
                <!-- TODO icon补全之后删除 -->
                <som-icon
                    v-else
                    department="base"
                    type="circle-check1"
                    size="46px"
                    :color="iconActiveColor"
                ></som-icon>
                <!-- <svg
                    v-else
                    viewBox="0 0 1024 1024"
                    width="64"
                    height="64"
                >
                    <path
                        fill="currentColor"
                        d="M512 0c282.784 0 512 229.216 512 512s-229.216 512-512 512S0 794.784 0 512 229.216 0 512 0z m236.32 294.144L408.896 633.536 259.84 484.544 192 552.416l216.896 216.928 407.296-407.296-67.872-67.904z"
                    ></path>
                </svg> -->
            </slot>
            <!-- <component :is="currentIcon"></component> -->
        </div>
        <div
            class="som-step__line"
            :style="lineStyle"
        ></div>
        <div class="som-step__title">
            <slot>
                <span :style="titleStyle">{{ title }}</span>
            </slot>
        </div>
    </span>
</template>

<script lang="ts">
/* eslint-disable max-len */
import { computed, defineComponent } from 'vue';
import { useParent } from '@/common/composition/useRelation';
import { isNumber } from '@souche-vue3/souche-util-vue';
import { IStepsProps } from 'types/components/steps';
import { StepProps } from './propType';
import { stepStatus } from './utils';
import { SomIcon } from '../icon';

export default defineComponent({
    name: 'SomStep',
    components: {
        SomIcon
    },
    props: StepProps,
    setup(props) {
        // 父子组件传递的数据
        const { parent, instance, index } = useParent<{
            emit: Function;
            props: IStepsProps;
        }>('som-steps');
        // data数据
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const parentProps = parent?.props!;
        const parentSlots = instance?.slots;

        // computed计算属性
        // current status
        const currentStatus = computed(() => stepStatus(props.status, index?.value, parentProps.active));
        const currentStatusClass = computed(() => ({
            'som-step': true,
            [`som-step--${currentStatus.value}`]: !!currentStatus.value,
        }));
        // style width, item长度限制
        const itemWidth = computed(() => props.itemLength || parentProps.itemLength);
        // icon的style，只区分等待和非等待
        const iconActiveColor = computed(() => props.activeColor || parentProps.activeColor);
        const iconInActiveColor = computed(() => props.inActiveColor || parentProps.inActiveColor);

        const circleStyle = computed(() => {
            // 除了wait以外
            if (currentStatus.value !== 'wait') {
                return {
                    color: iconActiveColor.value,
                    borderColor: iconActiveColor.value,
                };
            } else {
                return {
                    color: iconInActiveColor.value,
                    borderColor: iconInActiveColor.value,
                };
            }
        });
        // 线的颜色
        const lineStyle = computed(() => {
            if (currentStatus.value === 'done') {
                return {
                    backgroundColor: props.activeColor || parentProps.activeColor,
                };
            } else {
                return {
                    backgroundColor: props.inActiveColor || parentProps.inActiveColor,
                };
            }
        });
        // 当前应该渲染的ICON
        // const currentIcon = computed(() => {
        //     // 取slots或者icon或者默认图标
        //     const slot = getIconSlot(currentStatus.value, getCurrentInstance(), instance, circleStyle.value);
        //     if (index?.value === 1) {
        //         console.log(slot, 's');
        //     }
        //     return slot;
        // });
        // title 部分，限制字长
        const titleLength = computed(() => props.titleLength || parentProps.titleLength);
        const titleStyle = computed(() => {
            if (isNumber(titleLength.value)) {
                return { width: `${titleLength.value * 12}px` };
            } else {
                return {};
            }
        });
        // watch状态监听

        // methods方法
        // 点击事件
        const parentEmit = parent?.emit;
        const onClickMethod = () => {
            parentEmit && parentEmit('click-step', index);
        };

        // lifecycle生命周期

        return {
            index,
            itemWidth,
            circleStyle,
            lineStyle,
            currentStatus,
            currentStatusClass,
            titleStyle,
            parentProps,
            parentSlots,
            onClickMethod,
            iconActiveColor,
            iconInActiveColor,
        };
    },
});
</script>
