<style lang="less">
.pg-component-popup {
    .popup-no-transition,
    .popup-no-transition-mask {
        transition: all 0s;
    }
    .som-popup .som-popup__container {
        height: calc(100% - 20px);
        flex-flow: column;
        margin-bottom: 20px;
        .som-popup__title {
            flex-shrink: 0;
            height: 68px;
            font-size: var(--font-size-title);
            font-weight: var(--font-weight-semibold);
            color: var(--text-title);
            text-align: center;
            margin-bottom: 16px;
            .cross {
                width: 24px;
                height: 24px;
                position: absolute;
                top: 50%;
                right: 20px;
                transform: translateY(-50%);
            }
        }
        .som-popup__content {
            overflow-y: scroll;
            height: 100%;
            font-size: var(--font-size-content);
            font-weight: var(--font-weight-regular);
            color: var(--text-body);
            margin: 0 16px;
            &::-webkit-scrollbar {
                width: 0.8vw;
                height: 2.133vw;
            }
            &::-webkit-scrollbar-thumb {
                background-color: #ccc;
                border-radius: 0.8vw;
            }
        }
    }
}
</style>
<template>
    <div class="pg-component-popup">
        <som-popup
            v-model:show="show"
            width="80%"
            height="440px"
            max-height="60vh"
            :custom-style="customStyle"
        >
            <div class="som-popup__container flex">
                <div class="som-popup__title relative">
                    <p class="absolute-center">标题</p>
                    <img
                        class="cross"
                        src="//img.souche.com/f2e/9a4d47b57065e5858ad9a1ba4341a9f2.png"
                        @click="show = false"
                    />
                </div>
                <div class="som-popup__content">
                    <div>
                        我说了我想滚动，啊啊啊啊！<br /><br /><br /><br /><br />
                        我说了我想滚动，啊啊啊啊！<br /><br /><br /><br /><br />
                        我说了我想滚动，啊啊啊啊！
                    </div>
                </div>
            </div>
        </som-popup>
        <som-popup
            v-model:show="show2"
            position="bottom"
        >
            <div style="margin-bottom: 50px;">没想到吧，我从底部出来</div>
        </som-popup>
        <som-popup
            v-model:show="show3"
            position="left"
        >
            <div>没想到吧，我又从左边出来</div>
        </som-popup>
        <som-popup
            v-model:show="show4"
            position="right"
        >
            <div>没想到吧，我又从右边出来</div>
        </som-popup>
        <som-popup
            v-model:show="show5"
            position="top"
        >
            <div>我还能从上边出来</div>
        </som-popup>
        <som-popup
            v-model:show="show6"
            position="center"
            width="200px"
            height="200px"
        >
            <div>正经弹窗</div>
        </som-popup>
        <som-popup
            v-model:show="show7"
            width="80%"
            height="40vh"
            is-transparent
        >
            <div>带标题的弹窗 is so long</div>
        </som-popup>
        <som-popup
            v-model:show="show8"
            width="80%"
            height="40vh"
            :hide-on-blur="false"
        >
            <div class="som-popup__container flex">
                <div class="som-popup__title relative">
                    <p class="absolute-center">标题</p>
                    <img
                        class="cross"
                        src="//img.souche.com/f2e/9a4d47b57065e5858ad9a1ba4341a9f2.png"
                        @click="show8 = false"
                    />
                </div>
                <div class="som-popup__content">
                    <div>
                        我说了我想滚动，啊啊啊啊！<br /><br /><br /><br /><br />
                        我说了我想滚动，啊啊啊啊！<br /><br /><br /><br /><br />
                        我说了我想滚动，啊啊啊啊！
                    </div>
                </div>
            </div>
        </som-popup>
        <som-popup
            class="popup-no-transition"
            v-model:show="show9"
            width="80%"
            height="40vh"
            mask-class="popup-no-transition-mask"
            mask-transition="none12321"
            transition="noneqwewq"
        >
            <div>没有动画</div>
        </som-popup>
        <div class="container-wrapper">
            <p class="text-left-p">弹窗样式</p>
            <som-button
                class="mb10"
                @click="showPopup"
                mode="border"
            >带标题的弹窗</som-button>
            <som-button
                class="mb10"
                @click="show7 = !show7"
                mode="border"
            >透明遮罩层弹窗</som-button>
            <som-button
                class="mb10"
                @click="show8 = !show8"
                mode="border"
            >点击蒙层不会关闭</som-button>
            <som-button
                class="mb10"
                @click="show9 = !show9"
                mode="border"
            >没有动画</som-button>
            <p class="text-left-p">弹窗位置</p>
            <som-button
                class="mb10"
                @click="show2 = !show2"
                mode="border"
            >底部弹窗</som-button>
            <som-button
                class="mb10"
                @click="show3 = !show3"
                mode="border"
            >左侧弹窗</som-button>
            <som-button
                class="mb10"
                @click="show4 = !show4"
                mode="border"
            >右侧弹窗</som-button>
            <som-button
                class="mb10"
                @click="show5 = !show5"
                mode="border"
            >顶部弹窗</som-button>
            <som-button
                class="mb10"
                @click="show6 = !show6"
                mode="border"
            >中部弹窗</som-button>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            show: false,
            show2: false,
            show3: false,
            show4: false,
            show5: false,
            show6: false,
            show7: false,
            show8: false,
            show9: false,
            customStyle: {},
        };
    },
    methods: {
        showPopup() {
            this.show = !this.show;
        },
    },
});
</script>
