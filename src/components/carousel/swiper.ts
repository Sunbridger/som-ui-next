import objectAssign from 'object-assign';

const arrayFrom = nodeList => Array.prototype.slice.call(nodeList);
interface IOptionsType {
    container: string | Document;
    item: string;
    direction: string;
    activeClass: string;
    threshold: number;
    duration: number;
    auto: boolean;
    loop: boolean;
    interval: number;
    height: string | number;
    offset: number;
    minMovingDistance: number;
}

interface IPointType {
    x: number;
    y: number;
}
interface IEventHandlerType {
    swiped: any;
}

class Swiper {
    private defaultOptions: IOptionsType = {
        container: '.som-carousel__swiper',
        item: '.som-carousel__carousel-item',
        direction: 'vertical',
        activeClass: 'active',
        threshold: 50,
        duration: 300,
        auto: false,
        loop: false,
        interval: 3000,
        height: 'auto',
        offset: 0,
        minMovingDistance: 0
    };
    private options: IOptionsType;
    private start: IPointType = {
        x: 0,
        y: 0
    };
    private move: IPointType = {
        x: 0,
        y: 0
    };
    private end: IPointType = {
        x: 0,
        y: 0
    };
    private eventHandlers: IEventHandlerType = {
        swiped: null
    };
    private prev = 0;
    private current = 0;
    private width = 0;
    private height: number | string = 0;
    private distance: number | string = 0;
    private offset: Array<any> = [];
    private box: any;
    private container: any;
    private items: Array<any>;
    private count: number;
    private realCount: number;
    private position: Array<any> = [];
    private timer: any;
    private resizeHandler: any;
    private touchstartHandler: any;
    private touchmoveHandler: any;
    private touchendHandler: any;
    private transitionEndHandler: any;
    constructor(parameter: Record<string, any>) {
        this.options = objectAssign(this.defaultOptions, parameter);
        this.options.height = (this.options.height as string).replace('px', '');
        this.box = this.options.container;
        this.container = (this.options.container as Document).querySelector('.som-carousel__swiper');
        this.items = this.container.querySelectorAll(this.options.item);
        this.count = this.items.length;
        this.realCount = this.items.length; // real items length
        if (!this.count) {
            return;
        }
        this.init();
        this.auto();
        this.bind();
        this.onResize();
        return this;
    }
    // 初始化自动轮播 timer
    public auto() {
        this.stop();
        if (this.options.auto) {
            this.timer = setTimeout(() => {
                this.next();
            }, this.options.interval);
        }
    }
    // 更新轮播图的高度，只要是因为区分纵向和横向滚动
    private updateItemWidth() {
        this.width = this.box.offsetWidth || document.documentElement.offsetWidth;
        this.distance = this.options.direction === 'horizontal' ? this.width : this.height;
    }
    // 暂停自动轮播
    public stop() {
        this.timer && clearTimeout(this.timer);
    }
    // 判断是否无限循环
    private loop() {
        return this.options.loop && this.realCount >= 3;
    }
    // 重新调整视图尺寸
    private onResize() {
        this.resizeHandler = () => {
            setTimeout(() => {
                this.updateItemWidth();
                this.setOffset();
                this.setTransform();
            }, 100);
        };
        // 监听屏幕旋转变化时，重新绘制尺寸
        window.addEventListener('orientationchange', this.resizeHandler, false);
    }

    private init() {
        this.height = this.options.height === 'auto' ? 'auto' : this.options.height as number - 0;
        this.updateItemWidth();
        this.initPosition();
        this.activate(this.current);
        this.setOffset();
        this.setTransform();
        if (this.loop()) {
            this.loopRender();
        }
    }

    private initPosition() {
        for (let i = 0; i < this.realCount; i += 1) {
            this.position.push(i);
        }
    }

