<style lang="less">
@import '~@/styles/components/action-sheet/var.less';
@import '~@/styles/transition/index.less';

.som-action-sheet {
    &__popup {
        background: transparent;
        display: flex;
        flex-flow: column;
    }
    &__title-area {
        height: var(--actionsheet-title-height);
        font-size: var(--actionsheet-title-fs);
        color: var(--actionsheet-title-color);
        font-weight: var(--actionsheet-title-fw);
        .border-bottom(#EDEDF0);
    }
    &__content-cell {
        color: var(--actionsheet-content-color);
        font-size: var(--actionsheet-content-fs);
        font-weight: var(--actionsheet-content-fw);
        height: 56px;
        background-color: #fff;
        .border-bottom(#EDEDF0);
        .warning {
            color: var(--actionsheet-content-warning);
        }
    }
    &__content-area {
        background-color: #f7f8fa;
        padding-bottom: var(--actionsheet-cancel-btn-top-space);
    }
    &__content {
        max-height: var(--actionsheet-max-height);
        background: var(--actionsheet-bg);
    }
    &__cancel-area {
        height: 56px;
    }
}
</style>

<template>
    <div class="som-action-sheet">
        <som-popup
            class="som-action-sheet__popup"
            v-model:show="dialogShow"
            :hide-on-blur="closeOnClickingMask"
            position="bottom"
            :lockScroll="true"
            @click-mask="clickMask"
        >
            <section class="som-action-sheet__content">
                <div
                    v-if="$slots.header || title"
                    class="som-action-sheet__title-area flex-center pl16 pr16 pt21 pb21"
                >
                    <slot name="header">
                        <span>{{title}}</span>
                    </slot>
                </div>
                <section class="pb8 som-action-sheet__content-area">
                    <div
                        class="som-action-sheet__content-cell flex-center"
                        v-for="(item, index) in displayMenus"
                        :key="index"
                        @click="clickMenu(index)"
                    >
                        <slot name="menu">
                            <span :class="{warning: item.warning}">{{item.value}}</span>
                        </slot>
                    </div>
                </section>
                <div
                    class="som-action-sheet__cancel-area flex-center"
                    @click="cancel"
                    v-if="showCancel"
                >
                    {{cancelText}}
                </div>
            </section>
        </som-popup>
    </div>
</template>

<script lang="ts">
import { IMenuItem, MenuItemType } from 'types/components/action-sheet';
import { defineComponent, computed, watch, ref, PropType } from 'vue';
import { SomPopup } from '../popup';

export default defineComponent({
    name: 'SomActionSheet',
    components: {
        SomPopup,
    },
    emits: ['update:show', 'on-hide', 'on-show', 'on-click-mask', 'on-click-cancel', 'on-click-menu'],
    props: {
        show: {
            type: Boolean,
            default: true,
        },
        title: {
            type: String,
            default: '',
        },
        showCancel: {
            type: Boolean,
            default: true,
        },
        cancelText: {
            type: String,
            default: '取消',
        },
        menus: {
            type: Array as PropType<MenuItemType[]>,
            default: () => [],
        },
        closeOnClickingMask: {
            type: Boolean,
            default: true,
        },
        closeOnClickingMenu: {
            type: Boolean,
            default: true,
        },
    },
    setup(props, { emit }) {
        // data数据块
        const dialogShow = ref(false);

        //  computed计算属性块
        // eslint-disable-next-line
        const displayMenus = computed((): IMenuItem[] => {
            return props.menus.map((i) => {
                let info: IMenuItem = {
                    value: '',
                };
                if (typeof i === 'string') {
                    info = {
                        value: i,
                    };
                }
                return info;
            });
        });
        // watch状态监听块
        watch(
            () => props.show,
            (val) => {
                dialogShow.value = val;
            },
        );
        watch(dialogShow, (val) => {
            emit('update:show', val);
            if (val) {
                emit('on-show');
            } else {
                emit('on-hide');
            }
        });
        // methods方法块
        const clickMask = () => {
            emit('on-click-mask');
        };
        const cancel = () => {
            dialogShow.value = false;
            emit('on-click-cancel');
        };
        const clickMenu = (index: number) => {
            if (props.closeOnClickingMenu) {
                dialogShow.value = false;
            }
            emit('on-click-menu', index, props.menus[index]);
        };
        return {
            displayMenus,
            dialogShow,
            clickMask,
            cancel,
            clickMenu,
        };
    },
});
</script>
