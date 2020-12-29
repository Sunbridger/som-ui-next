<template>
    <div class="pg-component-modal">
        <som-modal v-model:show="show" title="标题" :isConfirm="true">
            文案文案文案文案文案文案文案文案文案文案案文案文案
        </som-modal>
        <som-modal v-model:show="show2" title="标题" :isConfirm="false">
            文案文案文案文案文案文案文案文案文案文案案文案文案
        </som-modal>
        <som-modal v-model:show="show3" :isConfirm="false">
            文案文案文案文案文案文案文案文案文案文案案文案文案
        </som-modal>
        <som-modal v-model:show="show4" title="<div>html 标题</div>" :isConfirm="false"> </som-modal>
        <div class="container-wrapper">
            <p class="text-left-p">组件形式调用弹窗</p>
            <som-button class="mb10" @click="showPopup('show')" mode="border">确认弹窗</som-button>
            <som-button class="mb10" @click="showPopup('show2')" mode="border">提示弹窗</som-button>
            <som-button @click="showPopup('show3')" mode="border">无标题弹窗</som-button>
            <som-button @click="showPopup('show4')" mode="border">告知/警示类弹窗</som-button>
            <p class="text-left-p">插件形式调用弹窗</p>
            <som-button class="mb10" @click="showModalPlugin" mode="border">插件形式调用弹窗</som-button>
            <som-button @click="showModalTextTypePlugin" mode="border">插件形式调用普通弹窗</som-button>
        </div>
    </div>
</template>
<script lant="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            show: false,
            show2: false,
            show3: false,
            show4: false,
        };
    },
    methods: {
        showPopup(show) {
            this[show] = !this[show];
        },
        showModalPlugin() {
            this.$som.modal.confirm({
                title: '确认框',
                content: '插件式确认框',
                onConfirm() {
                    return new Promise(reslove => {
                        setTimeout(() => {
                            reslove(1);
                        }, 2000);
                    });
                },
            });
        },
        showModalTextTypePlugin() {
            this.$som.modal.text({
                title: '<div>html 标题</div>',
            });
        },
    },
});
</script>
