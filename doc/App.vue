<style lang="less">
.pg-app {
    width: 100vw;
    height: 100vh;
    .app {
        &-wrapper {
            min-width: @min-page-width;
        }
        &-container {
            height: calc(100vh - @page-header-height);
        }
    }
}
</style>

<template>
    <div class="pg-app">
        <div class="app-wrapper">
            <co-header></co-header>
            <router-view v-slot="{ Component, route }" class="app-container">
                <transition name="doc-fade" mode="out-in">
                    <component :is="Component" :key="route" />
                </transition>
            </router-view>
        </div>
    </div>
</template>

<script>
import CoHeader from 'components/common/header';

export default {
    name: 'app',
    data() {
        return {
            settings: {
                suppressScrollY: true
            }
        };
    },
    components: {
        CoHeader
    }
};
</script>
