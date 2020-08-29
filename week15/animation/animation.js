export class TimeLine {

    constructor() {
        this.animations = [];
        this.requestId = null;
        this.state = 'inited';
        this.tick = () => {
            let t = Date.now() - this.startTime;
            let animations = this.animations.filter(animation => !animation.finished);
            for (let animation of animations) {
                let { object, property, template, start, end, duration, delay, timingFunction ,startTime} = animation;
                let progression = timingFunction((t - delay - startTime) / duration);
                if (t > duration + delay + startTime) {
                    progression = 1;
                    animation.finished = true;
                }
                let value = start + progression * (end - start);
                console.log(value)
                object[property] = template(value);
            }
            if(animations.length) this.requestId = requestAnimationFrame(this.tick);
        }
    }

    start() {
        if(this.state !== 'inited') return;
        this.state = 'playing';
        this.startTime = Date.now();
        this.tick();
    }

    pause() {
        if(this.state !== 'playing') return;
        this.state = 'paused';
        this.pauseTime = Date.now();
        if(this.requestId != null) cancelAnimationFrame(this.requestId);
    }

    resume(){
        if(this.state !== 'paused') return;
        this.state = 'playing';
        this.startTime += Date.now() - this.pauseTime;
        this.tick();
    }

    restart(){
        if(this.state === 'playing') this.pause();
        this.animations = [];
        this.requestId = null;
        this.startTime = Date.now();
        this.pauseTime = null;
        this.state = 'playing';
        this.tick();
    }

    add(animation, startTime) {
        this.animations.push(animation);
        animation.finished = false;
        if(this.state == "playing") animation.startTime = startTime !== void 0 ? startTime : Date.now() - this.startTime;
        else animation.startTime = startTime !== void 0 ? startTime : 0;
    }
}

export class Animation {
    constructor(object, property, template, start, end, duration, delay, timingFunction) {
        this.object = object;
        this.template = template;
        this.property = property;
        this.start = start;
        this.end = end;
        this.duration = duration;
        this.delay = delay;
        this.timingFunction = timingFunction;
    }
}


/**
 *
 * let animation = new Animation(object, property, start , end, duration, delay, timingFunction);
 * let animation2 = new Animation(object2, property2, start , end, duration, delay, timingFunction);
 *
 *
 * let timeline = new Timeline();
 *
 * timeline.add(animation);
 *
 * timeline.add(animation2);
 *
 * timeline.start();
 *
 * timeline.pause();
 *
 * timeline.resume();
 *
 * timeline.stop();
 *
 */