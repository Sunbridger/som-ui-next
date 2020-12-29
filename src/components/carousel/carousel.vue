<style lang="less">
@import '~@/styles/components/carousel/var.less';

.som-carousel {
    overflow: hidden;
    position: relative;
    & > &__swiper {
        overflow: hidden;
        position: relative;
    }
    & > &__indicator,
    &__indicator-right {
        position: absolute;
        right: 15px;
        bottom: 2px;
        & > a {
            float: left;
            margin-left: var(--carousel-point-spacing);
            
        }
    }
    &__icon-dot.active {
        opacity: 1;
    }
    &__icon-dot {
        display: inline-block;
        vertical-align: middle;
        width: var(--carousel-point-diameter);
        height: var(--carousel-point-diameter);
        border-radius: 3px;
        background-color: var(--carousel-point-color);
        opacity: var(--carousel-point-transparent);
    }
    & > &__indicator-center {
        right: 50%;
        transform: translateX(50%);
    }
    & > &__indicator-left {
        left: 15px;
        right: auto;
    }
    
    &__carousel-item {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        & > a {
            display: block;
            width: 100%;
            height: 100%;

            & > .som-carousel__img {
                display: block;
                width: 100%;
                height: 100%;
                background: center center no-repeat;
                background-size: cover;
            }
        }
    }
}
</style>

<template>
    <div
        class="som-carousel"
        ref="root"
    >
        <div
            class="som-carousel__swiper"
            :style="{height: xheight}"
        >
            <slot></slot>
            <div
                class="som-carousel__carousel-item"
                v-for="(item, index) in list"
                :key="`item${index}`"
                @click="clickListItem(index)"
                :data-index="index"
            >

                <a href="javascript:">
                    <div
                        class="som-carousel__img"
                        :style="{backgroundImage: buildBackgroundUrl(item)}"
                    ></div>
                </a>
            </div>
            <template v-if="listTwoLoopItem.length > 0">
                <div
                    class="som-carousel__carousel-item som-carousel__carousel-item-clone"
                    v-for="(item, index) in listTwoLoopItem"
                    :key="index"
                    @click="clickListItem(index)"
                    :data-index="index"
                >

                    <a href="javascript:">
                        <div
                            class="som-carousel__img"
                            :style="{backgroundImage: buildBackgroundUrl(item)}"
                        ></div>
                    </a>
                </div>
            </template>
        </div>

        <div
            :class="[dotsClass, 'som-carousel__indicator', `som-carousel__indicator-${dotsPosition}`]"
            v-show="showDots"
        >
            <a
                href="javascript:"
                v-for="(key, index) in length"
                :key="index"
            >
                <i
                    class="som-carousel__icon-dot"
                    :class="{'active': key - 1 === current}"
                ></i>
            </a>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref, nextTick, onMounted, getCurrentInstance, onBeforeUnmount, PropType } from 'vue';
import Swiper from './swiper';

export default defineComponent({
    name: 'SomCarousel',
    props: {
        list: {
            type: Array as PropType<string[]>,
            default: () => [],
        },
        direction: {
            type: String,
            default: 'horizontal',
        },
        showDots: {
            type: Boolean,
            default: true,
        },
        dotsPosition: {
            type: String,
            default: 'center',
        },
        dotsClass: String,
        auto: Boolean,
        loop: Boolean,
        interval: {
            type: Number,
            default: 3000,
        },
        threshold: {
            type: Number,
            default: 50,
        },
        duration: {
            type: Number,
            default: 300,
        },
        height: {
            type: String,
            default: 'auto',
        },
        minMovingDistance: {
            type: Number,
            default: 0,
        },
        value: {
            type: Number,
            default: 0,
        },
        offset: {
            type: Number,
            default: -100,
        },
    },
    emits: ['on-index-change', 'input', 'on-get-height', 'on-click-item'],
    setup(props, { emit }) {
        const current = ref(0); // 当前的轮播的index
        const hasRender = ref(false);
        const xheight = ref('auto');
        const length = ref(props.list.length);
        const index = ref(0); // 初始化的时候展示index，后期跟current 一致
        const listTwoLoopItem = ref<Array<any>>([]); // 如果只传入2张图片，则特殊处理,会进行克隆两张
        let swiper: null | Swiper = null; // 一个滑动对象，处理滚动事件
        const vm = getCurrentInstance();

        watch(
            () => props.auto,
            (val) => {
                if (!val) {
                    swiper && swiper.stop();
                } else {
                    swiper && swiper.auto();
                }
            },
        );
        // 当当前页面索引改变，触发change
        watch(current, (val) => {
            index.value = val;
            emit('on-index-change', val);
        });
        watch(index, (val) => {
            if (val !== current.value) {
                nextTick(() => {
                    current.value = val;
                    swiper && swiper.go(val);
                });
            }
            emit('input', val);
        });
        watch(
            () => props.value,
            (val) => {
                index.value = val;
            },
        );
        // 如果是无限循环，则克隆两张
        watch(() => props.list, () => {
            rerender();
        });
        const hasTwoLoopItem = () => {
            if (props.list.length === 2 && props.loop) {
                listTwoLoopItem.value = props.list as Array<any>;
            } else {
                listTwoLoopItem.value = [];
            }
        };
        const clickListItem = (i: number) => {
            emit('on-click-item', i);
        };
        const buildBackgroundUrl = (item: string) => `url(${item})`;
        // 进行初始化渲染
        const render = (xindex: number | undefined = 0) => {
            swiper && swiper.destroy();
            swiper = new Swiper({
                container: vm && vm.refs.root,
                direction: props.direction,
                auto: props.auto,
                loop: props.loop,
                interval: props.interval,
                threshold: props.threshold,
                duration: props.duration,
                height: props.height,
                minMovingDistance: props.minMovingDistance,
                imgList: props.list,
                offset: props.offset,
            });
            swiper.on('swiped', (prev: number, i: any) => {
                current.value = i % length.value;
                index.value = i % length.value;
            });
            // 如果传入默认index，则跳转到对应的index
            if (xindex > 0) {
                swiper.go(xindex);
            }
        };
        // 重新进行轮播的渲染
        const rerender = () => {
            if (!vm?.refs.root || hasRender.value) {
                return;
            }
            // 标记是否重新渲染
            hasRender.value = true;
            hasTwoLoopItem();
            // 进行重新绘制和初始化
            nextTick(() => {
                index.value = props.value || 0;
                current.value = props.value || 0;
                length.value = props.list.length;
                destroy();
                render(props.value);
            });
        };
        const destroy = () => {
            hasRender.value = false;
            swiper && swiper.destroy();
        };
        // 获取高度，默认值为180px；
        const getHeight = () => {
            const hasHeight = parseInt(props.height, 10);
            if (hasHeight) return props.height;
            if (!hasHeight) {
                return '180px';
            }
            return '';
        };
        onMounted(() => {
            // 初始化展示第几张图
            index.value = props.value || 0;
            if (index.value) {
                current.value = index.value;
            }
            hasTwoLoopItem();
            nextTick(() => {
                // 进行绘制，并返回高度
                if (!(props.list && props.list.length === 0)) {
                    render(index.value);
                }
                xheight.value = getHeight();
                emit('on-get-height', xheight.value);
            });
        });
        onBeforeUnmount(() => {
            destroy();
        });
        return {
            current,
            hasRender,
            xheight,
            length,
            index,
            listTwoLoopItem,
            swiper,
            hasTwoLoopItem,
            clickListItem,
            buildBackgroundUrl,
            render,
            destroy,
            rerender,
        };
    },
});
</script>
