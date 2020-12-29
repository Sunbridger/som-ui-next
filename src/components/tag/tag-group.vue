<style lang="less">
@item: som-tag;

.som-tag-group {
    padding: 10px 12px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .@{item} {
        // margin-right: 8px;
        // margin-top: 12px;
        margin: 6px 4px;
    }
    &--three-clomun {
        color: red;
        .@{item} {
            box-sizing: border-box;
            width: calc(33.3% - 8px);
            text-align: center;
            overflow: hidden;
            &:nth-child(3n) {
                margin-right: 0;
            }
        }
    }
    &--four-clomun {
        .@{item} {
            box-sizing: border-box;
            width: calc(25% - 8px);
            text-align: center;
            overflow: hidden;
            &:nth-child(4n) {
                margin-right: 0;
            }
        }
    }
}
</style>

<template>
    <div
        class="som-tag-group"
        :class="tagGroupClass"
    >
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
    name: 'SomTagGroup',
    props: {
        rank: {
            type: Number,
            default: 8
        },
        cloumn: {
            type: String,
            default: ''
        }
    },
    setup(props) {
        const tagGroupClass = computed(() => ({
            [`som-tag-group--rank${props.rank}`]: !!props.rank,
            [`som-tag-group--${props.cloumn}-clomun`]: !!props.cloumn
        }));
        return {
            tagGroupClass
        };
    }
});
</script>
