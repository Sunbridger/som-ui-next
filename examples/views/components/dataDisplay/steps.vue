<template>
    <!-- eslint-disable max-len -->
    <div class="pg-component-steps">
        <div class="container-wrapper">
            <p class="text-left-p">基本用法</p>
            <som-steps :active="2">
                <som-step :title="'我是0号'"></som-step>
                <som-step :title="'我是1号'"></som-step>
                <som-step :title="'我是2号，啊啊啊'"></som-step>
                <som-step :title="'我是3号'"></som-step>
                <som-step :title="'我是4号'"></som-step>
                <som-step :title="'我是5号'"></som-step>
            </som-steps>
            <p class="text-left-p">自适应宽度用法</p>
            <som-steps
                :active="1"
                flexable
            >
                <som-step :title="'我是0号'"></som-step>
                <som-step :title="'我是1号'"></som-step>
                <som-step :title="'我是2号，啊啊啊'"></som-step>
            </som-steps>
            <som-steps
                :active="1"
                flexable
            >
                <som-step :title="'我是0号'"></som-step>
                <som-step :title="'我是1号'"></som-step>
                <som-step :title="'我是2号'"></som-step>
                <som-step :title="'我是3号'"></som-step>
            </som-steps>
            <p class="text-left-p">垂直用法</p>
            <som-steps
                :active="1"
                :direction="'vertical'"
            >
                <som-step :title="'我是0号'"></som-step>
                <som-step :title="'我是1号'"></som-step>
                <som-step :title="'我是2号'"></som-step>
                <som-step :title="'我是3号'"></som-step>
            </som-steps>
            <p class="text-left-p">
                父组件插槽用法<br />
                定义了激活状态和完成状态的icon
            </p>
            <som-steps
                :active="2"
                :in-active-color="'#000'"
            >
                <template v-slot:doneIcon>
                    <svg
                        class=""
                        data-icon="check"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        aria-hidden="true"
                        viewBox="64 64 896 896"
                        focusable="false"
                    >
                        <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path>
                    </svg>
                </template>
                <template v-slot:activeIcon>
                    <svg
                        style="animation: loadingCircle 1s linear infinite;"
                        data-icon="loading"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        aria-hidden="true"
                        viewBox="0 0 1024 1024"
                        focusable="false"
                    >
                        <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path>
                    </svg>
                </template>
                <som-step :title="'我是0号'"></som-step>
                <som-step :title="'我是1号'"></som-step>
                <som-step :title="'我是2号'"></som-step>
                <som-step :title="'我是3号'"></som-step>
            </som-steps>
            <p class="text-left-p">控制进度</p>
            <som-steps
                :active="state.active"
                @click-step="(index) => {state.active = index}"
            >
                <template v-slot:doneIcon>
                    <svg
                        class="done-icon"
                        data-icon="check"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        aria-hidden="true"
                        viewBox="64 64 896 896"
                        focusable="false"
                    >
                        <path
                            class="done-icon-path"
                            d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"
                        ></path>
                    </svg>
                </template>
                <template v-slot:activeIcon>
                    <svg
                        class="active-icon"
                        data-icon="loading"
                        style="animation: loadingCircle 1s linear infinite;"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        aria-hidden="true"
                        viewBox="0 0 1024 1024"
                        focusable="false"
                    >
                        <path
                            class="active-icon-path"
                            d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"
                        ></path>
                    </svg>
                </template>
                <som-step :title="'我是0号'"></som-step>
                <som-step :title="'我是1号'"></som-step>
                <som-step :title="'我是2号'"></som-step>
                <som-step>
                    <span> 我是3号 </span>
                </som-step>
            </som-steps>
            <div class="text-center mb20">
                <som-button
                    @click="btn"
                    style="width:50%"
                    inline
                >下一步</som-button>
            </div>
        </div>
    </div>
</template>
<script>
import { defineComponent, reactive } from 'vue';

export default defineComponent({
    setup() {
        const state = reactive({
            active: 0,
            activeColor: '#000',
        });
        const btn = () => {
            state.active += 1;
        };

        return {
            state,
            btn,
        };
    },
});
</script>
