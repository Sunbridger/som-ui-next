<style lang="less">
.pg-app {
    height: 100vh;
    display: flex;
    flex-direction: column;
    .component-wrapper {
        .fixed(0, 0, 0, 0);
    }
    .slide-right-enter {
        transform: translateX(100vw);
    }
    .slide-right-enter-active {
        transition: 0.6s all ease-in;
    }
    .slide-right-leave {
        transform: translateX(0);
    }
    .slide-right-leave-active {
        transform: translateX(100vw);
        transition: 0.6s all ease-out;
    }
    .title-p {
        color: var(--text-body);
        font-size: 16px;
    }
    .module-alias {
        margin: 24px 0 8px 16px;
        color: rgba(69, 90, 100, 0.6);
        font-size: 14px;
    }
    .link-router {
        position: relative;
        margin-bottom: 12px;
        padding: 0 20px;
        color: #323233;
        font-weight: 600;
        font-size: 14px;
        line-height: 40px;
        background: #f7f8fa;
        border-radius: 99px;
        transition: background 0.3s;
    }
}
</style>

<template>
    <div class="pg-app">
        <co-header title="som-ui-next"></co-header>
        <div
            class="flex1"
            v-if="isHomeLink"
        >
            <div
                class="modules"
                v-for="item in modules"
                :key="item.name"
            >
                <div class="module-title padding12 text-bold bg-background-block module-alias">{{item.alias}}</div>
                <ul>
                    <router-link
                        tag="li"
                        v-for="component in item.children"
                        :key="component.name"
                        v-slot="{ href, isActive, isExactActive }"
                        custom
                        :to="`${item.isPackages ? '/packages' : '/components'}/${component.name}`"
                    >
                        <li
                            class="border-bottom cursor link-router"
                            :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']"
                        >
                            <a
                                :href="href"
                                class="flex flex-justify-between flex-align-center "
                            >
                                <span>{{getTitle(component.alias)}}</span>
                                <RightOutlined />
                            </a>
                        </li>
                    </router-link>
                </ul>
            </div>
        </div>
        <router-view
            class="component-wrapper"
            v-slot="{ Component }"
        >
            <transition name="slide-right">
                <component :is="Component" />
            </transition>
        </router-view>
    </div>
</template>

<script>
import CoHeader from 'examples/components/common/header';
import componentNav from 'doc/map/component-nav.json';
import { title } from 'examples/core';
import { nextTick } from 'vue';

export default {
    name: 'app',
    data() {
        return {
            transitionName: '',
            mode: ''
        };
    },
    components: {
        CoHeader
    },
    computed: {
        modules() {
            const { modules: components } = componentNav.find(item => item.name === 'components');
            const { modules: packages } = componentNav.find(item => item.name === 'packages');
            const data = [].concat(components);
            data.push({
                isPackages: true,
                'name': 'extral',
                'alias': '扩展组件',
                'children': packages
            });
            return data;
        },
        isHomeLink() {
            if (this.$route.path === '/') {
                const offsetTop = sessionStorage.getItem('scrollTop');
                nextTick(() => {
                    document.documentElement.scrollTo(0, offsetTop);
                });
                return true;
            } else {
                sessionStorage.setItem('scrollTop', document.documentElement.scrollTop);
                return false;
            }
        }
    },
    methods: {
        getTitle(str) {
            return title(str);
        }
    }
};
</script>
