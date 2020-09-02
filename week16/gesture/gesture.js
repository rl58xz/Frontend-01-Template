let element = document.body;

let contexts = Object.create(null);

let MOUSE_SYMBOL = Symbol('mouse');
let HAND_SYMBOL = Symbol('hand');

element.addEventListener('mousedown',(event) => {
    contexts[MOUSE_SYMBOL] = Object.create(null);
    start(event,contexts[MOUSE_SYMBOL]);
    let mousemove = (event)=>{
        move(event,contexts[MOUSE_SYMBOL]);
    }

    let mouseend = (event) => {
        end(event,contexts[MOUSE_SYMBOL]);
        element.removeEventListener('mousemove',mousemove);
        element.removeEventListener('mouseup',mouseend);
    }

    element.addEventListener('mousemove',mousemove);
    element.addEventListener('mouseup',mouseend);
})

element.addEventListener('touchstart',(event)=>{
    contexts[HAND_SYMBOL] = Object.create(null);
    for(let touch of event.changedTouches){
        start(touch,contexts[HAND_SYMBOL])
    }
})

element.addEventListener('touchmove',(event)=>{
    for(let touch of event.changedTouches){
        move(touch,contexts[HAND_SYMBOL])
    }
})

element.addEventListener('touchend',(event)=>{
    for(let touch of event.changedTouches){
        end(touch,contextxs[HAND_SYMBOL])
    }
})

element.addEventListener('touchcancel',(event)=>{
    for(let touch of event.changedTouches){
        cancel(touch,contexts[HAND_SYMBOL])
    }
})

let start = (point,context)=>{
    context.startTime = Date.now();
    context.startX = point.clientX;
    context.startY = point.clientY;
    context.isPan = false;
    context.isTap = true;
    context.isPress = false;
    context.moves = [];
}

let move = (point,context)=>{
    context.moves.push({
        x:point.clientX,
        y:point.clientY,
        t:Date.now()
    });
    if((point.clientX - context.startX) ** 2 + (point.clientY - context.startY) ** 2 > 100){
        context.isTap = false;
        context.isPress = false;
        context.isPan = true;
    }
}

let end = (point,context)=>{
    if(context.isPan){
        context.moves = context.moves.filter(item => Date.now() - item.t < 300);

        if(context.moves.length){
            let speed = Math.sqrt((point.clientX - context.moves[0].x)**2 + (point.clientY - context.moves[0].y)**2)/300;
            if(speed > 0.4){
                let event = new CustomEvent('flick',{
                    datail:{
                        x:point.clientX,
                        y:point.clientY,
                        target:point
                    }
                });
                document.dispatchEvent(event);
                return;
            }
        }

        let event = new CustomEvent('pan',{
            detail:{
                x:context.startX,
                y:context.startY,
                t:Date.now()-context.startTime,
                target:point
            }
        });
        document.dispatchEvent(event);
    }else if(Date.now() - context.startTime > 500){
        context.isPan = false;
        context.isTap = false;
        context.isPress = true;
    }
    
    if(context.isPress){
        let event = new CustomEvent('press',{
            detail:{
                x:context.startX,
                y:context.startY,
                t:Date.now()-context.startTime,
                target:point
            }
        });
        document.dispatchEvent(event);
    }
    if(context.isTap){
        let event = new CustomEvent('tap',{
            detail:{
                x:context.startX,
                y:context.startY,
                t:Date.now()-context.startTime,
                target:point
            }
        });
        document.dispatchEvent(event);
    }
}

let cancel = (point,context)=>{
    console.log(point.clientX,point.clientY)
}