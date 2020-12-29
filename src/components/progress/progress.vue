<style lang="less">
@import '~@/styles/components/progress/var.less';

@block: som-progress;

.@{block} {
    margin: 0 20px;
    background: #f7f8fa;
    border-radius: 12px;
    padding: 12px 20px;
    color: var(--progress-font-color);
    font-size: var(--progress-fs);
    line-height: 1;
    font-family: 'Helvetica Neue';
    &.@{block}--allin {
        .@{block}__bar {
            width: 100%;
        }
    }
    .@{block}__bar {
        height: var(--progress-bar-height);
        background: var(--progress-bar-bg);
        border-radius: var(--progress-bar-height);
        width: 83.636%;
        .@{block}__inner-bar {
            width: 30px;
            height: var(--progress-bar-height);
            background: var(--progress-bar-color);
            border-radius: var(--progress-bar-height);
        }
    }
    &.@{block}--tick {
        .@{block}__bar {
            height: var(--progress-bar-tick-height);
            border-radius: var(--progress-bar-tick-height);
            transform: scale(1, 1);
            .@{block}__inner-bar {
                width: 30px;
                height: var(--progress-bar-tick-height);
                border-radius: var(--progress-bar-tick-height);
            }
        }
    }
    &__tick-wrap {
        position: absolute;
        top: 0;
        margin-left: -6px;
        & > .tick-icon {
            position: absolute;
            left: 0;
            top: 1px;
            height: 4px;
            width: 4px;
            border-radius: 50%;
            display: inline-block;
            &.circle {
                background-color: var(--text-hint);
            }
            &.circle-o {
                background: #fff;
            }
        }
        & > .tick-content {
            position: absolute;
            top: 12px;
            left: 0;
            transform: translateX(-50%);
            color: var(--text-caption);
            font-size: 10px;
        }
    }
}
</style>

<template>
    <div
        class="som-progress"
        :class="{'som-progress--tick' : ticks, 'som-progress--allin' : ifAllin}"
        :style="[progressType, fillColor]"
    >
        <div
            class="som-progress__tip mb8"
            v-if="showTip && tipPosition === 'top'"
        >
            <span v-if="tipContent">{{tipContent}}</span>
            <span v-else>{{percent}}%</span>
        </div>
        <div class="flex flex-align-center">
            <div class="som-progress__bar flex-no-shrink">
                <div
                    class="som-progress__inner-bar"
                    :style="innerBarStyle"
                ></div>
                <!-- v-if="typeof item.percent !== 'undefined'" -->
                <span
                    class="som-progress__tick-wrap"
                    v-for="(item, index) in ticks || []"
                    :style="tickStyle(item)"
                    :key="index"
                >
                    <i
                        class="tick-icon circle"
                        v-show="item.percent > percent"
                    ></i>
                    <i
                        class="tick-icon circle-o"
                        v-show="item.percent <= percent"
                    ></i>
                    <br>
                    <span class="tick-content">{{item.text}}</span>
                </span>
            </div>
            <span
                class="som-progress__tip ml12"
                v-if="showTip && tipPosition === 'right'"
            >
                <span v-if="tipContent">{{tipContent}}</span>
                <span v-else>{{percent}}%</span>
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, CSSProperties } from 'vue';
import { ITicksType } from 'types/components/progress';

type TipPositon = 'top' | 'right';
export default defineComponent({
    name: 'SomProgress',
    props: {
        percent: {
            type: Number,
            default: 0
        },
        barColor: {
            type: String
        },
        filledColor: {
            type: String
        },
        unfilled: {
            type: Boolean,
            default: false
        },
        width: {
            type: String
        },
        ticks: {
            type: Array as PropType<ITicksType[]>
        },
        showTip: {
            type: Boolean,
            default: true
        },
        tipContent: {
            type: String
        },
        tipPosition: {
            type: String as PropType<TipPositon>,
            default: 'right'
        }

    },
    setup(props) {
        /** 进度条外框样式 */
        // todo 优化px转vw
        const progressType = computed(() => {
            const style: CSSProperties = {};
            if (props.ticks && props.ticks.length) {
                style['padding-bottom'] = '20px';
            }
            if (props.width) {
                style['width'] = `${props.width}px`;
            }
            return style;
        });
        /** 进度条背景色 */
        const fillColor = computed(() => {
            if (props.unfilled) {
                return { 'background-color': 'transparent' };
            } else if (props.filledColor) {
                return { 'background-color': props.filledColor };
            }
        });
        /** 进度条内部bar样式 */
        const innerBarStyle = computed(() => {
            if (props.barColor) {
                return { 'background-color': props.barColor, width: `${+props.percent}%` };
            } else {
                return { width: `${+props.percent}%` };
            }
        });
        /** 进度条是否占满父dom宽度 */
        const ifAllin = computed(() => {
            if (props.showTip && props.tipPosition === 'right') {
                return false;
            }
            return true;
        });

        /** 计算带刻度进度条的刻度的位置 */
        const tickStyle = (item: ITicksType) => {
            const min = 2.2;
            const max = 100;
            let percent = +item.percent;
            percent = percent < min ? min : percent;
            percent = percent > max ? max : percent;
            return { left: `${percent}%` };
        };
        return {
            progressType,
            fillColor,
            innerBarStyle,
            ifAllin,
            tickStyle
        };
    }
});
</script>
