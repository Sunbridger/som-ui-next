<template>
    <div class="pg-component-progress">
        <p class="mt20 ml20 mb10">一般进度条</p>
        <som-progress tipPosition="top" :percent="percent2" :tipContent="tipContent"></som-progress>
        <p class="mt10"></p>
        <som-progress :percent="percent2"></som-progress>
        <p class="mt20 ml20 mb10">带刻度的进度条</p>
        <som-progress :ticks="tickList" :percent="38" :unfilled="true"></som-progress>
    </div>
</template>
<script>
export default {
    data() {
        return {
            percent2: 0,
            tickList: [{
                percent: 20,
                text: '20%'
            },
            {
                percent: 40,
                text: '40%'
            },
            {
                percent: 70,
                text: '70%'
            },
            {
                percent: 90,
                text: '90%'
            }],
            tipContent: '上传中'
        };
    },
    mounted () {
        setInterval(this.animation, 20);
    },
    methods: {
        animation () {
            if (this.percent2 < 100) {
                // eslint-disable-next-line no-plusplus
                this.percent2++;
            } else {
                this.tipContent = '完成';
            }
        }
    }
};
</script>
