<style lang="less">
.pg-component-searchbar {
    .custom-prefix-wrapper {
        .border-right(#d9d9d9);
    }
}
</style>

<template>
    <div class="pg-component-searchbar bg-page pb32">
        <co-wrapper title="基本使用">
            <som-searchbar
                v-model="baseKeywords[0]"
                :debounce="1000"></som-searchbar>
            <som-searchbar
                v-model="baseKeywords[1]"
                theme="dark"></som-searchbar>
        </co-wrapper>

        <co-wrapper title="自定义Slots">
            <som-searchbar
                v-model="customKeywords[0]"
                theme="dark"
                placeholder="想买什么车？">
                <template #prefix>
                    <div class="custom-prefix-wrapper lh18 flex flex-align-center mr8">
                        <span class="text-title">新车</span>
                        <img
                            class="ml6 mr10"
                            width="6"
                            src="https://assets.souche.com/assets/sccimg/som-ui-next/filter/展开16.png">
                    </div>
                </template>
            </som-searchbar>
            <som-searchbar
                v-model="customKeywords[1]"
                isCancel
                theme="dark"
                placeholder="想买什么车？">
                <template #prefix>
                    <div class="custom-prefix-wrapper lh18 flex flex-align-center mr8">
                        <span class="text-title">新车</span>
                        <img
                            class="ml6 mr10"
                            width="6"
                            src="https://assets.souche.com/assets/sccimg/som-ui-next/filter/展开16.png">
                    </div>
                </template>
            </som-searchbar>
            <som-searchbar
                v-model="customKeywords[2]"
                isCancel
                theme="dark"
                placeholder="想买什么车？">
                <template #left>
                    <img
                        width="24"
                        src="https://img.souche.com/f2e/729a1a8541c2e35f204b1c5841ffdecb.png" alt="">
                </template>
                <template #prefix>
                    <div class="custom-prefix-wrapper lh18 flex flex-align-center mr8">
                        <span class="text-title">新车</span>
                        <img
                            class="ml6 mr10"
                            width="6"
                            src="https://assets.souche.com/assets/sccimg/som-ui-next/filter/展开16.png">
                    </div>
                </template>
            </som-searchbar>
        </co-wrapper>

        <co-wrapper title="动态搜索框">
            <som-searchbar
                v-model="dynamicKeywords[0]"
                theme="dark"
                isCancel
                autoFixed
                :loading="loading"
                :preset="preset"
                :result="result"
                @input="input($event, result)"
                @result-click="itemClick(0, $event)"
                @preset-click="itemClick(0, $event)"
                ref="searchbar">
            </som-searchbar>
        </co-wrapper>

        <co-wrapper title="自定义搜索页">
            <som-searchbar
                v-model="resultKeywords[0]"
                theme="dark"
                isCancel
                autoFixed
                :result="result2"
                :loading="loading"
                @input="input($event, result2)"
                ref="searchbar2">
                <template #result>
                    <som-tag-group>
                        <som-tag
                            v-for="item in result2"
                            :key="item.key"
                            @click="tagClick(0, item)">{{item.key}}</som-tag>
                    </som-tag-group>
                </template>
                <template #preset>
                    <div class="text-center pt32 fs88">🎇</div>
                </template>
                <template #noResult>
                    <div class="text-center pt32">
                        <div class="fs88">👻</div>
                        <div class="fs12 text-caption">空空荡荡 匆匆忙忙</div>
                    </div>
                </template>
            </som-searchbar>
        </co-wrapper>
    </div>
</template>

<script>
import CoWrapper from '../common/wrapper.vue';

export default {
    data() {
        return {
            loading: false,
            baseKeywords: [],
            customKeywords: [],
            dynamicKeywords: [],
            keywords: [],
            resultKeywords: [],
            result: [],
            result2: [],
            keyword: '',
            preset: [
                {
                    title: '历史搜索',
                    list: [
                        {
                            key: '阿斯顿发'
                        },
                        {
                            key: '那就'
                        },
                        {
                            key: '阿斯安康顿发'
                        },
                        {
                            key: '阿顿发'
                        },
                        {
                            key: '阿斯顿发'
                        }
                    ]
                },
                {
                    title: '热词搜索',
                    list: [
                        {
                            key: '阿斯顿发'
                        },
                        {
                            key: '那就'
                        },
                        {
                            key: '阿斯安康顿发'
                        },
                        {
                            key: '阿顿发'
                        },
                        {
                            key: '阿斯顿发'
                        }
                    ]
                }
            ]
        };
    },
    watch: {
        keyword() {
            // console.log('keyword input');
        }
    },
    components: {
        CoWrapper
    },
    methods: {
        input(val, result) {
            if (this.loading) return false;

            this.loading = true;
            setTimeout(() => {
                this.loading = false;
                if (+val) {
                    result.splice(0, result.length, ...new Array(Math.floor(Math.random() * 30)).fill('').map((i, idx) => ({
                        key: `result: ${idx + 1}`
                    })));
                } else {
                    result = [];
                }
            }, 1000);
        },
        itemClick(idx, item) {
            this.dynamicKeywords[idx] = item.key;
            this.$refs.searchbar.blur();
        },
        tagClick(idx, item) {
            this.resultKeywords[idx] = item.key;
            this.$refs.searchbar2.blur();
        }
    }
};
</script>
