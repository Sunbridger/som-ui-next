<style lang="less">
@import '~@/styles/components/notice-bar/var.less';

@block: som-notice-bar;

.@{block} {
    // margin: 0 var(--notice-bar-mrl);
    padding: var(--notice-bar-padding-y) var(--notice-bar-padding-x);
    font-size: var(--notice-bar-fs);
    font-weight: var(--notice-bar-fw);
    border-radius: var(--notice-bar-border-radius);
    line-height: var(--notice-bar-line-height);

    .noticeBarType() {
        info: var(--notice-bar-info-color) var(--notice-bar-info-bg);
        warn: var(--notice-bar-warn-color) var(--notice-bar-warn-bg);
        success: var(--notice-bar-success-color) var(--notice-bar-success-bg);
    }
    each(.noticeBarType(), .(@v,@k) {
        &--@{k} {
            color: extract(@v, 1);
            background: extract(@v, 2);
        }
    })
    &--half-radius {
        border-radius: var(--border-radius-half) !important;
    }
    &__content {
        overflow: hidden;
        flex: 1;
        .@{block}__marquee {
            box-sizing: border-box;
            text-align: justify;
        }

        transition: var(--all-transition);
    }
    .arrow-right,
    .icon-svg {
        fill: var(--notice-bar-info-color);
    }
}
</style>

<template>
    <div
        class="som-notice-bar flex flex-align-center"
        :class="tagClass"
    >
        <slot name="icon"></slot>
        <div class="som-notice-bar__icon flex flex-justify-center mr4" @click="handleClose" aria-hidden="true" v-if="closable">
            <som-icon department="base" :size="12" type="close-s" color="var(--primary)"></som-icon>
        </div>
        <div
            class="som-notice-bar__content"
            ref="marqueeContentRef"
            role="marquee"
        >
            <div
                class="som-notice-bar__marquee"
                ref="marqueeRef"
                :style="style"
            >
                <slot></slot>
            </div>
        </div>
        <div
            class="som-notice-bar__operation"
            role="button"
        >
            <slot name="action">
                <div v-if="mode === 'link'" class="ml18 vertical-middle flex flex-justify-center">
                    <som-icon department="base" :size="12" type="right-arrow" color="var(--primary)"></som-icon>
                </div>
            </slot>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, CSSProperties, onMounted, onUpdated, onBeforeUnmount } from 'vue';
import { SomIcon } from '../icon';

interface IDataType {
    marqueeTimer?: any;
    marqueeDefault?: IMarqueeData;
    state?: any;
}
interface IMarqueeData {
    loop?: boolean;
    leading?: number;
    trailing?: number;
    fps?: number;
}

export default defineComponent({
    name: 'SomNoticeBar',
    props: {
        type: {
            type: String,
            default: 'info'
        },
        mode: {
            type: String
        },
        closable: {
            type: Boolean,
            default: false
        },
        halfRadius: {
            type: Boolean,
            default: true
        },
        marquee: {
            type: [Object, Boolean],
            default: false
        }
    },
    components: { SomIcon },
    setup(props, {emit}) {
        let marqueeTimer = 0;
        /** 走马灯速度等默认参数 */
        const marqueeDefault: IMarqueeData = reactive({
            loop: false,
            leading: 500,
            trailing: 800,
            fps: 50
        });
        const state = reactive({
            animatedWidth: 0,
            overflowWidth: 0
        });
        const marqueeRef = ref<HTMLElement>();
        const marqueeContentRef = ref<HTMLElement>();
        /** 样式 */
        const tagClass = computed(() => ({
            [`som-notice-bar--${props.type}`]: !!props.type,
            'som-notice-bar--half-radius': props.halfRadius
        }));
        /** content样式 */
        const style = computed(() => {
            const sty: CSSProperties = {
                position: 'relative',
                right: `${state.animatedWidth}px`,
                display: 'inline-block'
            };

            if (props.marquee) {
                sty.whiteSpace = 'nowrap';
            } else {
                sty.wordWrap = 'break-word';
                sty.wordBreak = 'break-all';
            }
            return sty;
        });
        /** 走马灯特效参数合集 */
        const marqueeProps: any = computed(() => Object.assign(marqueeDefault, props.marquee));

        /** 走马灯特效方法 */
        const startAnimation = () => {
            if (marqueeTimer) {
                clearTimeout(marqueeTimer);
            }
            const fps: number = marqueeProps.value.fps;
            const TIMEOUT = 1 / fps * 1000; //eslint-disable-line
            const isLeading = state.animatedWidth === 0;
            const timeout = isLeading ? marqueeProps.value.leading : TIMEOUT;
            const animate = () => {
                const { overflowWidth } = state;
                let animatedWidth = state.animatedWidth + 1;
                const isRoundOver = animatedWidth > overflowWidth;

                if (isRoundOver) {
                    if (marqueeProps.value.loop) {
                        animatedWidth = 0;
                    } else {
                        return;
                    }
                }

                if (isRoundOver && marqueeProps.value.trailing) {
                    marqueeTimer = setTimeout(() => {
                        state.animatedWidth = animatedWidth;

                        marqueeTimer = setTimeout(animate, TIMEOUT);
                    }, marqueeProps.value.trailing);
                } else {
                    state.animatedWidth = animatedWidth;

                    marqueeTimer = setTimeout(animate, TIMEOUT);
                }
            };

            if (state.overflowWidth !== 0) {
                marqueeTimer = setTimeout(animate, timeout);
            }
        };
        /** 走马灯效果下内部文案样式 */
        const measureText = () => {
            if (marqueeRef?.value) {
                const containerWidth = marqueeContentRef?.value?.offsetWidth || 0;
                const textWidth = marqueeRef?.value?.offsetWidth;
                const overflowWidth = textWidth - containerWidth;
                if (overflowWidth !== state.overflowWidth) {
                    state.overflowWidth = overflowWidth;
                }
            }
        };
        /** 点击关闭标签实践 */
        const handleClose = () => {
            emit('close');
        };

        onMounted(() => {
            measureText();
            startAnimation();
        });
        onUpdated(() => {
            startAnimation();
        });
        onBeforeUnmount(() => {
            clearTimeout(marqueeTimer);
        });
        return {
            marqueeRef,
            marqueeContentRef,
            tagClass,
            style,
            handleClose
        };
    }
});
</script>
