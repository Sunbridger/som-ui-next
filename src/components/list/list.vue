<style lang="less">
@block: som-list;
@item: som-list-item;

.@{block} {
    font-size: 16px;

    &:not(&__border-indent-none) {
        .@{item}:not(:last-child) {
            .border-bottom(var(--line));
        }
        .border-bottom(var(--line));
        .border-top(var(--line));
    }
    
    &__border-indent-left {
        .@{item} {
            &:after {
                left: 16px!important;
            }
        }
    }
    &__border-indent-both {
        .@{item} {
            &:after {
                left: 16px!important;
                right: 16px!important;
            }
        }
    }
}
</style>

<template>
    <div :class="[
        'som-list',
        `som-list__border-indent-${borderIndent || 'left'}`
    ]">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { provideParent } from '@/common/composition/communicate';
import { ListName, ListProps } from './list-types';

/**
 * @params Slots.default
 */
export default {
    name: ListName,
    props: ListProps,
    setup() {
        provideParent(ListName);
    }
};
</script>
