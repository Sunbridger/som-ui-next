<style lang="less">
.pg-component-toast {
}
</style>

<template>
    <div class="pg-component-toast">
        <div class="container-wrapper">
            <p class="text-left-p">提示类型</p>
            <som-button
                @click="showType('success')"
                mode="border"
            >显示成功提示</som-button>
            <som-button
                @click="showType('error')"
                mode="border"
            >显示错误提示</som-button>
            <som-button
                @click="showType('warn')"
                mode="border"
            >显示警告提示</som-button>
            <som-button
                @click="showType('text')"
                mode="border"
            >显示文案提示</som-button>
            <som-button
                class="no-margin"
                @click="showType('loading')"
                mode="border"
            >显示加载提示</som-button>
            <p class="text-left-p">提示位置</p>
            <som-button
                @click="showToast('top')"
                mode="border"
            >上方</som-button>
            <som-button
                @click="showToast('middle')"
                mode="border"
            >中间</som-button>
            <som-button
                @click="showToast2('default')"
                mode="border"
            >默认</som-button>
            <som-button
                @click="showToast('bottom')"
                mode="border"
            >底部</som-button>
            <som-button
                @click="showToast('30px')"
                mode="border"
            >自定义位置</som-button>
            <p class="text-left-p">轻提示其他能力</p>
            <som-button
                @click="noMask"
                mode="border"
            >没有蒙层的提示</som-button>
            <som-button
                @click="destroyMask"
                mode="border"
            >关闭组件</som-button>
            <som-button
                @click="showRenderToast"
                mode="border"
            >html显示</som-button>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
// eslint-disable-next-line no-unused-vars
import { IToastInstance } from 'types/components/toast';

export default defineComponent({
    data() {
        return {
            show: false,
            toastInstance: {} as IToastInstance,
        };
    },
    methods: {
        showToast(position?: string) {
            this.$som.toast.text({
                position: position || 'default',
                text: position,
            });
        },
        showToast2(position?: string) {
            this.$som.toast.text({
                position: position || 'default',
                text: '这是文案这是文案这是这个已经是最宽的情况',
                time: 10000,
            });
        },
        showType(type?: 'success' | 'loading' | 'warn' | 'text' | 'error') {
            type &&
                this.$som.toast[type]({
                    type,
                    text: '加载中…',
                    isTransparent: false,
                });
        },
        noMask() {
            this.toastInstance = this.$som.toast({
                text: '没有蒙层',
                showMask: false,
            });
        },
        destroyMask() {
            console.log(this.toastInstance);
            this.toastInstance.hide();
        },
        showRenderToast() {
            this.$som.toast.text({
                text: '<div>我是html</div>',
            });
        },
    },
});
</script>
