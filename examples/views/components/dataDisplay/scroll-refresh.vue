<style lang="less">
.pg-component-scroll-refresh {
    .example-scroll-ul-wrapper {
        li {
            text-align: center;
            border-top: 1px solid;
            height: 40px;
            line-height: 40px;
        }
    }
    .myslot {
        color: #969799;
    }
}
</style>
<template>
    <!-- eslint-disable max-len -->
    <div class="pg-component-scroll-refresh">
        <som-scroll-refresh
            v-bind="bindData"
            ref="root"
        >
            <template #pullDownPulling="props">
                <div class="som-scroll-refresh__spinner my-slot">
                    <span class="som-scroll-refresh__spinner__icon">
                        <svg
                            class="som-scroll-refresh__spinner__loading-circular"
                            viewBox="0 0 1024 1024"
                            width="32"
                            height="32"
                            :style="{ transform: `rotate(${(216 / 72) * props.distance}deg)` }"
                        >
                            <path
                                fill="currentColor"
                                d="M512 907c-24.852 0-45-20.148-45-45s20.148-45 45-45c168.446 0 305-136.554 305-305S680.446 207 512 207 207 343.554 207 512c0 24.852-20.148 45-45 45S117 536.852 117 512c0-218.152 176.848-395 395-395S907 293.848 907 512 730.152 907 512 907z"
                                p-id="3009"
                            ></path>
                        </svg>
                        <!-- <svg viewBox="25 25 50 50">
                            <circle stroke="currentColor" cx="50" cy="50" r="20" fill="none" />
                        </svg> -->
                    </span>
                    <span
                        class="text"
                        :style="{ color: '#969799' }"
                    >下拉刷新</span>
                </div>
            </template>
            <template #pullDownLoosing="props">
                <div class="som-scroll-refresh__spinner my-slot">
                    <span class="som-scroll-refresh__spinner__icon">
                        <svg
                            class="som-scroll-refresh__spinner__loading-circular"
                            viewBox="0 0 1024 1024"
                            width="32"
                            height="32"
                            :style="{ transform: `rotate(${270 + (144 / 48) * (props.distance - 72)}deg)` }"
                        >
                            <path
                                fill="currentColor"
                                d="M512 907c-24.852 0-45-20.148-45-45s20.148-45 45-45c168.446 0 305-136.554 305-305S680.446 207 512 207 207 343.554 207 512c0 24.852-20.148 45-45 45S117 536.852 117 512c0-218.152 176.848-395 395-395S907 293.848 907 512 730.152 907 512 907z"
                                p-id="3009"
                            ></path>
                        </svg>
                        <!-- <svg viewBox="25 25 50 50">
                            <circle stroke="currentColor" cx="50" cy="50" r="20" fill="none" />
                        </svg> -->
                    </span>
                    <span
                        class="text"
                        :style="{ color: '#969799' }"
                    >松开刷新</span>
                </div>
            </template>
            <ul class="example-scroll-ul-wrapper">
                <li
                    v-for="item in data"
                    :key="item"
                >
                    {{ item }}
                </li>
            </ul>
        </som-scroll-refresh>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    setup() {
        const root = ref<HTMLElement>();
        let time = 2;
        const data: number[] = [];
        for (let i = 0; i < 30; i += 1) {
            data.push(i);
        }
        const pullDown = (e) => {
            setTimeout(() => {
                e.refreshed();
            }, 2000);
        };

        const pullUp = (e) => {
            setTimeout(() => {
                data.push(30 + time);
                e.loaded();
                if (time <= 0) {
                    e.completed();
                }
                time -= 1;
            }, 2000);
        };
        const bindData = {
            style: {
                minHeight: 'calc(100vh - 44px)',
            },
            successPullDownText: '刷新成功',
            loadingPullDownText: '正在刷新',
            loosingPullDownText: '松开刷新...',
            pullingPullDownText: '下拉刷新',
            successPullUpText: '加载成功.',
            loadingPullUpText: '加载中...',
            finishedText: '没有更多了',
            pullDown,
            pullUp,
        };

        return {
            bindData,
            data,
            root,
        };
    },
});
</script>
