<style lang="less">
.co-header {
    height: @page-header-height;
    padding: 0 32px;
    border-bottom: 1px solid #e6e6e6;
    box-shadow: 0 1px 6px #eee;
    .header-logo {
        min-width: @min-sidebar-width;
    }
    .header-version {
        line-height: calc(@page-header-height - 3px);
        outline: 0;
    }
}
</style>

<template>
    <a-row class="co-header bg-white" :type="'flex'" :align="'middle'" :justify="'start'" :gutter="24">
        <a-col :span="5">
            <img class="vertical-middle"
                src="~images/common/logo.png" alt="logo" height="32">
            <span class="pl8 ellipsis">som-ui-next</span>
        </a-col>
        <a-col :span="19">
            <div class="flex flex-align-center flex-justify-end">
                <a-menu :selectedKeys="activeIndex" mode="horizontal" style="height:59px; line-height:59px;">
                    <a-menu-item v-for="page in map" :key="`/${page.pageName}`" @click="changeRouter(`/${page.pageName}`)">
                        {{page.alias}}
                    </a-menu-item>
                </a-menu>
                <a-dropdown>
                    <a class="ant-dropdown-link header-version fs14 ml16 mr24" @click="e => e.preventDefault()">
                        {{version}}
                        <DownOutlined />
                    </a>
                    <template v-slot:overlay>
                        <a-menu>
                            <a-menu-item
                                v-for="version in versions"
                                :key="version"
                                :command="version"
                                @click="goVersion(version)">{{version}}</a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown>
                <!-- TODO -->
                <a href="https://git.souche-inc.com/souche-vue3/souche-ui/som-ui-next" target="_blank">
                    <img class="cursor vertical-middle"
                        src="~images/common/gitlab-logo.png" width="16" height="16">
                </a>
            </div>
        </a-col>
    </a-row>
</template>

<script>
import { version } from 'root/package.json';
import { defineComponent } from 'vue';
import map from 'doc/map/index';

export default defineComponent({
    data() {
        return {
            version,
            map,
            versions: []
        };
    },
    methods: {
        goVersion(tag) {
            window.open(`https://fedoc.souche-inc.com/som-ui-next/${tag}/index.html`, '_blank');
        },
        changeRouter(path) {
            this.$router.push({
                path: path
            });
        }
    },
    computed: {
        activeIndex() {
            return [this.$route.path.replace(/^(\/[^/]+).*/, (m, p) => p)];
        }
    },
    created() {
        // todo robben 倒入不进去 GG
        this.$api.robben.getVersions({
            groupName: 'test-jwj',
            projectName: 'som-ui-next'
        }).then((res) => {
            this.versions = res;
        });
    }
});
</script>
