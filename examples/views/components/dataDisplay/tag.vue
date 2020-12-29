<style lang="less">
.pg-component-tag {
    padding: 16px 16px;
    background: #F7F8FA;
    .f-pg-text-color {
        color: #8D8E99;
    }
}
</style>
<template>
    <div class="pg-component-tag">
        <p class="fs16 f-pg-text-color">常规用法</p>
        <som-tag-group>
            <som-tag halfRadius size="normal">普通标签</som-tag>
            <som-tag halfRadius type="selected">选中标签</som-tag>
            <som-tag halfRadius type="disable">不可点击</som-tag>
            <som-tag size="small" color="red" :filled="false" border-color="red">空心样式</som-tag>
        </som-tag-group>
        <p class="fs16 mt32 f-pg-text-color">不同尺寸</p>
        <som-tag-group>
            <som-tag halfRadius size="medium">
                <template #icon>
                    <som-icon class="mr2" type="screen" size="16px" color="#000"></som-icon>
                </template>
                带icon
            </som-tag>
            <som-tag size="medium" bg-color="#F7F8FA" closeable @on-close="close">可关闭</som-tag>
            <som-tag size="small" bg-color="#FEF2F2" color="#F01D24">满3000返200</som-tag>
            <som-tag size="smini" border-color="#F78E91" :fill="false" color="#F01D24">直降500</som-tag>
            <som-tag halfRadius size="mini" bg-color="#E5FDF8" color="#00B383">上新</som-tag>
        </som-tag-group>
        <p class="fs16 mt32 f-pg-text-color">三等分</p>
        <som-tag-group cloumn="three">
            <som-tag halfRadius size="normal">标签标签</som-tag>
            <som-tag halfRadius type="selected">标签标签</som-tag>
            <som-tag halfRadius type="disable">标签</som-tag>
            <som-tag halfRadius size="normal">标签标签</som-tag>
            <som-tag halfRadius type="selected">标签标签</som-tag>
            <som-tag halfRadius type="disable">标签</som-tag>
        </som-tag-group>
        <p class="fs16 mt32 f-pg-text-color">四等分</p>
        <som-tag-group cloumn="four">
            <som-tag halfRadius size="normal">标签</som-tag>
            <som-tag halfRadius type="selected">标签</som-tag>
            <som-tag halfRadius type="disable">标签</som-tag>
            <som-tag halfRadius size="normal">标签</som-tag>
            <som-tag halfRadius type="selected">标签</som-tag>
            <som-tag halfRadius type="disable">标签</som-tag>
        </som-tag-group>
        <p class="fs16 mt32 f-pg-text-color">自适应</p>
        <som-tag-group>
            <som-tag halfRadius size="normal">标签</som-tag>
            <som-tag halfRadius type="selected">标签</som-tag>
            <som-tag halfRadius type="disable">标签</som-tag>
            <som-tag halfRadius size="normal">标签</som-tag>
            <som-tag halfRadius type="selected">标签</som-tag>
            <som-tag halfRadius type="disable">标签</som-tag>
        </som-tag-group>
        <p class="fs16 mt32 f-pg-text-color">常用标签</p>
        <som-tag-group>
            <som-tag size="small" bg-color="#FEF2F2" color="#F01D24">满3000返200</som-tag>
            <som-tag size="smini" border-color="#F78E91" :fill="false" color="#F01D24">直降500</som-tag>
            <som-tag size="smini" border-color="#E3E3E6" :fill="false" color="#5E5E66" bg-color="#F7F8FA">含购置税</som-tag>
            <som-tag halfRadius size="mini" bg-color="#E5FDF8" color="#00B383">上新</som-tag>
            <som-tag halfRadius size="mini" bg-color="#FFF6D1" color="#B75700">库存紧张</som-tag>
            <som-tag halfRadius size="mini" bg-color="#F2F3F5" color="#5E5E66">暂时缺货</som-tag>
        </som-tag-group>
    </div>
</template>
<script>
export default {
    data() {
        return {
            img: 'https://assets.souche.com/assets/sccimg/dafengche/tangecheB/shopping-bag2.svg'
        };
    },
    methods: {
        close() {
            console.log('close');
        }
    }
};
</script>
