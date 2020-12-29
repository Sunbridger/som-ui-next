<style lang="less">
.pg-templates-main {
    .main-wrapper {
        padding: 32px;
    }
}
</style>

<template>
    <div class="pg-templates-main flex flex-column">
        <div class="main-wrapper flex1">
            <router-view v-slot="{ Component, route }">
                <transition name="doc-fade" mode="out-in">
                    <component :is="Component" :key="route" />
                </transition>
            </router-view>
        </div>
        <co-footer></co-footer>
    </div>
</template>

<script>
import CoFooter from 'components/common/footer';

export default {
    components: {
        CoFooter
    }
};
</script>
