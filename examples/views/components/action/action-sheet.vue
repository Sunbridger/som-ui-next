<template>
    <div class="pg-component-action-sheet">
        <section class="area pl16 pr16 pt16">
            <som-button mode="plain" class="mb10" @click="dialogShow = !dialogShow">基础示例一</som-button>
            <som-button mode="plain" class="mb10" @click="dialogShow1 = !dialogShow1">基础示例二</som-button>
            <som-button mode="plain" class="mb10" @click="dialogShow2 = !dialogShow2">带警示操作</som-button>
        </section>
        <som-action-sheet v-model:show="dialogShow"
        title="文案描述描述"
        :menus="menus"
        @on-click-cancel="cancel"
        @on-click-menu="click">
        </som-action-sheet>
        <som-action-sheet v-model:show="dialogShow1"
        :menus="['高德地图', '百度地图']"
        @on-click-cancel="cancel"
        @on-click-menu="click">
        </som-action-sheet>
        <som-action-sheet v-model:show="dialogShow2"
        :menus="menus1"
        @on-click-cancel="cancel"
        @on-click-menu="click">
        </som-action-sheet>
    </div>
</template>
<script>
export default {
    data() {
        return {
            dialogShow: false,
            dialogShow1: false,
            dialogShow2: false,
            menus: [
                '选项二',
                '选项三'
            ],
            menus1: [
                {
                    value: '选项二',
                    warning: true
                },
                '选项三'
            ]
        };
    },
    methods: {
        click(index, item) {
            console.log(index, item);
        },
        cancel() {
            console.log('cancel');
        }
    }
};
</script>