    private movePosition(position) {
        if (position > 0) {
            const firstIndex = this.position.splice(0, 1);
            this.position.push(firstIndex[0]);
        } else if (position < 0) {
            const lastIndex = this.position.pop();
            this.position.unshift(lastIndex);
        }
    }

    private setOffset() {
        const index = this.position.indexOf(this.current);
        this.offset = [];
        arrayFrom(this.items).forEach(($item, key) => {
            this.offset.push((key - index) * (this.distance as number));
        });
    }
    // 设置过渡参数
    private setTransition(duration = '' as string | number) {
        duration = duration || (this.options.duration || 'none');
        const transition = duration === 'none' ? 'none' : `${duration}ms`;
        arrayFrom(this.items).forEach(($item) => {
            $item.style.webkitTransition = transition;
            $item.style.transition = transition;
        });
    }
    // 设置移动动画参数
    private setTransform(offset = 0) {
        offset = offset || 0;
        arrayFrom(this.items).forEach(($item, key) => {
            const distance = this.offset[key] + offset;
            let transform = `translate3d(${distance}px, 0, 0)`;
            if (this.options.direction === 'vertical') {
                transform = `translate3d(0, ${distance}px, 0)`;
            }
            $item.style.webkitTransform = transform;
            $item.style.transform = transform;
        });
    }
    // 绑定touch 各种事件
    private bind() {
        // 开始移动事件
        this.touchstartHandler = (e) => {
            this.stop();
            this.start.x = e.changedTouches[0].pageX;
            this.start.y = e.changedTouches[0].pageY;
            this.setTransition('none');
        };
        // 移动中事件
        this.touchmoveHandler = (e) => {
            if (this.count === 1) {
                return;
            }
            this.move.x = e.changedTouches[0].pageX;
            this.move.y = e.changedTouches[0].pageY;
            const distanceX = this.move.x - this.start.x;
            const distanceY = this.move.y - this.start.y;
            let distance = distanceY;
            const noScrollerY = Math.abs(distanceX) > Math.abs(distanceY);
            if (this.options.direction === 'horizontal' && noScrollerY) {
                distance = distanceX;
            }
            /* set shorter distance for first and last item for better experience */
            if (!this.options.loop && (this.current === this.count - 1 || this.current === 0)) {
                distance /= 3;
            }
            if (((this.options.minMovingDistance && Math.abs(distance) >= this.options.minMovingDistance) || !this.options.minMovingDistance) && noScrollerY) {
                this.setTransform(distance);
            }

            if (noScrollerY && e.cancelable) {
                if (!e.defaultPrevented) {
                    e.preventDefault();
                }
            }
        };
        // 移动结束事件
        this.touchendHandler = (e) => {
            if (this.count === 1) {
                return;
            }
            this.end.x = e.changedTouches[0].pageX;
            this.end.y = e.changedTouches[0].pageY;

            let distance = this.end.y - this.start.y;
            if (this.options.direction === 'horizontal') {
                distance = this.end.x - this.start.x;
            }

            distance = this.getDistance(distance);
            if (distance !== 0 && this.options.minMovingDistance && Math.abs(distance) < this.options.minMovingDistance) {
                return;
            }
            if (distance > this.options.threshold) {
                this.moveTo(-1);
            } else if (distance < -this.options.threshold) {
                this.moveTo(1);
            } else {
                this.moveTo(0);
            }

            this.loopRender();
        };
        // 屏幕旋转事件 
        this.transitionEndHandler = (e) => {
            this.activate(this.current);
            const cb = this.eventHandlers.swiped;
            cb && cb.apply(this, [this.prev % this.count, this.current % this.count]);
            this.auto();
            this.loopRender();
            if (e.cancelable) {
                if (!e.defaultPrevented) {
                    e.preventDefault();
                }
            }
        };
        this.container.addEventListener('touchstart', this.touchstartHandler, { passive: false });
        this.container.addEventListener('touchmove', this.touchmoveHandler, { passive: false });
        this.container.addEventListener('touchend', this.touchendHandler, { passive: false });
        this.container.addEventListener('touchcancel', this.touchendHandler, false);
        this.items[1] && this.items[1].addEventListener('webkitTransitionEnd', this.transitionEndHandler, false);
    }
    // 如果是循环滚动，则克隆首尾item添加滚动轮播数组首尾
    private loopRender() {
        if (this.loop()) {
            if (this.offset[this.offset.length - 1] === 0) {
                this.container.appendChild(this.items[0]);
                this.loopEvent(1);
            } else if (this.offset[0] === 0) {
                this.container.insertBefore(this.items[this.items.length - 1], this.container.firstChild);
                this.loopEvent(-1);
            }
        }
    }
    // 循环轮播-移动到两端时，特殊处理
    private loopEvent(num: number) {
        this.itemDestoy();
        this.items = this.container.querySelectorAll(this.options.item);
        this.items[1] && this.items[1].addEventListener('webkitTransitionEnd', this.transitionEndHandler, false);
        this.movePosition(num);
        this.setOffset();
        this.setTransform();
    }

