<style lang="less">
.pg-component-dialog {
    display: block;
    .dialog-content-wrapper {
        height: 100%;
        display: flex;
        flex-flow: column;
        padding: 0 20px;
        .dialog-title {
            text-align: center;
            font-size: 18px;
            line-height: 18px;
            font-weight: var(--font-weight-medium);
            margin: 40px 13px 22px 13px
        }
        .dialog-content {
            height: 100%;
            overflow-y: auto;
        }
        .dialog-action {
            // margin: 0 20px;
            margin-bottom: 20px;
            margin-top: 28px;
        }
    }
}
</style>

<template>
    <div class="pg-component-dialog">
        <som-dialog v-model:show="showDialog"></som-dialog>
        <som-dialog v-model:show="showDialog2" close-btn-position="inside">
            <div class="dialog-content-wrapper relative">
                <div class="dialog-title">
                    标题
                </div>
                <div class="dialog-content">
                    内容内容内容内容内容内容内容内容
                    内容内容内容内容内容内容内容内容内容
                    内容内容内容内容内容内容内容内容内容内容
                    内容内容内容内容内容内容内容内容内容内容内容
                    内容内容内容内容内容内容内容内容内容内容内容内容
                    内容内容内容内容内容内容内容内容内容内容内容内容内容
                </div>
                <div class="dialog-action">
                    <som-button>操作</som-button>
                </div>
            </div>
        </som-dialog>
        <div class="container-wrapper">
            <p class="text-left-p"> 弹窗 </p>
            <som-button class="mb10" @click="showDialog = !showDialog" mode="border">关闭按钮外置</som-button>
            <som-button class="mb10" @click="showDialog2 = !showDialog2" mode="border">关闭按钮内置</som-button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            showDialog: false,
            showDialog2: false
        };
    },
    methods: {
        // showDialog() {
        //     this.showDialog = !this.showDialog;
        // }
    }
};
</script>
