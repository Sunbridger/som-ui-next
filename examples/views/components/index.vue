<style lang="less">
.pg-component-index {
    display: flex;
    flex-direction: column;
    .component-example-scroll {
        overflow-y: scroll;
    }
    .component-container {
        background: #fff;
        min-height: calc(100vh - 44px);
    }
}
</style>

<template>
    <div class="pg-component-index">
        <co-header :title="title" ifBack></co-header>
        <router-view class="component-container component-example-scroll"></router-view>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import CoHeader from 'examples/components/common/header';

export default defineComponent({
    components: {
        CoHeader
    },
    computed: {
        title() {
            return this.$route.meta?.name || 'som-ui-next';
        }
    }
});
</script>
