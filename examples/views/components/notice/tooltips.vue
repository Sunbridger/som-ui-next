<style lang="less">
.action-btn {
    margin-top: 8px;
    margin-bottom: 4px;
    border-color: var(--tooltips-dark-color) !important;
    color: var(--tooltips-dark-color) !important;
    .som-button--content {
        padding: 0 7.5px;
    }
}
.pg-component-tooltips {
    .mt40 {
        margin-top: 40px;
    }
}
</style>

<template>
    <div class="pg-component-tooltips">
        <div class="container-wrapper">
            <p class="text-left-p">基础用法</p>
            <som-tooltips
                v-model:show="show1"
                content="字数的限制在十二个字之内"
                placement="bottom-start"
                effect="dark"
                :closable="true"
            >
                <som-button
                    inline
                    size="medium"
                    mode="border"
                > 深色 </som-button>
            </som-tooltips>
            <som-tooltips
                v-model:show="show4"
                :content="'我是light主题色的tooltips'"
                placement="bottom-start"
                effect="light"
                :closable="true"
            >
                <som-button
                    class="ml15"
                    inline
                    size="medium"
                    mode="border"
                > 浅色 </som-button>
            </som-tooltips>

            <p class="text-left-p">带标题用法</p>
            <som-tooltips
                v-model:show="show8"
                title="这是新功能标题"
                content="快来试试扫Vin码的功能吧！赶快来体验吧"
                placement="bottom-start"
                effect="dark"
                :closable="true"
            >
                <som-button
                    inline
                    size="medium"
                    mode="border"
                > 带标题 </som-button>
            </som-tooltips>
            <som-tooltips
                v-model:show="show3"
                placement="bottom-start"
                effect="dark"
                :closable="false"
            >
                <template v-slot:title>
                    我是插槽标题
                </template>
                <template v-slot:content>
                    我是插槽内容，内容好长呀呀呀呀呀呀呀
                </template>
                <som-button
                    class="ml15"
                    inline
                    size="medium"
                    mode="border"
                > 插槽用法 </som-button>
            </som-tooltips>
            <p class="text-left-p">关闭按钮</p>
            <som-tooltips
                v-model:show="show7"
                :content="'基础用法的tooltips'"
                placement="bottom-start"
                effect="dark"
                :closable="false"
            >
                <som-button
                    inline
                    size="medium"
                    mode="border"
                > 没有关闭按钮 </som-button>
            </som-tooltips>
            <p class="text-left-p">列表</p>
            <som-tooltips
                v-model:show="show6"
                placement="bottom-start"
                effect="dark"
                :closable="false"
            >
                <template v-slot:content>
                    <som-tooltips-item>我是1号</som-tooltips-item>
                    <som-tooltips-item>我是2号</som-tooltips-item>
                </template>
                <som-button
                    inline
                    size="medium"
                    mode="border"
                > list tooltips </som-button>
            </som-tooltips>
            <p class="text-left-p">带操作按钮</p>
            <som-tooltips
                v-model:show="show5"
                placement="right"
                effect="dark"
                :closable="true"
            >
                <template v-slot:content>
                    <div>快来试试扫Vin码的功能吧!
                        赶快来体验吧
                    </div>
                    <div>
                        <som-button
                            class="action-btn"
                            inline
                            size="small"
                            mode="plain"
                        > 了解详情 </som-button>
                    </div>
                </template>
                <som-button
                    inline
                    size="medium"
                    mode="border"
                > 带操作按钮 </som-button>
            </som-tooltips>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue';

export default {
    setup() {
        const show1 = ref(false);
        const show2 = ref(false);
        const show3 = ref(false);
        const show4 = ref(false);
        const show5 = ref(false);
        const show6 = ref(false);
        const show7 = ref(false);
        const show8 = ref(false);
        const show9 = ref(false);

        return {
            show1,
            show2,
            show3,
            show4,
            show5,
            show6,
            show7,
            show8,
            show9,
            content: '字数的限制在十二个字以内',
            title: '标题啊啊啊'
        };
    }
};
</script>