    private getDistance(distance: number) {
        if (this.loop()) {
            return distance;
        } else if (distance > 0 && this.current === 0) {
            return 0;
        } else if (distance < 0 && this.current === this.realCount - 1) {
            return 0;
        } else {
            return distance;
        }
    }
    // 轮播ing，实时修改index等参数
    private moveIndex(num: number) {
        if (num !== 0) {
            this.prev = this.current;
            this.current += this.realCount;
            this.current += num;
            this.current %= this.realCount;
        }
    }

    private activate(index: number) {
        const clazz = this.options.activeClass;
        Array.prototype.forEach.call(this.items, ($item) => {
            $item.classList.remove(clazz);
            if (index === Number($item.dataset.index)) {
                $item.classList.add(clazz);
            }
        });
    }
    // 封装了轮播的一些事件
    public go(index) {
        this.stop();

        this.activate(index);

        index = index || 0;
        index += this.realCount;
        index %= this.realCount;
        index = this.position.indexOf(index) - this.position.indexOf(this.current);

        this.moveIndex(index);
        this.setOffset();
        this.setTransition();
        this.setTransform();
        this.auto();
        return this;
    }
    // 滚动到下一个区域
    public next() {
        this.moveTo(1);
        return this;
    }

    public moveTo(num) {
        this.go(this.current + num);
        return this;
    }

    public on(event, callback) {
        if (this.eventHandlers[event]) {
            console.error(`[swiper] event ${event} is already register`);
        }
        if (typeof callback !== 'function') {
            console.error('[swiper] parameter callback must be a function');
        }
        this.eventHandlers[event] = callback;
        return this;
    }

    private itemDestoy() {
        this.items.length && arrayFrom(this.items).forEach((item) => {
            item.removeEventListener('webkitTransitionEnd', this.transitionEndHandler, false);
        });
    }
    // 轮播状态的清除
    public destroy() {
        this.stop();
        this.current = 0;
        this.setTransform(0);
        window.removeEventListener('orientationchange', this.resizeHandler, false);
        this.container.removeEventListener('touchstart', this.touchstartHandler, { passive: false });
        this.container.removeEventListener('touchmove', this.touchmoveHandler, { passive: false });
        this.container.removeEventListener('touchend', this.touchendHandler, { passive: false });
        this.container.removeEventListener('touchcancel', this.touchendHandler, false);
        this.itemDestoy();
        // 如果只传入两张图，销毁时则移除克隆出来的图
        if (this.options.loop && this.count === 2) {
            let $item = this.container.querySelector(`${this.options.item}-clone`);
            $item && this.container.removeChild($item);
            $item = this.container.querySelector(`${this.options.item}-clone`);
            $item && this.container.removeChild($item);
        }
    }
}

export default Swiper;
