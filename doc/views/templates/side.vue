<style lang="less">
.co-templates-side {
    display: flex;
    align-items: center;
    width: 100%;
    .component-col,
    .component-sidebar,
    .component-main {
        height: 100%;
    }
    .component-sidebar {
        border-right: 1px solid #eee;
    }
    .component-main {
        display: flex;
        flex-direction: column;
    }
    .main-view {
        max-width: calc(100vw - 200px - 400px);
        min-width: calc(1180px - 200px - 400px);
        flex: 1;
        padding: 32px 10px 32px 10px;
        &.no-example {
            max-width: calc(100vw - 200px);
            padding: 32px;
        }
    }
    .iframe-wrapper {
        height: calc(100vh - 215px);
        margin-top: 150px;
        padding: 16px;
        padding-left: 0px;
        box-sizing: border-box;
        iframe {
            width: 375px;
            height: calc(100% - 24px);
        }
    }
    .iframe-window {
        text-align: center;
        font-size: 10px;
        width: 100%;
        box-sizing: border-box;
        height: 540px;
        max-height: 100%;
    }
    .iframe-tools {
        margin: 0;;
        background: #edf0f4;
    }
    .iframe-btn {
        .size(12px);
        margin-right: 10px;
        border-radius: 50%;
        &:nth-child(1) {
            background: red;
        }
        &:nth-child(2) {
            background: #ffe109;
        }
        &:nth-child(3) {
            background: #1dbf6e;
        }
    }
    .docs-demo__code__mobi {
        width: 385px;
        background: url(https://img.souche.com/f2e/879df4c717741389394d8e556246a3b6.png);
        background-size: 100% 100%;
        box-sizing: border-box;
        overflow: hidden;
        position: relative;
        padding: 45px 6px;
        .docs-demo__code__mobi__header {
            font-size: 14px;
            border-radius: 4px 4px 0 0;
            background: linear-gradient(rgba(55,55,55,.98),#545456);
            text-align: center;
            padding: 0 8px 8px;
            .url-box {
                height: 28px;
                line-height: 28px;
                color: #fff;
                padding: 0 3px;
                background-color: #a2a2a2;
                margin: 0 auto;
                border-radius: 4px;
                white-space: nowrap;
                overflow-x: scroll;
            }
        }
        iframe {
            border-radius: 6px;
        }
    }
    .left-sider {
        width: 200px;
        flex: 0 0 200px;
    }
    .center-sider {
        flex: 1 1 auto;
    }
    .right-sider {
        flex: 0 0 400px;
    }
}
</style>

<template>
    <div class="co-templates-side">
        <div class="component-col left-sider">
            <div class="component-sidebar relative" :settings="settings">
                <co-side-nav
                    :pageName="pageName"
                    :navList="navList"></co-side-nav>
            </div>
        </div>
        <div class="component-col center-sider">
            <div class="component-main relative" ref="scrollbar">
                <router-view v-slot="{ Component }" class="main-view" :class="{'no-example': showExample}">
                    <transition name="doc-fade" mode="out-in">
                        <component :is="Component" />
                    </transition>
                </router-view>
                <co-footer></co-footer>
            </div>
        </div>
        <div class="iframe-wrapper flex flex-justify-center flex-align-center right-sider" v-if="!showExample">
           <div class="docs-demo__code__mobi" :style="{height: '720px'}">
                <div class="docs-demo__code__mobi__header">
                    <img width="100%" src="https://os.alipayobjects.com/rmsportal/VfVHYcSUxreetec.png">
                    <div class="url-box">{{examplesUrl}}</div>
                </div>
                <div class="iframe-window">
                    <iframe :src="examplesUrl" frameborder="0"></iframe>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CoFooter from 'components/common/footer';
import CoSideNav from 'components/common/side-nav';
import map from 'doc/map';
import { defineComponent } from 'vue';
// import scrollbarMixin from 'doc/core/mixins/scrollbar';

export default defineComponent({
    // mixins: [scrollbarMixin],
    components: {
        CoFooter,
        CoSideNav
    },
    data() {
        return {
            settings: {
                suppressScrollX: true
            }
        };
    },
    computed: {
        pageName() {
            const name = this.$route.path;
            return name.split('/')[1];
        },
        navList() {
            const navConf = map.find(pageConf => pageConf.pageName === this.pageName);
            //navConf.nav
            let data = [];
            data = data.concat(navConf.nav.extendsRouter);
            data.push(navConf.nav);
            return data;
        },
        componentName() {
            const { name, path } = this.$route;
            const navItemName = name.split('-')[0];
            if ((this.pageName === 'components' || this.pageName === 'packages') &&
                (navItemName === 'components' || navItemName === 'packages')) {
                return path.split('/')[2];
            }
            return '';
        },
        examplesUrl() {
            const projectBaseUrl = `${window.location.origin}${window.location.pathname}`
                .replace(/\/(index(\.html)?)?$/, '');
            const exampleBaseUrl = `${projectBaseUrl}/examples#`;
            return this.componentName ? `${exampleBaseUrl}${this.$route.path}` : exampleBaseUrl;
        },
        showExample() {
            // todo 优化
            return this.$route.path.indexOf('install') > -1 || this.$route.path.indexOf('start') > -1 || this.$route.path.indexOf('icon') > -1;
        }
    }
});
</script>
