<style lang="less">
.som-icon {
    display: inline-block;
    svg {
        fill: currentColor !important;
    }
}
</style>

<template>
    <div
        class="som-icon flex flex-justify-center"
        :style="svgStyle"
        v-html="svgSting"
    >
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import SVGInject from '@souche-vue3/souche-svg-inject';
import { iconCdnHost } from '../../common/const/config';

export default defineComponent({
    name: 'SomIcon',
    props: {
        department: {
            type: String,
            default: 'base'
        },
        type: {
            type: String,
            required: true
        },
        color: {
            type: String
        },
        size: {
            type: [Number, String],
            default: 24
        }
    },
    setup(props) {
        const svgSting = ref('');
        const svgStyle = computed(() => ({
            width: typeof props.size === 'number' ? `${+props.size}px` : `${props.size}`,
            height: typeof props.size === 'number' ? `${+props.size}px` : `${props.size}`,
            color: props.color ? props.color : ''
        }));
        onMounted(() => {
            // oss http://souche.oss-cn-hangzhou.aliyuncs.com
            const imgUrl = `${iconCdnHost}/${props.department}/${props.type}.svg`;
            SVGInject(imgUrl)
                .then((res: any) => {
                    const { svgString } = res;
                    const reg = /fill=".*?"/g;
                    const hasFillAttribute = reg.test(svgString);
                    svgSting.value = hasFillAttribute && props.color ? svgString.replace(reg, '') : svgString;
                });
        });
        return {
            svgSting,
            svgStyle
        };
    }

});
</script>
