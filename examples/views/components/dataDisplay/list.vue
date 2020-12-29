<style lang="less">
.pg-component-list {
    background: #F7F8FA!important;
    .custom-list-item-class {
        padding-top: 13px;
        padding-bottom: 13px;
    }
}
</style>
<template>
    <div class="pg-component-list bg-page pb32">
        <co-wrapper title="基本使用">
            <som-list>
                <som-list-item
                    label="列表标签"
                    isLink></som-list-item>
                <som-list-item
                    label="列表标签"
                    content="这里是补充文案"></som-list-item>
                <som-list-item
                    label="列表标签"
                    content="这里是补充文案"
                    isLink></som-list-item>
                <som-list-item
                    label="列表标签"
                    content="这里是补充文案这里是补充文案这里是补充文案"
                    isLink></som-list-item>
                <som-list-item
                    label="列表标签列表标签"
                    content="这里是补充文案这里是补充文案这里是补充文案"
                    isLink></som-list-item>
                <som-list-item
                    label="列表标签列表标签"
                    content="这里是补充文案这里是补充文案这里是补充文案"
                    isLink
                    :isEllipsis="false"></som-list-item>
            </som-list>
        </co-wrapper>

        <co-wrapper title="副标题">
            <som-list>
                <som-list-item
                    label="列表标签"
                    inlineDesc="副标题"
                    isLink></som-list-item>
                <som-list-item
                    label="列表标签"
                    content="这里是补充文案"
                    inlineDesc="副标题"
                    isLink></som-list-item>
                <som-list-item
                    label="列表标签列表标签"
                    content="这里是补充文案这里是补充文案这里是补充文案"
                    inlineDesc="副标题副标题副标题副标题"
                    isLink></som-list-item>
            </som-list>
        </co-wrapper>

        <co-wrapper title="列表高度">
            <som-list>
                <som-list-item
                    itemClass="custom-list-item-class"
                    label="列表高度96px"
                    content="这里是补充文案"></som-list-item>
                <som-list-item
                    label="列表高度104px"
                    content="这里是补充文案"></som-list-item>
            </som-list>
        </co-wrapper>

        <co-wrapper title="label定宽（88px）">
            <som-list labelWidth="88px">
                <som-list-item
                    label="列表标签列表标签"
                    content="这里是补充文案这里是补充文案这里是补充文案"
                    inlineDesc="副标题副标题副标题副标题"
                    isLink></som-list-item>
                <som-list-item
                    content="这里是补充文案这里是补充文案这里是补充文案"
                    isLink>
                    <template #label>
                        <div class="ellipsis">列表标签列表标签</div>
                    </template>
                    <template #inlineDesc>
                        <div class="ellipsis">副标题副标题副标题副标题</div>
                    </template>
                </som-list-item>
            </som-list>
        </co-wrapper>

        <co-wrapper title="自定义Slots" class="mb12">
            <som-list>
                <som-list-item
                    label="列表标签"
                    inlineDesc="副标题"
                    isLink
                    labelLeftIconAlign="start">
                    <template #labelLeftIcon>
                        <img
                            width="24"
                            src="https://assets.souche.com/assets/sccimg/BorderCollie.jpg" alt="">
                    </template>
                    <template #labelRightIcon>🐤</template>
                    <template #rightIcon>🐱</template>
                </som-list-item>
                <som-list-item
                    label="列表标签"
                    inlineDesc="副标题"
                    isLink
                    labelLeftIconAlign="center">
                    <template #labelLeftIcon>
                        <img
                            width="24"
                            src="https://assets.souche.com/assets/sccimg/BorderCollie.jpg" alt="">
                    </template>
                    <template #labelRightIcon>🐤</template>
                    <template #rightIcon>
                        <img
                            width="24"
                            src="https://assets.souche.com/assets/sccimg/BorderCollie.jpg" alt="">
                    </template>
                </som-list-item>
            </som-list>
        </co-wrapper>

        <co-wrapper title="自定义底部描述">
            <som-form>
                <som-list-item
                    label="身高"
                    labelLeftIconAlign="center">
                    <som-input type="tel"></som-input>
                    <template #desc>
                        <div class="fs12 warning mt4">*请准确输入自己的身高</div>
                    </template>
                    <template #bottom>
                        <div class="fs12 text-caption mt4">请不要谎报身高（这是一段单个item的描述文字）</div>
                    </template>
                </som-list-item>
                <som-list-item
                    label="体重"
                    labelLeftIconAlign="center">
                    <som-input type="tel"></som-input>
                    <template #desc>
                        <div class="fs12 warning mt4">*请准确输入自己的体重</div>
                    </template>
                    <template #bottom>
                        <div class="fs12 text-caption mt4">请不要谎报体重（这是一段单个item的描述文字）</div>
                    </template>
                </som-list-item>
            </som-form>
        </co-wrapper>
    </div>
</template>

<script>
import CoWrapper from '../common/wrapper.vue';

export default {
    components: {
        CoWrapper
    }
};
</script>
