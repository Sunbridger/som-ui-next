<style lang="less">
@import '~@/styles/components/result-page/var.less';

@block: som-result-page;

.@{block} {
    &__box {
        width: 100%;
        position: absolute;
        .@{block}__imgbox {
            overflow: hidden;
            text-align: center;
            margin-bottom: var(--result-img-bottom-space);
            .@{block}__img {
                display: inline-block;
                width: var(--result-img-width);
                height: auto;
            }
        }
        .@{block}__title {
            text-align: center;
            line-height: 1;
            color: var(--result-title-color);
            font-size: var(--result-title-fs);
            font-weight: var(--result-title-fw);
            margin-bottom: var(--result-btn-top-space);
        }
        .@{block}__desc {
            text-align: center;
            width: 100%;
            padding: 0 44px;
            box-sizing: border-box;
            color: var(--result-desc-color);
            font-size: var(--result-desc-fs);
            font-weight: var(--result-desc-fw);
            margin-bottom: var(--result-btn-top-space);
        }
    }
    .absolute-middle {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .som-button--medium .som-button--content {
        padding: 0 var(--result-btn-padding);
    }
}
</style>

<template>
    <div class="som-result-page">
        <div
            class="som-result-page__box"
            :class="{'absolute-middle': isMiddle}"
            :style='topStyle'
        >
            <slot name='default'>
                <div class="som-result-page__imgbox">
                    <img
                        v-if='img'
                        class="som-result-page__img inline-block"
                        :src='img'
                        alt=''
                    >
                </div>
                <p
                    v-if='title'
                    class="som-result-page__title"
                    v-html='title'
                ></p>
                <p
                    v-if='desc'
                    class="som-result-page__desc"
                    v-html='desc'
                ></p>
            </slot>
            <slot name='footer'>
                <div v-if="withFooter">
                    <som-button-group class="som-result-page__btnbox flex-center">
                        <som-button
                            size="medium"
                            inline
                            @click='onConfirm($event)'
                        >{{confirmText}}</som-button>
                        <som-button
                            mode="border"
                            v-if="withCancel"
                            size="medium"
                            inline
                            @click='onCancel($event)'
                        >{{cancelText}}</som-button>
                    </som-button-group>
                </div>
            </slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import SomButton from '../button/button.vue';
import SomButtonGroup from '../button/button-group.vue';

export default defineComponent({
    name: 'SomResultPage',
    components: { SomButton, SomButtonGroup },
    props: {
        top: {
            string: '',
            default: ''
        },
        isMiddle: {
            type: Boolean,
            default: true
        },
        img: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        desc: {
            type: String,
            default: ''
        },
        confirmText: {
            type: String,
            default: '确定'
        },
        cancelText: {
            type: String,
            default: '取消'
        },
        withFooter: {
            type: Boolean,
            default: false
        },
        withCancel: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { emit }) {
        //  computed计算属性块
        const topStyle = computed(() => ({
            top: `${props.top}px`,
            left: '50%',
            transform: +props.top ? 'translate(-50%, 0)' : 'translate(-50%, -50%)'
        }));

        // methods方法块
        const onConfirm = (e) => {
            emit('on-confirm', e);
        };
        const onCancel = (e) => {
            emit('on-cancel', e);
        };
        return {
            topStyle,
            onConfirm,
            onCancel
        };
    }
});
</script>
