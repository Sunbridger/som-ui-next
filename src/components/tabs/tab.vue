<style lang="less">

@block: som-tab-item;

.@{block} {
    position: relative;
    display: flex;
    flex: 1;
    // width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-size: 100% 1px;
    font-size: var(--tab-fs);
    text-align: center;
    color: var(--tab-color);
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    transition: var(--all-transition);
    justify-content: center;
    align-items: center;
    &.@{block}--is-margin {
        flex: none;
        width: auto;
        margin: 0 8px;
        display: inline-block;
    }
    &__label {
        height: 100%;
        box-sizing: border-box;
        display: inline-block;
        display: flex;
        align-items: center;
    }
    &.@{block}--selected {
        .@{block}__label {
            color: var(--tab-selected-color);
            font-weight: 600;
            position: relative;
        }
    }
}
</style>
<template>
    <div
        :class="currentClass"
        :style="currentStyle"
        @click="onClick"
    >
        <span
            class="som-tab-item__label"
            ref="itemRef"
        >
            <slot
                index
                isActive
            ></slot>
            <slot
                name="extend"
                index
                isActive
            ></slot>
        </span>
    </div>
</template>
<script lang="ts">
import { defineComponent, computed, ref, watch, nextTick, CSSProperties } from 'vue';
import { useParent } from '@/common/composition/useRelation';
import { ITabsProps } from 'types/components/tabs';

export default defineComponent({
    name: 'SomTabItem',
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
        activeClass: String,
    },
    setup(props) {
        // data数据
        const itemRef = ref<HTMLElement>();

        // 父子组件传递的数据
        const { parent, instance, index } = useParent<{
            props: ITabsProps;
            state: {
                inited: boolean;
                currentIndex: number;
                lineStyle: CSSProperties;
            };
            setCurrentIndex: Function;
            setLine: Function;
        }>('somTabs');
        // 如果拿不到父节点，直接GG
        if (!parent) {
            throw new Error('[Som] Tabs: <som-tab-item> must be used inside <som-tabs>');
        }

        // computed计算属性
        // 当前状态
        const isActive = computed(() => parent.state.currentIndex === index?.value);
        // 对应的style
        const currentStyle = computed(() => {
            const a = {
                borderColor: parent.props.activeColor,
                color: isActive.value ? parent.props.activeColor : props.disabled ? parent.props.disabledColor : parent.props.defaultColor,
                border: parent.props.animate && !parent.props.isSameAway ? 'none' : 'auto',
            };
            return a;
        });
        // 对应的Class
        const currentClass = computed(() => {
            const cls: Record<string, boolean> = {
                'som-tab-item': true,
                'som-tab-item--selected': isActive.value,
                'som-tab-item--is-margin': !!parent.props.isSameAway,
            };
            if (props.activeClass) {
                cls[props.activeClass] = parent.state.currentIndex === index?.value;
            }
            return cls;
        });

        // watch状态监听
        watch(
            () => isActive.value,
            (val) => {
                nextTick(() => {
                    // 设置底部的线
                    const data = parent.props.vertical ? itemRef?.value?.offsetHeight || 0 - 2 : itemRef?.value?.offsetWidth || 0 - 2;
                    val && parent.setLine(data);
                });
            },
            {
                immediate: true,
            },
        );

        // methods方法
        const onClick = () => {
            if (props.disabled) {
                return;
            }
            if (parent.props.preventDefault) {
                instance?.emit('on-before-index-change', index);
            } else {
                parent.setCurrentIndex(index?.value);
            }
        };

        // lifecycle生命周期
        // onMounted(() => {
        //     // const target = instance?.vnode.el;
        //     // parent.setLine();
        // });

        return {
            itemRef,
            currentStyle,
            currentClass,
            onClick,
        };
    },
});
</script>
