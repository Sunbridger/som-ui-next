<style lang="less">
.co-side-nav {
    padding: 32px;
    .lh30 {
        line-height: 24px;
    }
    .lh16 {
        line-height: 16px;
    }
    a:hover {
        color: #3eaf7c;
    }
    .router-link-active {
        color: #3eaf7c;
    }
    .text-bold {
        font-weight: 600;
    }
    .component-name {
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-left: 8px;
        padding-top: 8px;
    }
}
</style>

<template>
    <ul class="co-side-nav">
        <li class="lh30"
            v-for="(nav, index) in navList"
            :key="index">
            <div v-if="nav.modules">
                <div class="fs16 text-bold text-title">{{nav.alias}}</div>
                <template v-if="nav.name !== 'packages'">
                    <div class="pt14" v-for="(group, index) in nav.modules" :key="index">
                        <div class="fs18 lh24 text-hint text-bold">{{group.alias}}</div>
                        <ul>
                            <li v-for="(item, index) in group.children"
                                :key="index" class="component-name">
                                <router-link class="fs13 text-body"
                                    v-if="item.path"
                                    :to="`/${pageName}/${item.name}`">{{item.alias}}</router-link>
                                <div class="fs14 text-body" v-else>{{item.alias}}</div>
                            </li>
                        </ul>
                    </div>
                </template>
                <template v-else>
                    <ul class="pt14" v-for="(group, index) in nav.modules" :key="index">
                        <li>
                            <router-link class="fs14 text-body"
                                v-if="group.path"
                                :to="`/${pageName}/${group.name}`">{{group.alias}}</router-link>
                            <div class="fs14 text-body" v-else>{{group.alias}}</div>
                        </li>
                    </ul>
                </template>
            </div>
            <div v-else-if="nav.children" class="mb10">
                <div class="fs16 text-bold text-title mb10">{{nav.alias}}</div>
                <ul>
                    <li v-for="(item, index) in nav.children"
                        class="lh30"
                        :key="index">
                        <router-link class="fs16 text-body text-bold"
                            v-if="item.path"
                            :to="`/${pageName}/${item.name}`">{{item.alias}}</router-link>
                        <div class="fs14 text-body" v-else>{{item.alias}}</div>
                    </li>
                </ul>
            </div>
            <div v-else></div>
        </li>
    </ul>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        pageName: String,
        navList: Array
    }
});
</script>
