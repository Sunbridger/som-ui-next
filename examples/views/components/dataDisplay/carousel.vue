<template>
    <div class="pg-component-carousel">
        <section class="area pl16 pr16 pt16">
            <h3 class="fs16 pt4 pb12" style="color: #8D8E99; font-weight: 400;">常规用法</h3>
            <som-carousel
                :list="imgList"
                @on-click-item="click"
                @on-index-change="onIndexChange">
            </som-carousel>
        </section>
        <section class="area pl16 pr16 pt16">
            <h3 class="fs16 pt4 pb12"
            style="color: #8D8E99; font-weight: 400;">自定义高度</h3>
            <som-carousel
                :list="imgList"
                height="230px"
                @on-index-change="onIndexChange">
            </som-carousel>
        </section>
         <section class="area pl16 pr16 pt16">
            <h3 class="fs16 pt4 pb12"
            style="color: #8D8E99; font-weight: 400;">自动轮播</h3>
            <som-carousel
                :list="imgList"
                :auto="true"
                @on-index-change="onIndexChange">
            </som-carousel>
        </section>
        <section class="area pl16 pr16 pt16 mb40">
            <h3 class="fs16 pt4 pb12"
            style="color: #8D8E99; font-weight: 400;">自动无限循环轮播</h3>
            <som-carousel
                :list="imgList"
                :auto="true"
                :loop="true"
                @on-index-change="onIndexChange">
            </som-carousel>
        </section>
    </div>
</template>

<script>

const imgList = [
    'http://img.souche.com/f2e/17fcb27177e1273c8593b558efb31d5d.jpeg',
    'http://img.souche.com/f2e/fc86cd629f9874c0af53abc502e7eb99.jpg',
    'http://img.souche.com/f2e/cd5769576c3623b0b0fb4c0f3db029ad.jpeg',
    'http://img.souche.com/f2e/b93a18a0c407808c0d3993683ade9567.jpg'
];

export default {
    methods: {
        onSwiperItemIndexChange(index) {
            console.log(index);
        },
        onIndexChange (index) {
            console.log(index);
        },
        click(index) {
            console.log(index);
        }
    },
    data () {
        return {
            imgList
        };
    }
};
</script>
