<!--
 * @Author: your name
 * @Date: 2020-11-23 17:02:13
 * @LastEditTime: 2020-12-07 11:45:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /som-ui-next/examples/views/components/dataDisplay/result-page.vue
-->
<template>
    <div class='pg-component-result-page'>
        <div class='padding12 pl16 fs16' style='color: #8D8E99;'>基础用法 </div>
        <section class='relative'>
            <som-result-page
                top='100'
                img='https://assets.souche.com/projects/som-ui/4.5.22/www/53ba631370b9b3d630cb4e19ffa503c5.png'
                desc='您还没有收到任何消息～'
                :withFooter='false'
                @on-comfirm='change = !change'></som-result-page>
        </section>
        <section class='relative'>
            <div class='relative padding12 pl16 fs16' style='color: #8D8E99;'>底部内容 </div>
            <som-result-page
                img='https://assets.souche.com/projects/som-ui/4.5.22/www/53ba631370b9b3d630cb4e19ffa503c5.png'
                desc='您还没有收到任何消息～'
                :withFooter='true'
                @on-comfirm='change = !change'></som-result-page>
        </section>
        <section class='relative'>
            <div class='relative padding12 pl16 fs16' style='color: #8D8E99;'>标题显示 </div>
            <som-result-page
                img='https://assets.souche.com/projects/som-ui/4.5.22/www/53ba631370b9b3d630cb4e19ffa503c5.png'
                title='标题'
                desc='您还没有收到任何消息～'
                :withFooter='true'></som-result-page>
        </section>

    </div>
</template>
<script>
export default {
    data () {
        return {
            change: true
        };
    }
};
</script>

<style lang="less">
    .som-list-item {
        padding: 2px 16px;
    }
    .som-result-page {
        position: relative;
        height: 360px;
    }
</style>
